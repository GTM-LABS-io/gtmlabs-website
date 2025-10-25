import { NextRequest } from 'next/server';

const GITHUB_OWNER = 'GTM-LABS-io';
const GITHUB_REPO = 'gtmlabs-website';

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number;
  method: string;
  params?: any;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

async function fetchFromGitHub(path: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'gtm-labs-mcp-api/1.0',
    },
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`GitHub API error ${response.status}: ${text || response.statusText}`);
  }
  
  return response.json();
}

async function scanComponents(basePath = 'homepage/components'): Promise<any[]> {
  const components: any[] = [];
  const items = await fetchFromGitHub(basePath);
  
  for (const item of items) {
    if (item.type === 'file' && /\.(tsx|ts|jsx|js)$/.test(item.name)) {
      components.push({
        name: item.name.replace(/\.(tsx|ts|jsx|js)$/, ''),
        path: item.path,
        url: item.html_url,
        type: 'file',
        category: item.path.split('/').slice(-2, -1)[0] || 'root'
      });
    } else if (item.type === 'dir') {
      const subComponents = await scanComponents(item.path);
      components.push(...subComponents);
    }
  }
  
  return components;
}

function handleJsonRpc(request: JsonRpcRequest): JsonRpcResponse {
  const { method, params, id } = request;

  // Initialize - required handshake
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'gtm-labs',
          version: '1.0.0',
        },
      },
    };
  }

  // List available tools
  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'list_components',
            description: 'List all available components from GTM Labs projects. Returns component names, paths, and categories.',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Optional: Filter by category (ui, sections, animations, etc.)',
                },
              },
            },
          },
          {
            name: 'get_component',
            description: 'Get a specific component with its full code. Always returns the latest version from GitHub.',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "Component name (e.g., 'pricing-section', 'hero-section')",
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'search_components',
            description: 'Search for components by name or category.',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (searches component names and categories)',
                },
              },
              required: ['query'],
            },
          },
        ],
      },
    };
  }

  // Method not found
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`,
    },
  };
}

async function handleToolCall(toolName: string, args: any): Promise<any> {
  if (toolName === 'list_components') {
    const categoryFilter = args?.category;
    let components = await scanComponents();
    
    if (categoryFilter) {
      components = components.filter(c => c.category === categoryFilter);
    }
    
    const byCategory: Record<string, string[]> = {};
    components.forEach(comp => {
      const cat = comp.category;
      if (!byCategory[cat]) {
        byCategory[cat] = [];
      }
      byCategory[cat].push(comp.name);
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            project: 'website',
            total_components: components.length,
            categories: byCategory,
            components,
          }, null, 2),
        },
      ],
    };
  }

  if (toolName === 'get_component') {
    const name = args?.name;
    if (!name) {
      throw new Error('Component name is required');
    }
    
    const components = await scanComponents();
    const matching = components.filter(c => 
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (matching.length === 0) {
      throw new Error(`Component '${name}' not found`);
    }
    
    const component = matching[0];
    const fileData = await fetchFromGitHub(component.path);
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            name: component.name,
            project: 'website',
            path: component.path,
            github_url: component.url,
            code: content,
          }, null, 2),
        },
      ],
    };
  }

  if (toolName === 'search_components') {
    const query = args?.query?.toLowerCase();
    if (!query) {
      throw new Error('Search query is required');
    }
    
    const components = await scanComponents();
    const matching = components.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    );
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            query,
            total_results: matching.length,
            results: matching,
          }, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${toolName}`);
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const body = await request.json();
        
        // Handle tools/call specially (async)
        if (body.method === 'tools/call') {
          const { name, arguments: args } = body.params;
          
          try {
            const result = await handleToolCall(name, args);
            const response: JsonRpcResponse = {
              jsonrpc: '2.0',
              id: body.id,
              result,
            };
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
          } catch (error: any) {
            const response: JsonRpcResponse = {
              jsonrpc: '2.0',
              id: body.id,
              error: {
                code: -32603,
                message: error?.message || 'Internal error',
              },
            };
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
          }
        } else {
          // Handle sync methods (initialize, tools/list)
          const response = handleJsonRpc(body);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
        }
        
        controller.close();
      } catch (error: any) {
        const response: JsonRpcResponse = {
          jsonrpc: '2.0',
          error: {
            code: -32700,
            message: 'Parse error',
            data: error?.message,
          },
        };
        
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
