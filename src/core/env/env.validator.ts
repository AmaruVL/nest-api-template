/**
 * @fileoverview Validador de configuración de variables de entorno.
 */

import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvironmentSchema } from './env.schema'

export function envValidator(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentSchema, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validated, { skipMissingProperties: false })

  if (errors.length > 0) {
    const details = errors.flatMap((e) => {
      const prop = e.property
      const msgs = Object.values(e.constraints ?? {})
      return msgs.map((m) => `- ${prop}: ${m}`)
    })
    const header = 'Required environment variables are not defined correctly'
    throw new Error(`${header}\n${details.join('\n')}\n`)
  }

  return validated
}

/* import { plainToInstance } from 'class-transformer'
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
 */
