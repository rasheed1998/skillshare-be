import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) - registers new user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'testuser@example.com',
      password: 'password123',
      userType: 'user',
      firstName: 'Test',
      lastName: 'User',
      phone: '1234567890',
      address: '123 Street Name, City, ST, 12345',
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('testuser@example.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
