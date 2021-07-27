// noinspection ES6UnusedImports
import * as bp from '@babel/polyfill';
import supertest from 'supertest';
import { startServer } from '../server';

const port = 3003;
let app;

beforeEach(() => {
  app = startServer(port);
});

afterEach(() => app.close());

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
  test('"/new_comment" should create a new comment', async () => {
    const newResourceBody = {
      autor: 'Georgi',
      currentComment: 0,
      idSearch: 0,
      text: 'test'
    };
    const {
      error,
      status,
      body
    } = await request.post('/new_comment').send(newResourceBody);

    const expectedBody = {
      id: 4,
      text: 'test',
      upvotes: 0,
      autor: 'Georgi',
      children: []
    };
    expect(body.children[1]).toEqual(expectedBody);
    expect(error).toBe(false);
    expect(status).toBe(200);
  });
  test('"/post_vote" should vote with +1 to a post', async () => {
    const newResourceBody = {
      currentPost: 0,
      vote: 'upvote'
    };
    const {
      error,
      status,
      body
    } = await request.post('/post_vote').send(newResourceBody);
    expect(body.length).toBe(2);
    expect(body[0].upvotes).toBe(1);
    expect(error).toBe(false);
    expect(status).toBe(200);
  });
  test('"/comment_vote" should vote with +1 to a comment under a post', async () => {
    const newResourceBody = {
      currentComment: 0,
      idSearch: 1,
      vote: 'upvote'
    };
    const {
      error,
      status,
      body
    } = await request.post('/comment_vote').send(newResourceBody);
    expect(body.children[0].upvotes).toBe(1);
    expect(error).toBe(false);
    expect(status).toBe(200);
  });
  test('"/new_post" should make new post', async () => {
    const newResourceBody = {
      autor: 'Dimitar',
      text: 'Comment',
      title: 'Test title'
    };
    const {
      error,
      status,
      body
    } = await request.post('/new_post').send(newResourceBody);

    const expectedBody = {
      id: 5,
      title: 'Test title',
      text: 'Comment',
      upvotes: 0,
      autor: 'Dimitar',
      children: []
    };
    expect(body.length).toBe(3);
    expect(body[2]).toEqual(expectedBody);
    expect(error).toBe(false);
    expect(status).toBe(200);
  });
});
