import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(Error)
export class GeneralErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = 422

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    })
  }
}
