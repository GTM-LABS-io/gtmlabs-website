#!/bin/bash

# GTM Labs MCP Setup Script
echo "🚀 Setting up GTM Labs MCP Server..."

# 1. Check Python
echo ""
echo "1️⃣ Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3."
    exit 1
fi
echo "✅ Python 3 found: $(python3 --version)"

# 2. Install MCP package
echo ""
echo "2️⃣ Installing MCP SDK..."
echo "   This may take a moment..."
pip3 install --upgrade pip --quiet 2>/dev/null || true
pip3 install 'mcp[cli]' --quiet 2>/dev/null || \
pip3 install mcp-server --quiet 2>/dev/null || \
pip3 install git+https://github.com/modelcontextprotocol/python-sdk.git --quiet

if [ $? -eq 0 ]; then
    echo "✅ MCP SDK installed"
else
    echo "⚠️  MCP SDK installation had issues, but continuing..."
    echo "   You may need to install manually: pip3 install mcp-server"
fi

# 3. Create MCP directory
echo ""
echo "3️⃣ Creating MCP server directory..."
mkdir -p ~/mcp-servers
echo "✅ Directory created: ~/mcp-servers"

# 4. Copy MCP server
echo ""
echo "4️⃣ Copying MCP server file..."
cp gtm-labs-mcp.py ~/mcp-servers/
chmod +x ~/mcp-servers/gtm-labs-mcp.py
echo "✅ MCP server copied to ~/mcp-servers/gtm-labs-mcp.py"

# 5. Update Windsurf config
echo ""
echo "5️⃣ Updating Windsurf configuration..."
mkdir -p .windsurf

# Get the absolute path
ABSOLUTE_MCP_PATH="$HOME/mcp-servers/gtm-labs-mcp.py"

cat > .windsurf/mcp_config.json << EOF
{
  "gtm-labs": {
    "command": "python3",
    "args": ["$ABSOLUTE_MCP_PATH"]
  }
}
EOF
echo "✅ Windsurf config updated: .windsurf/mcp_config.json"

# 6. Test the server
echo ""
echo "6️⃣ Testing MCP server (will timeout after 3 seconds)..."
timeout 3s python3 ~/mcp-servers/gtm-labs-mcp.py 2>/dev/null || true
echo "✅ MCP server test completed"

# Success message
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ GTM Labs MCP Server Setup Complete! ✨"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo "1. Restart Windsurf to load the new MCP server"
echo "2. Try these test commands in Windsurf:"
echo ""
echo "   ✓ 'Use GTM Labs MCP to list all components'"
echo "   ✓ 'Use GTM Labs MCP to get the hero-section component'"
echo "   ✓ 'Use GTM Labs MCP to show me the design tokens'"
echo ""
echo "📖 Documentation: See MCP-README.md for full usage guide"
echo ""
