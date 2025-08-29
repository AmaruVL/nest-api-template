import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envValidator } from './env/env.validator'
import { EnvService } from './env/env.service'
import { DatabaseService } from './database/database.service'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: envValidator, expandVariables: true })],
  providers: [
    EnvService,
    DatabaseService,
    // { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // { provide: APP_FILTER, useClass: GlobalExceptionFilter }, // Global exception filter for any error
  ],
  exports: [EnvService, DatabaseService],
})
export class CoreModule {}
