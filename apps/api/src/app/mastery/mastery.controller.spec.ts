import { instance, mock } from 'ts-mockito'
import { MasteryController } from './mastery.controller'
import { MasteryService } from './mastery.service'

describe('MasteryController', () => {
  let controller: MasteryController
  const masteryService = mock(MasteryService)

  beforeEach(() => {
    controller = new MasteryController(instance(masteryService))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})