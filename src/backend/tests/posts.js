const {
  before,
  after,
  describe,
  it
} = require('mocha');
const startServer = require('../server');
const supertest = require('supertest');

let app;

before(async () => {
  app = await startServer;
});

after(async () => {
  await app.close();
});

const request = supertest(`http://localhost:3002`);

describe('Create resource tests', () => {
  it('should not create a resource without "required" field', async () => {
    const newResourceBody = { some: 'data' };

    const {
      error,
      status,
      body
    } = await request.get('/posts');

    assert.ok(error);
    assert.equal(status, 400);
    assert.ok(body.error);
    assert.ok(body.error.includes('"required" field is required'));
  });
  it('should create a new resource', async () => {
    const newResourceBody = {
      some: 'data',
      required: 'field'
    };

    const {
      error,
      status,
      body
    } = await request.post('/resource').send(newResourceBody);

    assert.ok(!error);
    assert.equal(status, 201);
    assert.strictEqual(body.count, 1);
    isArray(body.result);
    assert.ok(Array.isArray(body.result));

    const createdResource = body.result[0];

    assert.strictEqual(newResourceBody.some, createdResource.some);
    assert.strictEqual(newResourceBody.required, createdResource.required);
  });
});
