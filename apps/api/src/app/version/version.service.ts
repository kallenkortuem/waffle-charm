import { HttpService, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class VersionService {
  constructor(private httpsService: HttpService) {}

  getVersion(): Observable<string[]> {
    return this.httpsService
      .get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
      .pipe(map((versionResponse) => versionResponse.data))
  }
}
