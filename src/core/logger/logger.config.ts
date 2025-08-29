/**
 * @fileoverview Configuración del logger para Fastify usando Pino.
 */
import 'dotenv/config'
import { FastifyLoggerOptions, FastifyReply, FastifyRequest } from 'fastify'
import { PinoLoggerOptions } from 'fastify/types/logger'
import { Environment } from '../global/global.enums'
import { rotationStream } from './rotation.config'
import { EnvReaderFromProcess } from '../env/readers/process.reader'

type LoggerConfig = boolean | (FastifyLoggerOptions & PinoLoggerOptions) | undefined

const env = new EnvReaderFromProcess()
const nodeEnv = env.nodeEnv

export function getLoggerConfig(): LoggerConfig {
  if (nodeEnv === Environment.development) {
    return {
      transport: {
        target: 'pino-pretty',
        options: { singleLine: true },
      },
      timestamp: true,
      serializers: {
        req: (request: FastifyRequest) => ({
          id: 'value' + Math.random().toString(16).slice(2),
          method: request.method,
          url: request.url,
        }),
        res: (response: FastifyReply) => ({
          statusCode: response.statusCode,
        }),
      },
    }
  }

  if (nodeEnv === Environment.production) {
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

  if (nodeEnv === Environment.test) {
    return false
  }
}

// export function logBodyRequest(
//   req: FastifyRequest<{ Body: Record<string, unknown> | undefined }>,
//   reply: FastifyReply,
//   next: () => void,
// ): void {
//   if (req.body == null) return next()

//   // Hide password
//   if (req.body.contrasenia) {
//     req.log.info({ body: { ...req.body, contrasenia: '********' } }, 'parsed body')
//     return next()
//   }

//   req.log.info({ body: req.body }, 'parsed body')
//   next()
// }

export function logBodyRequest(
  req: FastifyRequest<{ Body: Record<string, unknown> | undefined }>,
  reply: FastifyReply,
  next: () => void,
): void {
  const body = req.body
  if (!body) return next()

  // Evita loguear si viene multipart/form-data o muy grande
  const ct = (req.headers['content-type'] || '').toLowerCase()
  const isMultipart = ct.includes('multipart/form-data')
  const rawLen = Number(req.headers['content-length'] || 0)
  if (isMultipart || rawLen > 1024 * 50) {
    // >50KB
    req.log.info({ note: 'body skipped (multipart/large)' }, 'parsed body')
    return next()
  }

  // Ocultar campos sensibles del body
  const shadow = (k: string) => (k in body ? '********' : undefined)
  const masked = {
    ...body,
    contrasenia: shadow('contrasenia'),
  }

  req.log.info({ body: masked }, 'parsed body')
  next()
}
