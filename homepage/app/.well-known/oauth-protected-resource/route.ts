import { NextResponse } from 'next/server';

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728)
 * Required for Claude Custom Connectors discovery at ROOT level
 * 
 * Claude looks for this endpoint at /.well-known/oauth-protected-resource
 * NOT at /api/mcp/.well-known/oauth-protected-resource
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gtmlabs.io';
  
  return NextResponse.json({
    // The resource identifier - must match the MCP server URL
    resource: `${baseUrl}/api/mcp/sse`,
    
    // Empty array means no OAuth required (auth type: none)
    // In the future, we can add authorization server URLs here
    authorization_servers: [],
    
    // We support bearer tokens in the Authorization header
    bearer_methods_supported: ['header'],
    
    // Link to human-readable documentation
    resource_documentation: `${baseUrl}/api/mcp/.well-known/mcp.json`,
    
    // MCP-specific metadata
    resource_name: 'GTM Labs Components',
    scopes_supported: [],
    
    // Additional metadata for Claude discovery
    vendor: {
      name: 'GTM Labs',
      url: 'https://gtmlabs.io'
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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