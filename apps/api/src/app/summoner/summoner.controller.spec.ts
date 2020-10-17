import { Test, TestingModule } from '@nestjs/testing'
import { instance, mock } from 'ts-mockito'
import { SummonerController } from './summoner.controller'
import { SummonerService } from './summoner.service'

describe('SummonerController', () => {
  let controller: SummonerController
  const summonerService = mock(SummonerService)

  beforeEach(() => {
    controller = new SummonerController(instance(summonerService))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
