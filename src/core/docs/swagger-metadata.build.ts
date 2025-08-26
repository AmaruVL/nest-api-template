/**
 * @fileoverview Genera src/metadata.ts para el plugin de Swagger (requerido con SWC).
 */
import * as fs from 'fs'
import { join } from 'path'
import { cwd } from 'process'
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator'
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin'

const sourceFolder = join(cwd(), 'src')
const metadataFilename = 'metadata.ts'
const metadataPath = join(sourceFolder, metadataFilename)

// Borra el metadata previo (si existe)
fs.rmSync(metadataPath, { force: true })

// Genera nuevo metadata.ts
const generator = new PluginMetadataGenerator()
generator.generate({
  visitors: [new ReadonlyVisitor({ introspectComments: false, pathToSource: sourceFolder })],
  outputDir: sourceFolder,
  watch: false,
  filename: metadataFilename,
  tsconfigPath: 'tsconfig.json',
})

// eslint-disable-next-line no-console
console.log(`[swagger] Metadata generated: ${metadataPath}`)
