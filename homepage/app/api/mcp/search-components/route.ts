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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    const components = await scanComponents();
    const queryLower = query.toLowerCase();
    
    // Search in name and category
    const matching = components.filter(c =>
      c.name.toLowerCase().includes(queryLower) ||
      c.category.toLowerCase().includes(queryLower)
    );
    
    return NextResponse.json({
      query,
      total_results: matching.length,
      results: matching
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Unknown error while searching components' },
      { status: 500 }
    );
  }
}

