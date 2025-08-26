/**
 * @fileoverview Servicio para acceder a las variables de entorno validado y tipado.
 */
import path from 'node:path'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Environment } from '../global/global.enums'
import { BaseEnvReader } from './readers/base.reader'

@Injectable()
export class EnvService extends BaseEnvReader {
  constructor(private readonly cfg: ConfigService) {
    super((key) => cfg.get<string | undefined>(key))
  }

  // SERVER
  get nodeEnv(): Environment {
    return this.reqString('NODE_ENV') as Environment
  }

  get port(): number {
    return this.reqNumber('PORT')
  }

  get corsAllowedOrigins(): string[] {
    return this.reqJson<string[]>('CORS_ALLOWED_ORIGINS')
  }

  get showApiDocs(): boolean {
    return this.optBoolean('SHOW_API_DOCS', true)!
  }

  get showDbQueries(): boolean {
    return this.optBoolean('SHOW_DB_QUERIES', false)!
  }

  // CONTAINER
  get isContainer(): boolean {
    return this.optBoolean('IS_CONTAINER', false)!
  }

  // PATHS
  get uploadsFilesPath(): string {
    const defaultPath = path.join(process.cwd(), 'uploads')

    if (this.isContainer) {
      return this.optString('FILES_CONTAINER_PATH', defaultPath)!
    }
    return this.optString('UPLOADS_FILES_PATH', defaultPath)!
  }

  get logsFilesPath(): string {
    const defaultPath = path.join(process.cwd(), 'logs')

    if (this.isContainer) {
      return this.optString('LOGS_CONTAINER_PATH', defaultPath)!
    }
    return this.optString('LOGS_FILES_PATH', defaultPath)!
  }
}
