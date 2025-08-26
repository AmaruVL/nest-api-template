/**
 * @fileoverview Carga dinámica de la metadata de Swagger desde dist/metadata.js.
 */
import { join } from 'path'
import { cwd } from 'process'

type MetadataFn = () => Promise<Record<string, any>>

export async function getMetadata(): Promise<MetadataFn> {
  const metadataPath = join(cwd(), 'dist', 'metadata.js')
  try {
    const mod = await import(metadataPath)
    return mod.default as MetadataFn
  } catch {
    throw new Error(
      `Swagger metadata not found at ${metadataPath}. ` +
        `Did you run the metadata build script before starting the app?`,
    )
  }
}
