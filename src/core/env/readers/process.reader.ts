/**
 * @fileoverview Lector de variables de entorno basado en process.env.
 * Permite usar `BaseEnvReader` fuera del contexto de NestJS.
 * Solo contiene getters necesarios que son usados fuera del entorno de NestJS.
 */
import 'dotenv/config'
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

  /**
   * Devuelve la URL de conexión a la base de datos
   * expandiendo placeholders y codificando el DB_PASSWORD.
   *
   * Ejemplo:
   * "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
   */
  get databaseUrl(): string {
    const template = this.reqString('DB_URL')
    const urlDb = template.replace(/\$\{(\w+)\}/g, (_, name: string) => {
      let value = this.reqString(name) // si falta, lanza error
      if (name === 'DB_PASSWORD') {
        value = encodeURIComponent(value) // codifica solo el password
      }
      return value
    })
    return urlDb
  }

  get showDbQueries(): boolean {
    return this.optBoolean('SHOW_DB_QUERIES', false)!
  }
}
