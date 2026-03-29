// Auto-loader for slack-cli napi addon
const path = require('path');
const os = require('os');

const TARGETS = {
  'darwin-arm64': 'slack-cli.darwin-arm64.node',
  'darwin-x64': 'slack-cli.darwin-x64.node',
  'linux-x64': 'slack-cli.linux-x64-gnu.node',
  'linux-arm64': 'slack-cli.linux-arm64-gnu.node',
  'win32-x64': 'slack-cli.win32-x64-msvc.node',
  'win32-arm64': 'slack-cli.win32-arm64-msvc.node',
};

const key = `${os.platform()}-${os.arch()}`;
const file = TARGETS[key];

function tryLoad(name) {
  try { return require(path.join(__dirname, name)); } catch { return null; }
}

// Try platform-specific name first, then generic fallback
module.exports = (file && tryLoad(file)) || tryLoad('slack-cli.node');
