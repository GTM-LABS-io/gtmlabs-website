import { NextRequest } from 'next/server';

/**
 * Persistent SSE stream for MCP protocol
 * Claude browser connects here and sends JSON-RPC messages
 */

const GITHUB_OWNER = 'GTM-LABS-io';
const GITHUB_REPO = 'gtmlabs-website';

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number;
  method: string;
  params?: any;
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
    throw new Error(`GitHub API error ${response.status}`);
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

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Helper to send SSE message
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      
      try {
        const body = await request.json();
        const { method, params, id } = body as JsonRpcRequest;
        
        // Initialize
        if (method === 'initialize') {
          send({
            jsonrpc: '2.0',
            id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: {
                tools: {},
                resources: {},
              },
              serverInfo: {
                name: 'gtm-labs',
                version: '1.0.0',
              },
            },
          });
        }
        
        // Tools list
        else if (method === 'tools/list') {
          send({
            jsonrpc: '2.0',
            id,
            result: {
              tools: [
                {
                  name: 'list_components',
                  description: 'List all available components from GTM Labs projects',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      category: {
                        type: 'string',
                        description: 'Optional: Filter by category',
                      },
                    },
                  },
                },
                {
                  name: 'get_component',
                  description: 'Get a specific component with its full code',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Component name',
                      },
                    },
                    required: ['name'],
                  },
                },
                {
                  name: 'search_components',
                  description: 'Search for components by name or category',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      query: {
                        type: 'string',
                        description: 'Search query',
                      },
                    },
                    required: ['query'],
                  },
                },
              ],
            },
          });
        }
        
        // Resources list
        else if (method === 'resources/list') {
          send({
            jsonrpc: '2.0',
            id,
            result: {
              resources: [],
            },
          });
        }
        
        // Tool call
        else if (method === 'tools/call') {
          const { name, arguments: args } = params;
          
          if (name === 'list_components') {
            const components = await scanComponents();
            const categoryFilter = args?.category;
            
            let filtered = components;
            if (categoryFilter) {
              filtered = components.filter(c => c.category === categoryFilter);
            }
            
            const byCategory: Record<string, string[]> = {};
            filtered.forEach(comp => {
              const cat = comp.category;
              if (!byCategory[cat]) byCategory[cat] = [];
              byCategory[cat].push(comp.name);
            });
            
            send({
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify({
                      project: 'website',
                      total_components: filtered.length,
                      categories: byCategory,
                      components: filtered,
                    }, null, 2),
                  },
                ],
              },
            });
          }
          
          else if (name === 'search_components') {
            const query = args?.query?.toLowerCase();
            if (!query) {
              throw new Error('Search query is required');
            }
            
            const components = await scanComponents();
            const matching = components.filter(c =>
              c.name.toLowerCase().includes(query) ||
              c.category.toLowerCase().includes(query)
            );
            
            send({
              jsonrpc: '2.0',
              id,
              result: {
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
              },
            });
          }
          
          else if (name === 'get_component') {
            const componentName = args?.name;
            if (!componentName) {
              throw new Error('Component name is required');
            }
            
            const components = await scanComponents();
            const matching = components.filter(c =>
              c.name.toLowerCase().includes(componentName.toLowerCase())
            );
            
            if (matching.length === 0) {
              throw new Error(`Component '${componentName}' not found`);
            }
            
            const component = matching[0];
            const fileData = await fetchFromGitHub(component.path);
            const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
            
            send({
              jsonrpc: '2.0',
              id,
              result: {
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
              },
            });
          }
          
          else {
            throw new Error(`Unknown tool: ${name}`);
          }
        }
        
        // Notifications
        else if (method === 'notifications/initialized') {
          send({
            jsonrpc: '2.0',
            id,
            result: {},
          });
        }
        
        // Unknown method
        else {
          send({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          });
        }
        
      } catch (error: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: error?.message || 'Internal error',
          },
        })}\n\n`));
      }
      
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
