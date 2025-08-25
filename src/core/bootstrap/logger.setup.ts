import { FastifyInstance } from 'fastify'
import { logBodyRequest } from '../logger/logger.config'
import { PinoLoggerService } from '../logger/logger.service'

export function setupLogger(app: any) {
  const fastify: FastifyInstance = app.getHttpAdapter().getInstance()
  fastify.addHook('preHandler', logBodyRequest)
  app.useLogger(new PinoLoggerService(fastify.log))
}
