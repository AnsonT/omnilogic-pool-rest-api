import { Body, Controller, Get } from '@nestjs/common'
import { PoolAuthInput } from './pool.dto'
import { PoolService } from './pool.service'

@Controller('/v1/pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get()
  async getPoolTelemetry(@Body() poolAuthInput: PoolAuthInput) {
    return await this.poolService.getPoolTelemetry(poolAuthInput)
  }
}
