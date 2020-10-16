import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Config, SummonerDTO } from '@waffle-charm/api-interfaces';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'waffle-charm-root',
  template: `
    <div>
      <h1>Welcome to wild-hunt!</h1>
      <img
        width="450"
        src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
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
  config$ = new ReplaySubject<Config>(1);
  summoner$ = new ReplaySubject<SummonerDTO>(1);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getConfig();
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
