import { Test, TestingModule } from '@nestjs/testing'
import { MasteryViewerController } from './mastery-viewer.controller'
import { MasteryViewerModule } from './mastery-viewer.module'

describe('MasteryViewerController', () => {
  let controller: MasteryViewerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MasteryViewerModule],
    }).compile()

    controller = module.get<MasteryViewerController>(MasteryViewerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
