/**
 * @fileoverview Generar archivo metadata.ts para usarlo en el plugin de swagger
 * Esto es necesario cuando se usa el compilador SWC
 */

import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator'
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin'
import * as fs from 'fs'
import { join } from 'path'
import { cwd } from 'process'

const sourceFolder = join(cwd(), 'src')
// Delete current metadata file
const metadataPath = join(sourceFolder, 'metadata.ts')
if (fs.existsSync(metadataPath)) {
  fs.unlink(metadataPath, (err) => {
    if (err) {
      console.error(`Error al eliminar el archivo: ${metadataPath}`, err)
      process.exit(1)
    }
  })
}

// Generar nuevo archivo metadata.ts
const generator = new PluginMetadataGenerator()
generator.generate({
  visitors: [new ReadonlyVisitor({ introspectComments: false, pathToSource: sourceFolder })],
  outputDir: sourceFolder,
  watch: false,
  filename: 'metadata.ts',
  tsconfigPath: 'tsconfig.json',
})
// eslint-disable-next-line no-console
console.log(`Metadata generated in ${metadataPath}`)
