import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../support/world';
import { JsonPlaceholderApiClient } from '../api/Json-placeholder-api-client';

let responseStatus: number;
let responseBody: any;

const apiClient = new JsonPlaceholderApiClient();

When(
  'I send a valid create post request',
  async function (this: CustomWorld) {
    const response = await apiClient.createPost({
      title: 'Streamhub Assessment',
      body: 'Testing JSONPlaceholder API',
      userId: 1
    });

    responseStatus = response.status;
    responseBody = response.body;
  }
);

When(
  'I send a post with an excessively long title',
  async function (this: CustomWorld) {
    const longTitle = 'A'.repeat(5000);

    const response = await apiClient.createPost({
      title: longTitle,
      body: 'Long title API test',
      userId: 1
    });

    responseStatus = response.status;
    responseBody = response.body;
  }
);

When(
  'I send a post with unsupported special characters',
  async function (this: CustomWorld) {
    const response = await apiClient.createPost({
      title: '<>[]{}|~`!@#$%^&*()',
      body: 'Special character API test',
      userId: 1
    });

    responseStatus = response.status;
    responseBody = response.body;
  }
);

When(
  'I send a post without userId',
  async function (this: CustomWorld) {
    const response = await apiClient.createPost({
      title: 'Missing userId test',
      body: 'Testing missing required field'
    });

    responseStatus = response.status;
    responseBody = response.body;
  }
);

Then(
  'the API response status should be 201',
  async function () {
    expect(responseStatus).toBe(201);
  }
);

Then(
  'the response should contain the created post',
  async function () {
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('id');
  }
);

Then(
  'the API should not return a server failure',
  async function () {
    expect(responseStatus).toBeDefined();

    expect(responseStatus).toBeGreaterThanOrEqual(200);
    expect(responseStatus).toBeLessThan(500);
  }
);