import { Controller, Get, Headers } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PoolTelemetryOutput } from './pool.dto'
import { PoolService } from './pool.service'

@Controller('/v1/pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('/telemetry')
  @ApiResponse({ status: 200, description: 'The found record', type: PoolTelemetryOutput })
  async getPoolTelemetry(@Headers() headers): Promise<PoolTelemetryOutput> {
    return await this.poolService.getPoolTelemetry({
      user: headers['x-omnilogic-user'],
      password: headers['x-omnilogic-password'],
    })
  }
}
