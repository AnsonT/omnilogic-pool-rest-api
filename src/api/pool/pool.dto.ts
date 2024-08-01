import { ApiProperty } from '@nestjs/swagger'
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
  systemId: string

  @ApiProperty()
  statusVersion: string

  @ApiProperty()
  airTemp: string

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
  systemId: string

  @ApiProperty()
  flow: string

  @ApiProperty()
  waterTemp: string
}

class FilterDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  valvePosition: string

  @ApiProperty()
  filterSpeed: string

  @ApiProperty()
  filterState: string

  @ApiProperty()
  lastSpeed: string
}

class VirtualHeaterDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  currentSetPoint: string

  @ApiProperty()
  enable: string
}

class HeaterDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  heaterState: string

  @ApiProperty()
  enable: string
}

class ChlorinatorDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  operatingMode: string

  @ApiProperty()
  timedPercent: string

  @ApiProperty()
  scMode: string

  @ApiProperty()
  chlrError: string

  @ApiProperty()
  chlrAlert: string

  @ApiProperty()
  avgSaltLevel: string

  @ApiProperty()
  instantSaltLevel: string

  @ApiProperty()
  status: string

  @ApiProperty()
  enable: string
}

class ColorLogicLightDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  lightState: string

  @ApiProperty()
  currentShow: string
}

class CsadDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  ph: string

  @ApiProperty()
  orp: string

  @ApiProperty()
  status: string

  @ApiProperty()
  mode: string
}

class GroupDto {
  @ApiProperty()
  systemId: string

  @ApiProperty()
  groupState: string
}

export class PoolTelemetryOutput {
  @ApiProperty({ type: SiteDto })
  site: SiteDto

  @ApiProperty({ type: BackyardDto })
  Backyard: BackyardDto

  @ApiProperty({ type: BodyOfWaterDto })
  BodyOfWater: BodyOfWaterDto

  @ApiProperty({ type: FilterDto })
  Filter: FilterDto

  @ApiProperty({ type: VirtualHeaterDto })
  VirtualHeater: VirtualHeaterDto

  @ApiProperty({ type: HeaterDto })
  Heater: HeaterDto

  @ApiProperty({ type: ChlorinatorDto })
  Chlorinator: ChlorinatorDto

  @ApiProperty({ type: ColorLogicLightDto })
  ColorLogicLight: ColorLogicLightDto

  @ApiProperty({ type: CsadDto })
  CSAD: CsadDto

  @ApiProperty({ type: [GroupDto] })
  Group: GroupDto[]

  @ApiProperty()
  version: string
}