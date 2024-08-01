import { Module } from '@nestjs/common'
import { PoolController } from './pool.controller'
import { PoolService } from './pool.service'

@Module({
  imports: [],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
