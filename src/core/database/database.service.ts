/* eslint-disable no-console */
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma'
import { formatPostgresQuery } from './helpers/format-query.helper'
import { COLORS } from '../global/global.constants'

const showDbQueries = process.env.SHOW_DB_QUERIES === 'true'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
  constructor() {
    super({
      log: showDbQueries ? [{ emit: 'event', level: 'query' }] : [],
    })

    if (showDbQueries) {
      this.$on('query', (e) => {
        // Para postgres
        const sql = formatPostgresQuery(e.query, e.params)

        // Para MySQL (si se usa)
        // const sql = formatMySqlQuery(e.query, e.params)

        console.log(`\n${COLORS.BRIGHT_WHITE}NEW QUERY${COLORS.RESET}`)
        console.log('> timestamp:', e.timestamp.toLocaleString())
        console.log('> duration:', `${e.duration}ms`)
        console.log(`> query:\n${COLORS.PALE_ORANGE}${sql}${COLORS.RESET}\n`)
      })
    }
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onApplicationShutdown() {
    await this.$disconnect()
  }
}
