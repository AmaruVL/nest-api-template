import { SwaggerModule } from '@nestjs/swagger'
import { docConfigs, docOptions, docPath, getMetadata } from 'src/core/docs'
import { EnvService } from 'src/core/env/env.service'

export async function setupSwagger(app: any): Promise<void> {
  const env = app.get(EnvService)
  if (!env.showApiDocs) return // No cargar Swagger si está deshabilitado

  const metadata = await getMetadata()
  await SwaggerModule.loadPluginMetadata(metadata)
  const document = SwaggerModule.createDocument(app, docConfigs)
  SwaggerModule.setup(docPath, app, document, docOptions)
}
