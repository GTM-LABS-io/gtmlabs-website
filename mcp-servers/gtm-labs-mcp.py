#!/usr/bin/env python3
"""
GTM Labs Design System MCP Server
Version: 1.0.0

A shareable MCP server that provides GTM Labs design system components,
animations, and patterns for building websites with the GTM Labs look and feel.

Installation for AI IDE users:
1. Add to your MCP config
2. Restart your AI IDE
3. Tell your AI: "Use GTM Labs MCP to build..."

Repository: https://github.com/yourusername/gtm-labs-mcp
"""

import json
from typing import Any, Literal, Optional
from pydantic import BaseModel, Field

try:
    from mcp.server.fastmcp import FastMCP
except ImportError:
    print("Installing required dependencies...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "mcp>=1.1.0", "pydantic>=2.0.0"])
    from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("gtm-labs-design-system", version="1.0.0")

# ============================================================================
# DESIGN TOKENS
# ============================================================================

DESIGN_TOKENS = {
    "colors": {
        "primary": {"50": "#f0f9ff", "500": "#0ea5e9", "600": "#0284c7", "900": "#0c4a6e"},
        "neutral": {"50": "#fafafa", "200": "#e5e5e5", "800": "#262626", "950": "#0a0a0a"},
        "accent": {"purple": "#8b5cf6", "pink": "#ec4899", "orange": "#f97316"}
    },
    "typography": {
        "fonts": {
            "heading": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            "body": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        },
        "sizes": {"base": "1rem", "xl": "1.25rem", "2xl": "1.5rem", "4xl": "2.25rem", "6xl": "3.75rem"},
        "weights": {"normal": 400, "medium": 500, "semibold": 600, "bold": 700, "extrabold": 800}
    },
    "spacing": {"sm": "0.75rem", "md": "1rem", "lg": "1.5rem", "xl": "2rem", "2xl": "3rem", "4xl": "6rem"},
    "shadows": {
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
    }
}

# ============================================================================
# COMPONENTS LIBRARY
# ============================================================================

COMPONENTS = {
    "hero_section": {
        "name": "Hero Section",
        "description": "Full-width hero with animated gradient background",
        "html": '''<section class="gtm-hero">
  <div class="gtm-hero-gradient"></div>
  <div class="gtm-hero-content">
    <h1 class="gtm-hero-headline">Your Main Headline</h1>
    <p class="gtm-hero-subheadline">Your compelling subheadline</p>
    <button class="gtm-cta-button">Get Started</button>
  </div>
</section>''',
        "css": '''.gtm-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0a0a0a;
}

.gtm-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%);
  opacity: 0.15;
  animation: gtm-gradient-shift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes gtm-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gtm-hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  padding: 2rem;
}

.gtm-hero-headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: #fafafa;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: gtm-fade-in-up 0.8s ease forwards;
}

.gtm-hero-subheadline {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #e5e5e5;
  max-width: 700px;
  margin: 0 auto 2rem;
  animation: gtm-fade-in-up 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.gtm-cta-button {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.3);
  animation: gtm-fade-in-up 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.gtm-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -5px rgba(14, 165, 233, 0.5);
}

@keyframes gtm-fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}'''
    },
    
    "feature_card": {
        "name": "Feature Card",
        "description": "Card with icon, title, description, and hover effects",
        "html": '''<div class="gtm-feature-card">
  <div class="gtm-feature-icon">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
      <circle cx="16" cy="16" r="12"/>
    </svg>
  </div>
  <h3 class="gtm-feature-title">Feature Title</h3>
  <p class="gtm-feature-description">Feature description goes here.</p>
</div>''',
        "css": '''.gtm-feature-card {
  background: rgba(38, 38, 38, 0.5);
  border: 1px solid rgba(229, 229, 229, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.gtm-feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 20px 40px -10px rgba(14, 165, 233, 0.2);
}

.gtm-feature-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  color: #0ea5e9;
  transition: all 0.4s ease;
}

.gtm-feature-card:hover .gtm-feature-icon {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.4);
}

.gtm-feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 0.75rem;
}

.gtm-feature-description {
  font-size: 1rem;
  color: #a3a3a3;
  line-height: 1.6;
}'''
    },
    
    "navbar": {
        "name": "Navigation Bar",
        "description": "Sticky navbar with blur effect on scroll",
        "html": '''<nav class="gtm-navbar">
  <div class="gtm-navbar-container">
    <a href="/" class="gtm-navbar-logo">Logo</a>
    <div class="gtm-navbar-menu">
      <a href="#features" class="gtm-navbar-link">Features</a>
      <a href="#pricing" class="gtm-navbar-link">Pricing</a>
      <a href="#contact" class="gtm-navbar-link gtm-navbar-cta">Get Started</a>
    </div>
  </div>
</nav>''',
        "css": '''.gtm-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.gtm-navbar.scrolled {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 229, 229, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.gtm-navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gtm-navbar-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}

.gtm-navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.gtm-navbar-link {
  color: #e5e5e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.gtm-navbar-link:hover {
  color: #0ea5e9;
}

.gtm-navbar-cta {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  color: white;
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
}

.gtm-navbar-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.5);
}'''
    }
}

# ============================================================================
# MCP TOOLS
# ============================================================================

@mcp.tool()
def list_components() -> dict[str, Any]:
    """
    List all available GTM Labs design components.
    
    Returns component names, descriptions, and features.
    Use this first to see what's available.
    """
    return {
        "components": [
            {"name": key, "display_name": comp["name"], "description": comp["description"]}
            for key, comp in COMPONENTS.items()
        ],
        "usage": "Use get_component() to retrieve HTML/CSS code for any component"
    }

@mcp.tool()
def get_component(component_name: str) -> str:
    """
    Get complete code (HTML + CSS) for a specific component.
    
    Args:
        component_name: Component to retrieve (hero_section, feature_card, navbar)
    
    Returns:
        Complete HTML and CSS code with GTM Labs styling
        
    Example:
        get_component("hero_section") → Returns hero HTML/CSS
    """
    if component_name not in COMPONENTS:
        available = ", ".join(COMPONENTS.keys())
        return f"Component not found. Available: {available}"
    
    comp = COMPONENTS[component_name]
    
    return f"""# {comp['name']}

{comp['description']}

## HTML

```html
{comp['html']}
```

## CSS

```css
{comp['css']}
```

## Usage Notes

- Replace placeholder text with your content
- Customize colors using design tokens
- All animations are included
- Classes are prefixed with 'gtm-' to avoid conflicts
"""

@mcp.tool()
def get_design_tokens(
    category: Optional[Literal["colors", "typography", "spacing", "shadows", "all"]] = "all"
) -> str:
    """
    Get GTM Labs design system tokens (colors, typography, spacing, etc.).
    
    Args:
        category: Token category to retrieve (default: all)
    
    Returns:
        Design tokens in CSS custom property format
    """
    if category == "all":
        tokens = DESIGN_TOKENS
    elif category in DESIGN_TOKENS:
        tokens = {category: DESIGN_TOKENS[category]}
    else:
        return f"Category not found. Available: colors, typography, spacing, shadows, all"
    
    output = ["# GTM Labs Design Tokens\n"]
    output.append("```css")
    output.append(":root {")
    
    if "colors" in tokens:
        output.append("  /* Colors */")
        for group, shades in tokens["colors"].items():
            if isinstance(shades, dict):
                for shade, value in shades.items():
                    output.append(f"  --gtm-{group}-{shade}: {value};")
            else:
                output.append(f"  --gtm-{group}: {shades};")
    
    if "typography" in tokens:
        output.append("\n  /* Typography */")
        for cat, values in tokens["typography"].items():
            if isinstance(values, dict):
                for key, value in values.items():
                    output.append(f"  --gtm-font-{key}: {value};")
    
    if "spacing" in tokens:
        output.append("\n  /* Spacing */")
        for key, value in tokens["spacing"].items():
            output.append(f"  --gtm-space-{key}: {value};")
    
    if "shadows" in tokens:
        output.append("\n  /* Shadows */")
        for key, value in tokens["shadows"].items():
            output.append(f"  --gtm-shadow-{key}: {value};")
    
    output.append("}")
    output.append("```")
    
    return "\n".join(output)

@mcp.tool()
def build_page(sections: list[str]) -> str:
    """
    Build a complete page with specified GTM Labs components.
    
    Args:
        sections: List of component names to include (e.g., ["navbar", "hero_section", "feature_card"])
    
    Returns:
        Complete HTML page with all requested components
        
    Example:
        build_page(["navbar", "hero_section"]) → Full page with nav and hero
    """
    output = ['''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Built with GTM Labs Design System</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #0a0a0a;
      color: #fafafa;
    }
''']
    
    # Add CSS for each component
    for section in sections:
        if section in COMPONENTS:
            output.append(f"\n    /* {COMPONENTS[section]['name']} */")
            output.append(COMPONENTS[section]['css'])
    
    output.append('''
  </style>
</head>
<body>
''')
    
    # Add HTML for each component
    for section in sections:
        if section in COMPONENTS:
            output.append(f"\n  <!-- {COMPONENTS[section]['name']} -->")
            output.append("  " + COMPONENTS[section]['html'])
    
    output.append('''
  
  <script>
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.gtm-navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  </script>
</body>
</html>
''')
    
    return "\n".join(output)

@mcp.tool()
def customize_colors(
    primary: Optional[str] = None,
    secondary: Optional[str] = None,
    background: Optional[str] = None
) -> str:
    """
    Generate CSS for custom color scheme while maintaining GTM Labs design.
    
    Args:
        primary: Primary color hex (e.g., "#FF6B6B")
        secondary: Secondary color hex (e.g., "#4ECDC4")  
        background: Background color hex (e.g., "#1A1A2E")
    
    Returns:
        CSS custom properties to override default colors
        
    Example:
        customize_colors(primary="#FF6B6B", secondary="#4ECDC4")
    """
    output = ["```css", ":root {"]
    
    if primary:
        output.append(f"  --gtm-primary-500: {primary};")
        output.append(f"  /* Update gradients */")
        output.append(f"  --gtm-gradient-start: {primary};")
    
    if secondary:
        output.append(f"  --gtm-accent-purple: {secondary};")
        output.append(f"  --gtm-gradient-end: {secondary};")
    
    if background:
        output.append(f"  --gtm-bg-primary: {background};")
    
    output.append("}")
    output.append("```")
    output.append("\nAdd this CSS after the GTM Labs styles to customize colors.")
    
    return "\n".join(output)

# ============================================================================
# RUN SERVER
# ============================================================================

if __name__ == "__main__":
    mcp.run()
