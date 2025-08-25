export function setupCors(app: any, corsOrigins: string[]) {
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })
}
