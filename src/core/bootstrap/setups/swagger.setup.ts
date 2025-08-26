import { SwaggerModule } from '@nestjs/swagger'
import { getMetadata } from '../doc/get-metadata.config'
import { docConfigs, docPath, docOptions } from '../doc/doc.config'
import { EnvService } from 'src/core/env/env.service'

export async function setupSwagger(app: any): Promise<void> {
  const env = app.get(EnvService)
  if (!env.showApiDocs) return // No cargar Swagger si está deshabilitado

  const metadata = await getMetadata()
  await SwaggerModule.loadPluginMetadata(metadata)
  const document = SwaggerModule.createDocument(app, docConfigs)
  SwaggerModule.setup(docPath, app, document, docOptions)
}
