// noinspection ES6UnusedImports
import * as bp from '@babel/polyfill';
import supertest from 'supertest';
import { startServer } from '../server';

const port = 3003;
let app;

beforeAll(() => {
  app = startServer(port);
});

afterAll(() => app.close());

const request = supertest(`http://localhost:${port}`);

describe('backend tests', () => {
  test('"/" returns all posts', async () => {
    const {
      error,
      status,
      body
    } = await request.get('/');
    expect(body.length).toBe(2);
    expect(body[0].title).toBe('TITLE FOR POST');
    expect(error).toBe(false);
    expect(status).toBe(200);
  });
});
