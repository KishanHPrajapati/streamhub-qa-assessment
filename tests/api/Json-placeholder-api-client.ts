import { request } from '@playwright/test';

export class JsonPlaceholderApiClient {
  async createPost(payload: object) {
    const apiRequest = await request.newContext({
      baseURL: process.env.API_BASE_URL
    });

    try {
      const response = await apiRequest.post('/posts', {
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const status = response.status();
      const body = await response.json();

      return {
        status,
        body
      };
    } finally {
      await apiRequest.dispose();
    }
  }
}