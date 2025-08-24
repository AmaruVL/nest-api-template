import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsPort, IsString } from 'class-validator'
import { Environment } from '../global/global.enums'

export class EnvironmentVariablesDto {
  // SERVIDOR
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsPort()
  PORT: string

  @IsString()
  @IsNotEmpty()
  TZ: string

  @IsString()
  @IsNotEmpty()
  CORS_ALLOWED_ORIGINS: string

  @IsString()
  @IsNotEmpty()
  @IsIn(['true', 'false'])
  SHOW_API_DOCS: string

  @IsString()
  @IsNotEmpty()
  @IsIn(['true', 'false'])
  SHOW_DB_QUERIES: string

  // BASE DE DATOS
  @IsString()
  @IsNotEmpty()
  DB_USER: string

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string

  @IsString()
  @IsNotEmpty()
  DB_HOST: string

  @IsPort()
  DB_PORT: string

  @IsString()
  @IsNotEmpty()
  DB_NAME: string

  @IsString()
  @IsNotEmpty()
  DB_URL: string

  // DIRECTORIO ARCHIVOS
  @IsString()
  @IsOptional()
  UPLOADS_FILES_PATH?: string

  @IsString()
  @IsOptional()
  LOGS_FILES_PATH?: string
}
