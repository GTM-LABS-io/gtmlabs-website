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
          resources: {
            subscribe: false,
            listChanged: false,
          },
          prompts: {
            listChanged: false,
          },
        },
        serverInfo: {
          name: 'gtm-labs',
          version: '1.0.0',
        },
      },
    };
  }

  // Initialized notification (no response needed, but handle it)
  if (method === 'notifications/initialized') {
    return {
      jsonrpc: '2.0',
      id,
      result: {},
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

  // List resources - expose components as resources
  if (method === 'resources/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        resources: [
          {
            uri: 'component://list',
            name: 'Component List',
            description: 'List of all available GTM Labs components',
            mimeType: 'application/json',
          },
          {
            uri: 'component://categories',
            name: 'Component Categories',
            description: 'Available component categories',
            mimeType: 'application/json',
          },
        ],
      },
    };
  }

  // Read resource content
  if (method === 'resources/read') {
    const uri = params?.uri;
    
    if (uri === 'component://list') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          contents: [
            {
              uri: 'component://list',
              mimeType: 'application/json',
              text: JSON.stringify({
                message: 'Use the list_components tool to get the full list',
                hint: 'Call tools/call with name: "list_components"',
              }, null, 2),
            },
          ],
        },
      };
    }
    
    if (uri === 'component://categories') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          contents: [
            {
              uri: 'component://categories',
              mimeType: 'application/json',
              text: JSON.stringify({
                categories: ['ui', 'sections', 'animations', 'cards', 'experiments'],
                description: 'Available component categories in GTM Labs',
              }, null, 2),
            },
          ],
        },
      };
    }
    
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32602,
        message: `Resource not found: ${uri}`,
      },
    };
  }

  // List prompts
  if (method === 'prompts/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        prompts: [
          {
            name: 'find-component',
            description: 'Help find the right component for a specific use case',
            arguments: [
              {
                name: 'use_case',
                description: 'Describe what you want to build (e.g., "pricing page", "hero section")',
                required: true,
              },
            ],
          },
          {
            name: 'component-usage',
            description: 'Get instructions on how to use a specific component',
            arguments: [
              {
                name: 'component_name',
                description: 'Name of the component',
                required: true,
              },
            ],
          },
        ],
      },
    };
  }

  // Get prompt
  if (method === 'prompts/get') {
    const promptName = params?.name;
    const args = params?.arguments || {};
    
    if (promptName === 'find-component') {
      const useCase = args.use_case || 'general UI component';
      return {
        jsonrpc: '2.0',
        id,
        result: {
          description: `Finding components for: ${useCase}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `I need help finding GTM Labs components for this use case: ${useCase}. Please search the available components and suggest the most suitable ones.`,
              },
            },
          ],
        },
      };
    }
    
    if (promptName === 'component-usage') {
      const componentName = args.component_name || '';
      return {
        jsonrpc: '2.0',
        id,
        result: {
          description: `Usage guide for: ${componentName}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please get the component "${componentName}" and explain how to use it, including its props and any important implementation details.`,
              },
            },
          ],
        },
      };
    }
    
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32602,
        message: `Prompt not found: ${promptName}`,
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

export async function GET() {
  const encoder = new TextEncoder();
  
  // Return SSE stream that sends server info immediately
  const stream = new ReadableStream({
    start(controller) {
      // Send initial server info as SSE message event
      const serverInfo = {
        jsonrpc: '2.0',
        method: 'server/info',
        params: {
          name: 'gtm-labs',
          version: '1.0.0',
          capabilities: {
            tools: {},
            resources: {
              subscribe: false,
              listChanged: false,
            },
            prompts: {
              listChanged: false,
            },
          },
        },
      };
      
      controller.enqueue(encoder.encode(`event: message\ndata: ${JSON.stringify(serverInfo)}\n\n`));
      
      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        } catch (e) {
          clearInterval(heartbeat);
        }
      }, 30000);
      
      // Cleanup after 10 minutes
      setTimeout(() => {
        clearInterval(heartbeat);
        controller.close();
      }, 600000);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Read body text first
        const bodyText = await request.text();
        
        // Handle empty body
        if (!bodyText || bodyText.trim() === '') {
          const response: JsonRpcResponse = {
            jsonrpc: '2.0',
            error: {
              code: -32700,
              message: 'Parse error: Empty request body',
            },
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
          controller.close();
          return;
        }
        
        const body = JSON.parse(bodyText);
        
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
