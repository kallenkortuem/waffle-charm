import { instance, mock } from 'ts-mockito'
import { VersionController } from './version.controller'
import { VersionService } from './version.service'

describe('VersionController', () => {
  let controller: VersionController
  const versionService = mock(VersionService)

  beforeEach(async () => {
    controller = new VersionController(instance(versionService))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
