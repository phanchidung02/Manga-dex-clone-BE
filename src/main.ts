import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { HOST, MANGADEX_BASE_URL, PORT } from './environment';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  app.use(urlencoded({ extended: true }));

  app.use(
    '/api/org',
    createProxyMiddleware({
      target: MANGADEX_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/org': '',
      },
      selfHandleResponse: false,
      on: {
        proxyReq: (proxyReq, req) => {
          const token = req.headers.authorization;
          if (token) {
            proxyReq.setHeader('Authorization', token); // Forward token cho MangaDex
          }
        },
      },
    }),
  );
  app.setGlobalPrefix('/api');
  await app.listen(PORT, HOST).then(async () => {});
}
bootstrap();
