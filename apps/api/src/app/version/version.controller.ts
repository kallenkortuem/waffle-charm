import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { VersionService } from './version.service'

@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get('')
  async getVersion(@Res() res: Response) {
    const data = await this.versionService
      .getVersion()
      .pipe(
        catchError((err) => {
          if (err.isAxiosError) {
            if (err.response.data.status) {
              res
                .status(err.response.data.status.status_code)
                .send(err.response.data.status.message)
            }
          }

          return of(null)
        })
      )
      .toPromise()

    res.status(HttpStatus.OK).json(data)
  }
}
