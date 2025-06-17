import * as vscode from 'vscode';
import PluginManager from './pluginManager';
import GrafanaPlugin from './plugins/grafana/grafanaPlugin';

export function activate(context: vscode.ExtensionContext) {
  const pluginManager = new PluginManager();
  pluginManager.registerPlugin({
    name: 'grafana',
    pluginClass: GrafanaPlugin,
    options: {
      url: 'http://localhost:3000/api/alerts',
      token: 'your-grafana-api-token'
    }
  });

  let disposable = vscode.commands.registerCommand('extension.activateMonitoring', async () => {
    const plugin = pluginManager.getPlugin('grafana');
    if (plugin) {
      const result = await plugin.getAlerts();
      vscode.window.showInformationMessage(`Grafana Alerts: ${JSON.stringify(result)}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}