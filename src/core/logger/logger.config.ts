import { FastifyLoggerOptions, FastifyReply, FastifyRequest } from 'fastify'
import { PinoLoggerOptions } from 'fastify/types/logger'
import { Environment } from '../global/global.enums'
import { rotationStream } from './rotation.config'

type LoggerConfig = boolean | (FastifyLoggerOptions & PinoLoggerOptions) | undefined

export function getLoggerConfig(): LoggerConfig {
  const env = (process.env.NODE_ENV || 'development') as Environment

  if (env === Environment.development) {
    return {
      transport: {
        target: 'pino-pretty',
        options: { singleLine: true },
      },
      timestamp: true,
      serializers: {
        req: (request: FastifyRequest) => ({
          method: request.method,
          url: request.url,
        }),
        res: (response: FastifyReply) => ({
          statusCode: response.statusCode,
        }),
      },
    }
  }

  if (env === Environment.production) {
    return {
      stream: rotationStream,
      timestamp: true,
      serializers: {
        req: (request: FastifyRequest) => ({
          method: request.method,
          url: request.url,
          userAgent: request.headers['user-agent'],
          authorization: request.headers.authorization,
          host: request.host,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort,
        }),
        res: (response: FastifyReply) => ({
          statusCode: response.statusCode,
        }),
      },
    }
  }

  if (env === Environment.test) {
    return false
  }
}

export function logBodyRequest(
  req: FastifyRequest<{ Body: Record<string, unknown> | undefined }>,
  reply: FastifyReply,
  next: () => void,
): void {
  if (req.body == null) return next()

  // Hide password
  if (req.body.contrasenia) {
    req.log.info({ body: { ...req.body, contrasenia: '********' } }, 'parsed body')
    return next()
  }

  req.log.info({ body: req.body }, 'parsed body')
  next()
}
