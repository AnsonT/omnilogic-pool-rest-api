import { Test, type TestingModule } from '@nestjs/testing'
import * as fs from 'fs'
import { resolve } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()
  })

  describe('getHello', () => {
    it('should return { name, version }', () => {
      const appController = app.get(AppController)
      const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'))
      expect(appController.getHello()).toStrictEqual({ name: pkg?.name, version: pkg?.version ?? 'unknown' })
    })
  })
})
