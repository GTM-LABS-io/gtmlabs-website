#!/bin/bash

# Update Windsurf MCP config to add GTM Labs MCP

CONFIG_FILE="$HOME/.codeium/windsurf/mcp_config.json"
BACKUP_FILE="$CONFIG_FILE.backup"

echo "📝 Updating Windsurf MCP configuration..."

# Backup existing config
cp "$CONFIG_FILE" "$BACKUP_FILE"
echo "✅ Backup created: $BACKUP_FILE"

# Read existing config and add gtm-labs
python3 << 'EOF'
import json
import os

config_file = os.path.expanduser("~/.codeium/windsurf/mcp_config.json")

with open(config_file, 'r') as f:
    config = json.load(f)

# Add gtm-labs MCP server
config['mcpServers']['gtm-labs'] = {
    "command": "python3.11",
    "args": [os.path.expanduser("~/mcp-servers/gtm-labs-mcp.py")]
}

# Write back
with open(config_file, 'w') as f:
    json.dump(config, f, indent=2)

print("✅ GTM Labs MCP added to Windsurf config")
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Configuration Updated!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Restart Windsurf completely"
echo "2. Test: 'Use GTM Labs MCP to list components'"
echo ""
