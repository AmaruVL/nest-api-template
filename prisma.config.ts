import path from 'node:path'
import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { expandEnvVars } from 'src/core'

// Configuración de la base de datos
const dbPath = path.join(__dirname, 'src/core/database')
const dbUrlRaw = process.env.DB_URL
if (!dbUrlRaw) throw new Error('Environment variable DB_URL is not set')

// Sobreescribiendo cadena de conexión con las variables de entorno expandidas
process.env.DB_URL = expandEnvVars(dbUrlRaw)

/**
 * Exportar la configuración de Prisma
 * @see https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-environment-variables
 */
export default defineConfig({
  schema: path.join(dbPath, 'database.schema.prisma'),
  migrations: {
    path: path.join(dbPath, 'migrations'),
    seed: `tsx ${path.join(dbPath, 'seed.ts')}`,
  },
  // typedSql: {
  //   path: path.join(dbPath, 'queries'),
  // },
})
