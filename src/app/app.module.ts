import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { PoolModule } from 'src/api/pool/pool.module'
import getLoggerConfig from 'src/config/logger.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    LoggerModule.forRoot(getLoggerConfig()),
    PoolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
