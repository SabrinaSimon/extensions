import axios from 'axios';

export default class GrafanaPlugin {
  private url: string;
  private token: string;

  constructor(options: { url: string, token: string }) {
    this.url = options.url;
    this.token = options.token;
  }

  async getAlerts(): Promise<any> {
    try {
      const response = await axios.get(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      return response.data;
    } catch (error) {
      return { error: 'Failed to fetch alerts' };
    }
  }
}