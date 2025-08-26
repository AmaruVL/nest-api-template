import { FastifyInstance } from 'fastify'
import { logBodyRequest, PinoLoggerService } from 'src/core'

export function setupLogger(app: any) {
  const fastify: FastifyInstance = app.getHttpAdapter().getInstance()
  fastify.addHook('preHandler', logBodyRequest)
  app.useLogger(new PinoLoggerService(fastify.log))
}
