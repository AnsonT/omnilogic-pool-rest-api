import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3'
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import * as process from 'process'

const METRICS_PORT: number = process.env.METRICS_PORT ? parseInt(process.env.METRICS_PORT) : 8081

const otelSDK = new NodeSDK({
  metricReader: new PrometheusExporter({
    port: METRICS_PORT,
  }),
  spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
  // instrumentations: [getNodeAutoInstrumentations()],
  instrumentations: [new PinoInstrumentation()],
})

export default otelSDK

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => { console.log('SDK shut down successfully') },
      err => { console.log('Error shutting down SDK', err) }
    )
    .finally(() => process.exit(0))
})