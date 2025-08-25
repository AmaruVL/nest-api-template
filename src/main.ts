import { ValidationPipe } from '@nestjs/common'
import { createApp } from './core/bootstrap/app.factory'
import { EnvService } from './core/env/env.service'
// import { createApp, setupSwagger, setupLogger, setupStatic, setupCors, startApp } from './core/bootstrap'
// import { join } from 'path'

async function bootstrap() {
  const app = await createApp()

  // Load env variables
  const envService = app.get(EnvService)
  const port = envService.port
  const corsOrigins = envService.corsAllowedOrigins
  const isDocker = envService.isDocker
  const uploadsPath = isDocker ? '/app/files/uploads' : envService.uploadsFilesPath

  // Global app settings
  app.setGlobalPrefix('api-sgd')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }))

  // Modular setup
  await setupSwagger(app)
  setupLogger(app)
  await setupStatic(app, uploadsPath)
  setupCors(app, corsOrigins)

  // Start server
  await startApp(app, port, '/api-docs') // aquí puedes usar docPath dinámico

  // BigInt support in JSON
  ;(BigInt.prototype as any).toJSON = function () {
    const int = Number.parseInt(this.toString())
    return int ?? this.toString()
  }
}

void bootstrap()
