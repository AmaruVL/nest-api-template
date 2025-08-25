import { BaseEnvReader } from './base-env-reader'

export class EnvReaderFromProcess extends BaseEnvReader {
  constructor() {
    super((key) => process.env[key])
  }
}
