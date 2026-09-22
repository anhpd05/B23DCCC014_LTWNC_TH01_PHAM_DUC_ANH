import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AllExceptionsFilter } from './../src/common/filters/all-exceptions.filter';
import { TransformInterceptor } from './../src/common/interceptors/transform.interceptor';

describe('AssignmentsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  it('/api/assignments (GET) trả về envelope thành công với 6 bản ghi seed', () => {
    return request(app.getHttpServer())
      .get('/api/assignments')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toHaveLength(6);
        expect(res.body.message).toBe('OK');
      });
  });

  it('/api/assignments/:id (GET) trả về envelope lỗi 404 khi id không tồn tại', () => {
    return request(app.getHttpServer())
      .get('/api/assignments/khong-ton-tai')
      .expect(404)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.data).toBeNull();
        expect(res.body.statusCode).toBe(404);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
