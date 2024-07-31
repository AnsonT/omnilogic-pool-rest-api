export default function getLoggerConfig () {
  const pinoConfig =
    process.env.NODE_ENV === 'production'
      ? {
          level: 'info',
          redact: ['req.headers', 'req.body', 'req.raw'],
        }
      : {
          level: 'debug',
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              colorizeObjects: true
            },
          },
          autoLogging: {
            ignore: (req) => {
              return (req.url === '/graphql/' && req.body?.operationName === 'IntrospectionQuery') ||
                (req.url === '/metrics')
            }
          },
          serializers: {
            req (req: {
              httpVersion: any
              raw: {
                httpVersion: any
                params: any
                query: any
                body: any
                headers: any
              }
              params: any
              query: any
              body: any
              headers: any
            }) {
              const { vector: _1, signedPayload: _2, ...body } = req.raw.body
              if (body?.imageData) body.imageData = '...'
              // req.httpVersion = req.raw.httpVersion
              req.params = req.raw.params
              req.query = req.raw.query
              req.body = body
              req.headers = {} // req.raw.headers
              return req
            }
          }
        }

  const loggerConfig = {
    pinoHttp: pinoConfig
  }
  return loggerConfig
}
