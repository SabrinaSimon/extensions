import * as vscode from 'vscode';
import { fetchAlertsFromProvider } from './fetcher';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('alertDashboard.addProvider', async () => {
      const settings = vscode.workspace.getConfiguration('alertDashboard');
      const providers = settings.get<any[]>('providers') || [];

      const newProvider = {
        name: 'Example Dashboard',
        baseUrl: 'https://api.example.com/alerts',
        headers: {
          Authorization: 'Bearer ${env:YOUR_API_KEY}'
        },
        parsingRules: {
          listPath: 'alerts',
          idPath: 'id',
          statusPath: 'severity',
          messagePath: 'description'
        }
      };

      await settings.update('providers', [...providers, newProvider], vscode.ConfigurationTarget.Workspace);
      vscode.window.showInformationMessage('Provider configuration added to settings.json.');
    })
  );

  const providers = vscode.workspace.getConfiguration('alertDashboard').get<any[]>('providers');
  if (!providers || providers.length === 0) {
    vscode.window.showInformationMessage('No alert providers configured. Run "Alert Dashboard: Add Provider" to get started.');
  } else {
    providers.forEach(async (provider) => {
      const alerts = await fetchAlertsFromProvider(provider);
      console.log(alerts); // You can render this in a TreeView or panel
    });
  }
}

export function deactivate() {}