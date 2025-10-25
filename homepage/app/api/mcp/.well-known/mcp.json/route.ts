import { NextResponse } from 'next/server';

/**
 * MCP Server Metadata Endpoint
 * Provides discovery information for Claude Custom Connectors
 */
export async function GET() {
  return NextResponse.json({
    name: 'GTM Labs Components',
    description: 'Access GTM Labs UI components from GitHub repository',
    version: '1.0.0',
    protocol: 'mcp',
    transport: 'sse',
    capabilities: {
      tools: true,
      resources: true,
      prompts: true,
    },
    authentication: {
      type: 'none', // We'll add OAuth later if needed
    },
    endpoints: {
      sse: '/api/mcp/sse',
      health: '/api/mcp/health',
    },
    vendor: {
      name: 'GTM Labs',
      url: 'https://gtmlabs.io',
    },
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
