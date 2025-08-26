/**
 * @fileoverview Configuración de rotación de logs.
 */
import { createStream } from 'rotating-file-stream'
import { EnvReaderFromProcess } from '../env/readers/process.reader'

const env = new EnvReaderFromProcess()
const logsPath = env.logsFilesPath
console.log('LogPath', logsPath)

/**
 * Generador de nombres de archivos para logs rotativos.
 * Estructura: yyyymm/yyyymmdd-hhmm-INDEX-file.log.gz
 * Ejemplo: 202506/20250610-1442-1-file.log.gz
 */
const pad = (num: number): string => num.toString().padStart(2, '0')
const filenameGenerator = (time: Date, index: number): string => {
  if (!time) return 'current.log'

  const year = time.getFullYear()
  const month = pad(time.getMonth() + 1)
  const day = pad(time.getDate())
  const hour = pad(time.getHours())
  const minute = pad(time.getMinutes())
  const base = `${year}${month}`

  return `${base}/${base}${day}-${hour}${minute}-${index}-file.log.gz`
}

/**
 * Stream de rotación para logs.
 * - Tamaño máximo por archivo: 10MB
 * - Intervalo de rotación: cada 1 dia
 * - Compresión: gzip
 */
export const rotationStream = createStream(filenameGenerator, {
  size: '10M', // Rota al alcanzar 10 MB
  interval: '1d', // Rota cada dia
  compress: 'gzip', // Comprime usando gzip
  path: logsPath, // Ruta donde se guardan los logs
})
