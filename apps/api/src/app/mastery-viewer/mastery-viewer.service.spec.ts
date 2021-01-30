import { Test, TestingModule } from '@nestjs/testing'
import { MasteryViewerService } from './mastery-viewer.service'
import { MasteryViewerModule } from './mastery-viewer.module'

describe('MasteryViewerService', () => {
  let service: MasteryViewerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MasteryViewerModule],
    }).compile()

    service = module.get<MasteryViewerService>(MasteryViewerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
