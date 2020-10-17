import { HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { anything, instance, mock, when } from 'ts-mockito'
import { createAxiosResponse } from '../testing/utils'
import { SummonerService } from './summoner.service'

describe('SummonerService', () => {
  let service: SummonerService
  let testScheduler: TestScheduler
  const configService = mock(ConfigService)
  const httpService = mock(HttpService)

  beforeEach(() => {
    service = new SummonerService(
      instance(configService),
      instance(httpService)
    )
    testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GET /:id', () => {
    it('should return the correct data', () => {
      const summonerName = 'fiddlesucx'
      const data = {}
      when(
        httpService.get(
          `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
          anything()
        )
      ).thenReturn(of(createAxiosResponse(data)))

      testScheduler.run(({ expectObservable }) => {
        expectObservable(service.getByName(summonerName)).toBe('(a|)', {
          a: data,
        })
      })
    })
  })
})
