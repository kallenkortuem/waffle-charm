import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, Message, SummonerDTO } from '@waffle-charm/api-interfaces';
import { ReplaySubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'waffle-charm-root',
  template: `
    <div style="text-align: center;">
      <h1>Welcome to wild-hunt!</h1>
      <img
        width="450"
        [src]="
          (summonerIcon$ | async) ||
          'https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png'
        "
      />
    </div>
    <mat-form-field>
      <mat-label>Summoner Name</mat-label>
      <input #summonerInput matInput />
    </mat-form-field>
    <button mat-button (click)="getSummoner(summonerInput.value)">
      Search
    </button>
    <pre>Summoner: {{ summoner$ | async | json }}</pre>
    <pre>Config: {{ config$ | async | json }}</pre>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  hello$ = new ReplaySubject<Message>(1);
  config$ = new ReplaySubject<Config>(1);
  summoner$ = new ReplaySubject<SummonerDTO>(1);
  summonerIcon$ = this.summoner$.pipe(
    map((summoner) => summoner?.profileIconId),
    map(
      (id) =>
        `http://ddragon.leagueoflegends.com/cdn/10.21.1/img/profileicon/${id}.png`
    )
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getHello();
    this.getConfig();
  }

  getHello(): void {
    this.http
      .get<Message>('/api/hello')
      .subscribe((value) => this.hello$.next(value));
  }

  getConfig(): void {
    this.http
      .get<Config>('/api/config')
      .subscribe((value) => this.config$.next(value));
  }

  getSummoner(name: string): void {
    this.http
      .get<SummonerDTO>(`/api/summoner/${name}`)
      .subscribe((value) => this.summoner$.next(value));
  }
}
