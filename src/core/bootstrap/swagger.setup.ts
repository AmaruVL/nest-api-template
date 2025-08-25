import { SwaggerModule } from '@nestjs/swagger'
import { getMetadata } from '../doc/get-metadata.config'
import { docConfigs, docPath, docOptions } from '../doc/doc.config'

export async function setupSwagger(app: any): Promise<void> {
  const metadata = await getMetadata()
  await SwaggerModule.loadPluginMetadata(metadata)
  const document = SwaggerModule.createDocument(app, docConfigs)
  SwaggerModule.setup(docPath, app, document, docOptions)
}
