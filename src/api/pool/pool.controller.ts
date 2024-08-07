import { Body, Controller, Get, Headers } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PoolAuthInput, PoolTelemetryOutput } from './pool.dto'
import { PoolService } from './pool.service'

@Controller()
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('/v1/pool/telemetry')
  @ApiResponse({ status: 200, description: 'The found record', type: PoolTelemetryOutput })
  async getPoolTelemetryV1(@Body() input: PoolAuthInput): Promise<PoolTelemetryOutput> {
    return await this.poolService.getPoolTelemetry(input)
  }

  @Get('/v2/pool/telemetry')
  @ApiResponse({ status: 200, description: 'The found record', type: PoolTelemetryOutput })
  async getPoolTelemetryV2(@Headers() headers): Promise<PoolTelemetryOutput> {
    return await this.poolService.getPoolTelemetry({
      user: headers['x-omnilogic-user'],
      password: headers['x-omnilogic-password'],
    })
  }
}
