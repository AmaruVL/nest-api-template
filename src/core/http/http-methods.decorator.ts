/**
 * @fileoverview Decoradores de métodos HTTP con propiedades adicionales
 */
import {
  Delete as HttpDelete,
  Get as HttpGet,
  Patch as HttpPatch,
  Post as HttpPost,
  Put as HttpPut,
  applyDecorators,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

type HttpMethodFunction = (path?: string | string[]) => MethodDecorator
type CustomHttpMethodFunction = (path?: string, options?: HttpMethodOptions) => MethodDecorator

export function createHttpDecorator(httpMethod: HttpMethodFunction): CustomHttpMethodFunction {
  return function (path?: string, options?: HttpMethodOptions): MethodDecorator {
    const decorators = [httpMethod(path)]
    const { summary, description, deprecated, skipAuth } = options || {}

    // Convertir descripcion de array a string si es necesario
    const formattedDescription = Array.isArray(description) ? description.join('\n') : description

    // Agregar decorador para la documentación de la API
    decorators.push(ApiOperation({ summary, description: formattedDescription, deprecated }))

    // Agregar decoradores relacionados con la autenticación
    if (skipAuth) {
      // decorators.push(SkipAuth())
    } else decorators.push(ApiBearerAuth())

    return applyDecorators(...decorators)
  }
}

export const Get = createHttpDecorator(HttpGet)
export const Post = createHttpDecorator(HttpPost)
export const Patch = createHttpDecorator(HttpPatch)
export const Put = createHttpDecorator(HttpPut)
export const Delete = createHttpDecorator(HttpDelete)

interface HttpMethodOptions {
  summary?: string
  description?: string | string[]
  deprecated?: boolean
  skipAuth?: boolean
}
