import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { resolve } from 'path'

@Injectable()
export class AppService {
  name?: string
  version?: string

  private getVersion () {
    if (!this.version) {
      const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'))
      this.name = pkg?.name
      this.version = pkg?.version
    }
    return this.version
  }


  getHello() {
    this.getVersion()
    return {
      name: this.name,
      version: this.version ?? 'unknown' }
  }
}
