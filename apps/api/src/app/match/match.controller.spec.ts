import { instance, mock } from 'ts-mockito'
import { MatchController } from './match.controller'
import { MatchService } from './match.service'

describe('MatchController', () => {
  let controller: MatchController
  const summonerService = mock(MatchService)

  beforeEach(() => {
    controller = new MatchController(instance(summonerService))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
