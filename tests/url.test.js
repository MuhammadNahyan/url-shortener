const request = require('supertest');
const app = require('../server'); // make sure your server exports the express app

describe('URL Shortener API', () => {
  let shortId;

  it('POST /api/url - should create a short URL', async () => {
    const res = await request(app)
      .post('/api/url')
      .send({ originalUrl: 'https://example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortId');
    shortId = res.body.shortId;
  });

  it('GET /api/url/:shortId - should redirect to original URL', async () => {
    const res = await request(app).get(`/api/url/${shortId}`);

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('https://example.com');
  });

  it('GET /api/url/:shortId - should 404 on unknown shortId', async () => {
    const res = await request(app).get('/api/url/notfound');

    expect(res.statusCode).toBe(404);
  });
});
