import { Test, TestingModule } from '@nestjs/testing'
import { MasteryViewerService } from './mastery-viewer.service'

describe('MasteryViewerService', () => {
  let service: MasteryViewerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasteryViewerService],
    }).compile()

    service = module.get<MasteryViewerService>(MasteryViewerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
