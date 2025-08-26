/**
 * @fileoverview Lector de variables de entorno basado en process.env.
 * Permite usar `BaseEnvReader` fuera del contexto de NestJS.
 */
import { BaseEnvReader } from './base.reader'

export class EnvReaderFromProcess extends BaseEnvReader {
  constructor() {
    super((key) => process.env[key])
  }
}
