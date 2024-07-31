import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import getLoggerConfig from 'src/config/logger.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    LoggerModule.forRoot(getLoggerConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
