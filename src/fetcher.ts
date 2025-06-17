import * as vscode from 'vscode';

function extractValue(obj: any, path: string): any {
  return path.split('.').reduce((o, key) => o?.[key], obj);
}

export async function fetchAlertsFromProvider(config: any): Promise<any[]> {
  const headers: Record<string, string> = {};
  for (const key in config.headers) {
    const value = config.headers[key];
    headers[key] = value.replace(/\$\{env:(.+?)}/g, (_, envVar) => process.env[envVar] || '');
  }

  const res = await fetch(config.baseUrl, { headers });
  const rawData = await res.json();
  const list = extractValue(rawData, config.parsingRules.listPath) || [];

  return list.map((item: any) => ({
    id: extractValue(item, config.parsingRules.idPath),
    status: extractValue(item, config.parsingRules.statusPath)?.toUpperCase(),
    message: extractValue(item, config.parsingRules.messagePath),
    source: config.name
  }));
}