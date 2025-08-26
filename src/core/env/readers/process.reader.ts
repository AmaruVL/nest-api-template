/**
 * @fileoverview Lector de variables de entorno basado en process.env.
 * Permite usar `BaseEnvReader` fuera del contexto de NestJS.
 */
import path from 'node:path'
import { Environment } from 'src/core/global/global.enums'
import { BaseEnvReader } from './base.reader'

export class EnvReaderFromProcess extends BaseEnvReader {
  constructor() {
    super((key) => process.env[key])
  }

  get nodeEnv(): Environment {
    return this.reqString('NODE_ENV') as Environment
  }

  get isContainer(): boolean {
    return this.optBoolean('IS_CONTAINER', false)!
  }

  get logsFilesPath(): string {
    const defaultPath = path.join(process.cwd(), 'logs')

    if (this.isContainer) {
      return this.optString('LOGS_CONTAINER_PATH', defaultPath)!
    }
    return this.optString('LOGS_FILES_PATH', defaultPath)!
  }
}
