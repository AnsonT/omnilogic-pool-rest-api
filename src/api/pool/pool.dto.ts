import { IsNotEmpty, IsString } from 'class-validator'

export class PoolAuthInput {
  @IsString()
  @IsNotEmpty()
  user: string

  @IsString()
  @IsNotEmpty()
  password: string
}