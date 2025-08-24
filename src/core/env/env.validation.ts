import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvironmentVariablesDto } from './env.dto'

export function envValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    const constraints = errors.flatMap((obj) => Object.values(obj.constraints || {}))
    const errorName = 'Required environment variables in the .env file are not defined correctly'
    const formatErrors = constraints.map((errorMsg) => `- ${errorMsg}`).join('\n')
    throw new Error(`${errorName}\n${formatErrors}\n`)
  }
  return validatedConfig
}
