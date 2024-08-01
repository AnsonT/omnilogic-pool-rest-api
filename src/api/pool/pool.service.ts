import { Injectable } from '@nestjs/common'
import { OmniLogic } from 'src/services/omniLogic/omniLogic'
import { PoolAuthInput } from './pool.dto'

@Injectable()
export class PoolService {
  async getPoolTelemetry(poolAuthInput: PoolAuthInput) {
    const omniLogic = new OmniLogic(poolAuthInput.user, poolAuthInput.password)

    return await omniLogic.getTelemetryData()
  }
}
