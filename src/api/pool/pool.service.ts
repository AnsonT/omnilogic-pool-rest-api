import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { OmniLogic } from 'src/services/omniLogic/omniLogic'
import { PoolAuthInput, PoolTelemetryOutput } from './pool.dto'

@Injectable()
export class PoolService {
  async getPoolTelemetry(poolAuthInput: PoolAuthInput, options = { coerceOutput: true } ): Promise<PoolTelemetryOutput> {
    const omniLogic = new OmniLogic(poolAuthInput.user, poolAuthInput.password)
    const data = await omniLogic.getTelemetryData()
    if (!options.coerceOutput) {return data}
    const result = plainToInstance(PoolTelemetryOutput, data)
    return result
  }
}
