/**
 * @fileoverview Configuración de Prisma ORM
 * @see https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { EnvReaderFromProcess } from './src/core/env'

// Sobrescribir process.env.DB_URL con la versión expandida
const env = new EnvReaderFromProcess()
process.env.DB_URL = env.databaseUrl

const dbPath = path.join(__dirname, 'src/core/database')

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
