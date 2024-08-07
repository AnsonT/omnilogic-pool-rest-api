import { Module } from '@nestjs/common'
import { OpenTelemetryModule } from 'nestjs-otel'
import { LoggerModule } from 'nestjs-pino'
import { PoolModule } from 'src/api/pool/pool.module'
import getLoggerConfig from 'src/config/logger.config'
import { name } from '../../package.json'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'label',
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
      prefix: name, // Add a custom prefix to all API metrics
    },
  },
})


@Module({
  imports: [
    OpenTelemetryModuleConfig,
    LoggerModule.forRoot(getLoggerConfig()),
    PoolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
