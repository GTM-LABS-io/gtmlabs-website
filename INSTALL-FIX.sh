#!/bin/bash

echo "🔧 GTM Labs MCP - Python 3.10+ Installation"
echo ""

# Check Python version
PYTHON_VERSION=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
MAJOR=$(echo $PYTHON_VERSION | cut -d. -f1)
MINOR=$(echo $PYTHON_VERSION | cut -d. -f2)

echo "Current Python: $PYTHON_VERSION"
echo ""

if [ "$MAJOR" -lt 3 ] || ([ "$MAJOR" -eq 3 ] && [ "$MINOR" -lt 10 ]); then
    echo "❌ Python 3.10+ required (you have $PYTHON_VERSION)"
    echo ""
    echo "📦 Install Python 3.11 via Homebrew:"
    echo "   brew install python@3.11"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Python version OK"
echo ""

# Check for python3.11 specifically
if command -v python3.11 &> /dev/null; then
    PYTHON_CMD="python3.11"
    PIP_CMD="pip3.11"
    echo "✅ Using python3.11"
elif command -v python3.10 &> /dev/null; then
    PYTHON_CMD="python3.10"
    PIP_CMD="pip3.10"
    echo "✅ Using python3.10"
else
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
    echo "✅ Using python3"
fi

echo ""
echo "📦 Installing MCP SDK..."

# Try to install MCP
$PIP_CMD install 'mcp[cli]' 2>/dev/null || \
$PIP_CMD install mcp 2>/dev/null || \
$PIP_CMD install git+https://github.com/modelcontextprotocol/python-sdk.git

if [ $? -eq 0 ]; then
    echo "✅ MCP SDK installed"
else
    echo "❌ MCP installation failed"
    echo ""
    echo "Try manually:"
    echo "  $PIP_CMD install 'mcp[cli]'"
    exit 1
fi

echo ""
echo "📁 Setting up MCP server..."

# Create directory
mkdir -p ~/mcp-servers

# Copy file
cp gtm-labs-mcp.py ~/mcp-servers/
chmod +x ~/mcp-servers/gtm-labs-mcp.py

echo "✅ Server copied to ~/mcp-servers/"

# Update config with correct Python version
echo ""
echo "⚙️  Updating Windsurf config..."

cat > .windsurf/mcp_config.json << EOF
{
  "gtm-labs": {
    "command": "$PYTHON_CMD",
    "args": ["$HOME/mcp-servers/gtm-labs-mcp.py"]
  }
}
EOF

echo "✅ Config updated with $PYTHON_CMD"

# Test
echo ""
echo "🧪 Testing server..."
timeout 2s $PYTHON_CMD ~/mcp-servers/gtm-labs-mcp.py 2>/dev/null || true

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Installation Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Restart Windsurf"
echo "2. Test: 'Use GTM Labs MCP to list components'"
echo ""
