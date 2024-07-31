import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino'
import { AppModule } from './app/app.module'

import { config as dotEnvConfig } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { install: sourceMapInstall } = require('source-map-support')
  sourceMapInstall()
}
declare const module: any

async function bootstrap(): Promise<void> {
  const logger = new Logger('EntryPoint')

  dotEnvConfig()
  const PORT = process.env.PORT ?? 3000

  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  app.useLogger(app.get(PinoLogger))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Household Pool API')
      .setDescription('APIs for getting Hayward OmniLogic data')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(PORT)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(async () => { await app.close() })
  }
  logger.log(`Server running on http://localhost:${PORT}`)

}
void bootstrap()
