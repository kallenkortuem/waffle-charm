import { HttpService } from '@nestjs/common'
import { TestScheduler } from 'rxjs/testing'
import { instance, mock } from 'ts-mockito'
import { VersionService } from './version.service'

describe('VersionService', () => {
  let service: VersionService
  let testScheduler: TestScheduler
  const httpService = mock(HttpService)

  beforeEach(() => {
    service = new VersionService(instance(httpService))
    testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
