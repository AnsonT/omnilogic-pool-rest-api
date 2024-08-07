/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios'
import { camelCase } from 'change-case'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '@@',
  format: true
}

const rawOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
  format: true
}

const xmlBuilder = new XMLBuilder(options)
const xmlParser = new XMLParser(options)
const rawXmlParser = new XMLParser(rawOptions)

export interface LoginResponse {
  userId?: string
  token?: string
}

export interface Site {
  mspSystemId: number
  backyardName: string
  address: string
}

export interface SiteList {
  list: Array<Site & { status: number }>
}

export class OmniLogic {
  private token: string
  private userId: string
  private systems = new Map<number, Site>()
  private firstMspSystemId: number

  constructor(private readonly userName: string,
    private readonly password: string,
    private readonly url = 'https://www.haywardomnilogic.com/HAAPI/HomeAutomation/API.ashx') {
  }

  async connect(): Promise<boolean> {
    if (!this.token) {
      await this.login()
    }
    return !!this.token
  }

  async login(): Promise<LoginResponse | null> {
    const response = await this.callApi<LoginResponse>('Login', { UserName: this.userName, Password: this.password })
    // console.dir(response, { depth: null })
    if (response.status === 0 && response.token && response.userId) {
      this.token = response.token
      this.userId = response.userId
      return { userId: this.userId, token: this.token }
    }
    return null
  }

  async getSiteList(): Promise<SiteList | null> {
    if (await this.connect()) {
      const response = await this.callApi<SiteList>('GetSiteList', { UserID: this.userId })
      if (response.status === 0) {
        if (!this.firstMspSystemId && response.list?.length > 0) {
          this.firstMspSystemId = response.list[0].mspSystemId
        }
        this.systems = response.list.reduce(
          (cur, { status, ...site }) => ({ ...cur, [site.mspSystemId]: site }),
          new Map<number,Site>())
      }
      return response
    }
    return null
  }

  async getMspConfig(mspSystemId = 0, version = 0): Promise<any> {
    if (await this.connect()) {
      mspSystemId = mspSystemId || this.firstMspSystemId
      if (!mspSystemId) {
        await this.getSiteList()
      }
      mspSystemId = mspSystemId || this.firstMspSystemId
      const response = await this.callApi('GetMspConfigFile', { MspSystemID: mspSystemId, Version: version })
      return response
    }
  }

  async getTelemetryData(mspSystemId = 0): Promise<any> {
    if (await this.connect()) {
      mspSystemId = mspSystemId || this.firstMspSystemId
      if (!mspSystemId) {
        await this.getSiteList()
      }
      mspSystemId = mspSystemId || this.firstMspSystemId
      const { STATUS: response } = await this.callApi('GetTelemetryData', { MspSystemID: mspSystemId })
      // console.dir(response, { depth: null })
      return {
        site: this.systems[mspSystemId],
        ...response,
      }
    }
  }

  async callApi<T = any>(command: string, params: any): Promise<T & { status: number, statusMessage: string }> {
    const headers = {
      'content-type': 'application/xml',
      'cache-control': 'no-cache',
      'token': ''
    }
    if (this.token) {
      headers.token = this.token
    }
    const request = this.formatRequest(command, params)
    const { data } = await axios.post(this.url, request, { headers })
    // console.log(data)
    // console.log('---------------')
    if (command === 'GetMspConfigFile') {
      return xmlParser.parse(data)
    } if (command === 'GetTelemetryData') {
      return rawXmlParser.parse(data)
    }
    const { parameters }  = this.parseResponse(data)
    if (parameters.status !== 0)
      {throw new Error(parameters.statusMessage)}
    return parameters
  }

  parseResponse(response: string): any {
    const { Response: { Name, Parameters: { Parameter } = { Parameter: [] } } } = xmlParser.parse(response)
    const result = {
      name: Name,
      parameters: {}
    }
    // console.dir(Parameter, { depth: null })
    Parameter.forEach((p) => {
      if (p['@@dataType'] === 'object') {
        const list = p?.Item?.Property || []
        const item = {}
        list.forEach(pp => {item[camelCase(pp['@@name'])] = pp['#text']})
        if (p['@@name'] === 'List') {
          if (!result.parameters[camelCase(p['@@name'])]) result.parameters[camelCase(p['@@name'])] = []
          result.parameters[camelCase(p['@@name'])].push(item)
        }
      } else {
        result.parameters[camelCase(p['@@name'])] = p['#text']
      }
    })
    return result
  }

  formatRequest(command: string, request: object): string {

    const req = {
      Request: {
        Name: command,
        Parameters: {
          Parameter: [] as any[]
        }
      }
    }
    for (const [key, value] of Object.entries(request)) {
      const param = {
        '@@name': key,
        '@@dataType': typeof(value),
        '#text': value
      }
      req.Request.Parameters.Parameter.push(param)
    }
    const xmlRequest = xmlBuilder.build(req)
    return xmlRequest
  }
}