/**
 * @fileoverview Configuración de Prisma ORM
 * @see https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-environment-variables
 */
import path from 'node:path'
import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { EnvReaderFromProcess } from './src/core'

const env = new EnvReaderFromProcess()

const dbPath = path.join(__dirname, 'src/core/database')

// Sobrescribir process.env.DB_URL con la versión expandida
process.env.DB_URL = env.databaseUrl

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
