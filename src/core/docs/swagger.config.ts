/**
 * @fileoverview Configuración de Swagger (ruta, options, builder).
 */
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

// Swagger custom options
export const docPath = 'api/docs'
export const docJsonPath = `${docPath}/json`

export const docOptions: SwaggerCustomOptions = {
  customSiteTitle: 'API Documentation',
  jsonDocumentUrl: docJsonPath,
  swaggerOptions: {
    docExpansion: 'none', // 'none' | 'list' | 'full'
  },
}

// Swagger config for API documentation
export const docConfigs = new DocumentBuilder()
  .setTitle('API Plantilla NestJS')
  .setExternalDoc('API swagger JSON', `${docJsonPath}`)
  .setDescription('Documentación de la API generada con Swagger')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('Autenticacion / Sesion', 'Iniciar sesión en el sistema')
  .build()
