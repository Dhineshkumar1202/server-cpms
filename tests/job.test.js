const request = require('supertest');
const app = require('../index'); // Your Express app

describe('Jobs API', () => {
  it('should fetch all jobs', async () => {
    const res = await request(app).get('/jobs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch jobs by subject', async () => {
    const res = await request(app).get('/jobs?subject=Computer Science');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: 'Computer Science' })
      ])
    );
  });

  it('should allow a student to apply for a job', async () => {
    const res = await request(app)
      .post('/jobs/123/apply')
      .send({ studentId: '456', resumeLink: 'http://example.com/resume.pdf' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Application submitted successfully.');
  });
});
