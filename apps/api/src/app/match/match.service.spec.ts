import { HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { anything, instance, mock, when } from 'ts-mockito'
import { createAxiosResponse } from '../testing/utils'
import { MatchService } from './match.service'

describe('MatchService', () => {
  let service: MatchService
  let testScheduler: TestScheduler
  const configService = mock(ConfigService)
  const httpService = mock(HttpService)

  beforeEach(() => {
    service = new MatchService(instance(configService), instance(httpService))
    testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GET /:id', () => {
    it('should return the correct data', () => {
      const accountId = 'mock-account-id'
      const data = {}
      when(
        httpService.get(
          `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
          anything()
        )
      ).thenReturn(of(createAxiosResponse(data)))

      testScheduler.run(({ expectObservable }) => {
        expectObservable(service.getByAccount(accountId)).toBe('(a|)', {
          a: data,
        })
      })
    })
  })
})
