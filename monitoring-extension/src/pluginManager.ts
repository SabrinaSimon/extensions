export interface Plugin {
  getAlerts(): Promise<any>;
}

interface PluginRegistration {
  name: string;
  pluginClass: any;
  options?: any;
}

export default class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  registerPlugin(reg: PluginRegistration) {
    const instance = new reg.pluginClass(reg.options);
    this.plugins.set(reg.name, instance);
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
}