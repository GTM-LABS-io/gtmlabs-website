import { NextResponse } from 'next/server';

const GITHUB_OWNER = 'GTM-LABS-io';
const GITHUB_REPO = 'gtmlabs-website';

async function fetchFromGitHub(path: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
}

async function scanComponents(basePath = 'homepage/components'): Promise<any[]> {
  const components: any[] = [];
  
  try {
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
  } catch (error) {
    console.error('Error scanning components:', error);
  }
  
  return components;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let components = await scanComponents();
    
    // Filter by category if specified
    if (category) {
      components = components.filter(c => c.category === category);
    }
    
    // Group by category
    const byCategory: Record<string, string[]> = {};
    components.forEach(comp => {
      const cat = comp.category;
      if (!byCategory[cat]) {
        byCategory[cat] = [];
      }
      byCategory[cat].push(comp.name);
    });
    
    return NextResponse.json({
      project: 'website',
      total_components: components.length,
      categories: byCategory,
      components
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
