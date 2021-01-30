import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { MasteryViewerDTO } from '@waffle-charm/api-interfaces'
import { Observable, of, throwError } from 'rxjs'
import { MasteryViewerService } from './mastery-viewer.service'
import { catchError } from 'rxjs/operators'

@Controller('mastery-viewer')
export class MasteryViewerController {
  constructor(private masteryViewerService: MasteryViewerService) {}

  @Get('by-name/:summonerName')
  async getByName(
    @Param('summonerName') summonerName: string,
    @Res() res: Response
  ) {
    const data = await this.masteryViewerService
      .getByName(summonerName)
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
