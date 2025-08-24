import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import path from 'node:path'
import { Environment } from '../global/global.enums'

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  // MARK: Privados
  private getString(key: string): string {
    return this.configService.getOrThrow<string>(key)
  }

  private getNumber(key: string): number {
    const value = this.getString(key)
    const parsed = Number(value)
    if (isNaN(parsed)) {
      throw new Error(`Environment variable ${key} should be a number`)
    }
    return parsed
  }

  private getBoolean(key: string): boolean {
    return this.getString(key).toLowerCase() === 'true'
  }

  private getJson<T>(key: string): T {
    const value = this.getString(key)
    try {
      return JSON.parse(value) as T
    } catch {
      throw new Error(`Environment variable ${key} should be valid JSON`)
    }
  }

  // MARK: Getters
  // SERVIDOR
  get isDocker(): boolean {
    return this.getBoolean('IS_DOCKER')
  }

  get nodeEnv(): Environment {
    return this.getString('NODE_ENV') as Environment
  }

  get port(): number {
    return this.getNumber('PORT')
  }

  get corsAllowedOrigins(): string[] {
    return this.getJson<string[]>('CORS_ALLOWED_ORIGINS')
  }

  get showApiDocs(): boolean {
    return this.getBoolean('SHOW_API_DOCS')
  }

  get showDbQueries(): boolean {
    return this.getBoolean('SHOW_DB_QUERIES')
  }

  // DIRECTORIO ARCHIVOS
  get uploadsFilesPath(): string {
    return this.configService.get<string>('UPLOADS_FILES_PATH') || path.join(process.cwd(), 'uploads') // fallback
  }

  get logsFilesPath(): string {
    return this.configService.get<string>('LOGS_FILES_PATH') || path.join(process.cwd(), 'logs') // fallback
  }
}
