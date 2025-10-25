import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'GTM Labs MCP API',
    version: '1.0.1',
    description: 'Access GTM Labs components via API',
    endpoints: {
      list_components: {
        url: '/api/mcp/list-components',
        method: 'GET',
        params: {
          category: 'optional - filter by category'
        }
      },
      get_component: {
        url: '/api/mcp/get-component',
        method: 'GET',
        params: {
          name: 'required - component name'
        }
      },
      search_components: {
        url: '/api/mcp/search-components',
        method: 'GET',
        params: {
          query: 'required - search query'
        }
      }
    },
    examples: {
      list: 'https://gtmlabs.io/api/mcp/list-components',
      get: 'https://gtmlabs.io/api/mcp/get-component?name=pricing-section',
      search: 'https://gtmlabs.io/api/mcp/search-components?query=card'
    }
  });
}
