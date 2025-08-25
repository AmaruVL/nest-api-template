import { LoggerService } from '@nestjs/common'
import { FastifyBaseLogger } from 'fastify'

const contextsToIgnore = ['InstanceLoader', 'RoutesResolver', 'RouterExplorer', 'NestFactory', 'WebSocketsController']

export class PinoLoggerService implements LoggerService {
  constructor(private readonly logger: FastifyBaseLogger) {}

  log(message: any, context?: string) {
    if (context && contextsToIgnore.includes(context)) return // Ignorar logs de NestJS
    this.logger.info({ context }, message)
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message)
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message)
  }

  debug?(message: any, context?: string) {
    this.logger.debug({ context }, message)
  }

  verbose?(message: any, context?: string) {
    this.logger.trace({ context }, message)
  }
}
