import { Body, Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PoolAuthInput, PoolTelemetryOutput } from './pool.dto'
import { PoolService } from './pool.service'

@Controller('/v1/pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('/telemetry')
  @ApiResponse({ status: 200, description: 'The found record', type: PoolTelemetryOutput })
  async getPoolTelemetry(@Body() poolAuthInput: PoolAuthInput): Promise<PoolTelemetryOutput> {
    return await this.poolService.getPoolTelemetry(poolAuthInput)
  }
}
