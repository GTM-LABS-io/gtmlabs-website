import { NextResponse } from 'next/server';

const GITHUB_OWNER = 'GTM-LABS-io';
const GITHUB_REPO = 'gtmlabs-website';

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
        type: 'file'
      });
    } else if (item.type === 'dir') {
      const subComponents = await scanComponents(item.path);
      components.push(...subComponents);
    }
  }
  
  return components;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name) {
      return NextResponse.json(
        { error: 'Component name is required' },
        { status: 400 }
      );
    }
    
    // Find the component
    const components = await scanComponents();
    const matching = components.filter(c => 
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (matching.length === 0) {
      return NextResponse.json(
        { error: `Component '${name}' not found` },
        { status: 404 }
      );
    }
    
    // Get the first match
    const component = matching[0];
    const fileData = await fetchFromGitHub(component.path);
    
    // Decode base64 content
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    return NextResponse.json({
      name: component.name,
      project: 'website',
      path: component.path,
      github_url: component.url,
      code: content
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Unknown error while getting component' },
      { status: 500 }
    );
  }
}

