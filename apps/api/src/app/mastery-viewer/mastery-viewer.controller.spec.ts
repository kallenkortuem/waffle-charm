import { Test, TestingModule } from '@nestjs/testing'
import { MasteryViewerController } from './mastery-viewer.controller'

describe('MasteryViewerController', () => {
  let controller: MasteryViewerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasteryViewerController],
    }).compile()

    controller = module.get<MasteryViewerController>(MasteryViewerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
