import { HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { anything, instance, mock, when } from 'ts-mockito'
import { createAxiosResponse } from '../testing/utils'
import { MasteryService } from './mastery.service'

describe('MasteryService', () => {
  let service: MasteryService
  let testScheduler: TestScheduler
  const configService = mock(ConfigService)
  const httpService = mock(HttpService)

  beforeEach(() => {
    service = new MasteryService(instance(configService), instance(httpService))
    testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GET /:id', () => {
    it('should return the correct data', () => {
      const encryptedSummonerId = 'mock-summoner-id'
      const data = {}
      when(
        httpService.get(
          `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`,
          anything()
        )
      ).thenReturn(of(createAxiosResponse(data)))

      testScheduler.run(({ expectObservable }) => {
        expectObservable(service.getMasteriesBySummoner(encryptedSummonerId)).toBe('(a|)', {
          a: data,
        })
      })
    })
  })
})
