import { NextResponse } from 'next/server';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } as Record<string, string>;
}

function payload() {
  return {
    name: 'GTM Labs MCP API',
    version: '1.0.1',
    description: 'Access GTM Labs components via API',
    endpoints: {
      list_components: {
        url: '/api/mcp/list-components',
        method: 'GET',
        params: {
          category: 'optional - filter by category',
        },
      },
      get_component: {
        url: '/api/mcp/get-component',
        method: 'GET',
        params: {
          name: 'required - component name',
        },
      },
      search_components: {
        url: '/api/mcp/search-components',
        method: 'GET',
        params: {
          query: 'required - search query',
        },
      },
    },
    examples: {
      list: 'https://gtmlabs.io/api/mcp/list-components',
      get: 'https://gtmlabs.io/api/mcp/get-component?name=pricing-section',
      search: 'https://gtmlabs.io/api/mcp/search-components?query=card',
    },
  };
}

export async function GET() {
  return NextResponse.json(payload(), { headers: corsHeaders() });
}

export async function POST() {
  return NextResponse.json(payload(), { headers: corsHeaders() });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}
