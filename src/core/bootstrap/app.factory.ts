import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { getLoggerConfig } from '../logger/logger.config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'

export async function createApp(): Promise<NestFastifyApplication> {
  const fastifyAdapter = new FastifyAdapter({
    logger: getLoggerConfig(),
    trustProxy: true, // Si usa un proxy inverso. Caso contrario error con @Ip()
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, { bufferLogs: true })
  return app
}
