import { join } from 'path'
import { cwd } from 'process'

type Metadata = () => Promise<Record<string, any>>

export async function getMetadata() {
  // Obtener metadata transpilado a JS
  const metadataPath = join(cwd(), 'dist', 'metadata.js')
  try {
    const metadata = await import(metadataPath)
    return metadata.default as Metadata
  } catch {
    throw new Error('Metadata file not found')
  }
}
