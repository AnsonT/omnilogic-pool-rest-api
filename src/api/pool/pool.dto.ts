import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class PoolAuthInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}

class SiteDto {
  @ApiProperty()
  mspSystemId: number

  @ApiProperty()
  backyardName: string

  @ApiProperty()
  address: string
}

class BackyardDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  statusVersion: string

  @ApiProperty()
  @Type(() => Number)
  airTemp: number

  @ApiProperty()
  status: string

  @ApiProperty()
  state: string

  @ApiProperty()
  configUpdatedTime: string

  @ApiProperty()
  datetime: string
}

class BodyOfWaterDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  @Type(() => Number)
  flow: number

  @ApiProperty()
  @Type(() => Number)
  waterTemp: number
}

class FilterDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  valvePosition: string

  @ApiProperty()
  @Type(() => Number)
  filterSpeed: number

  @ApiProperty()
  filterState: string

  @ApiProperty()
  @Type(() => Number)
  lastSpeed: number
}

class VirtualHeaterDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  @Type(() => Number)
  @Expose({ name: 'Current-Set-Point' })
  currentSetPoint: number

  @ApiProperty()
  enable: string
}

class HeaterDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  heaterState: string

  @ApiProperty()
  enable: string
}

class ChlorinatorDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  operatingMode: string

  @ApiProperty()
  @Type(() => Number)
  @Expose({ name: 'Timed-Percent' })
  timedPercent: number

  @ApiProperty()
  scMode: string

  @ApiProperty()
  chlrError: string

  @ApiProperty()
  chlrAlert: string

  @ApiProperty()
  @Type(() => Number)
  avgSaltLevel: number

  @ApiProperty()
  @Type(() => Number)
  instantSaltLevel: number

  @ApiProperty()
  status: string

  @ApiProperty()
  enable: string
}

class ColorLogicLightDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  lightState: string

  @ApiProperty()
  currentShow: string
}

class CsadDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  @Type(() => Number)
  ph: number

  @ApiProperty()
  orp: string

  @ApiProperty()
  status: string

  @ApiProperty()
  mode: string
}

class GroupDto {
  @ApiProperty()
  @Type(() => Number)
  systemId: number

  @ApiProperty()
  groupState: string
}

export class PoolTelemetryOutput {
  @ApiProperty({ type: SiteDto })
  @Type(() => SiteDto)
  site: SiteDto

  @ApiProperty({ type: BackyardDto })
  @Type(() => BackyardDto)
  Backyard: BackyardDto

  @ApiProperty({ type: BodyOfWaterDto })
  @Type(() => BodyOfWaterDto)
  BodyOfWater: BodyOfWaterDto

  @ApiProperty({ type: FilterDto })
  @Type(() => FilterDto)
  Filter: FilterDto

  @ApiProperty({ type: VirtualHeaterDto })
  @Type(() => VirtualHeaterDto)
  VirtualHeater: VirtualHeaterDto

  @ApiProperty({ type: HeaterDto })
  @Type(() => HeaterDto)
  Heater: HeaterDto

  @ApiProperty({ type: ChlorinatorDto })
  @Type(() => ChlorinatorDto)
  Chlorinator: ChlorinatorDto

  @ApiProperty({ type: ColorLogicLightDto })
  @Type(() => ColorLogicLightDto)
  @Expose({ name: 'ColorLogic-Light' })
  ColorLogicLight: ColorLogicLightDto

  @ApiProperty({ type: CsadDto })
  @Type(() => CsadDto)
  CSAD: CsadDto

  @ApiProperty({ type: [GroupDto] })
  @Type(() => GroupDto)
  Group: GroupDto[]

  @ApiProperty()
  version: string
}