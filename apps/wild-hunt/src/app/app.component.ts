import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatchlistDto, SummonerDTO } from '@waffle-charm/api-interfaces';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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
    <form [formGroup]="summonerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Summoner Name</mat-label>
        <input #summonerInput matInput />
      </mat-form-field>
      <button mat-button>
        Search
      </button>
    </form>
    <pre>Summoner: {{ summoner$ | async | json }}</pre>
    <pre>Matches: {{ matches$ | async | json }}</pre>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  summoner$ = new ReplaySubject<SummonerDTO>(1);
  matches$ = new ReplaySubject<MatchlistDto>(1);

  summonerName = new FormControl();
  summonerForm = new FormGroup({ summonerName: this.summonerName });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.summoner$
      .pipe(
        takeUntil(this.destroy$),
        tap(({ accountId }) => {
          this.getMatches(accountId);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.summonerForm.valid) {
      this.getSummoner(this.summonerName.value);
    }
  }

  getSummoner(name: string): void {
    this.http
      .get<SummonerDTO>(`/api/summoner/${name}`)
      .subscribe((value) => this.summoner$.next(value));
  }

  getMatches(accountId: string): void {
    this.http
      .get<MatchlistDto>(`/api/match/${accountId}`)
      .subscribe((value) => this.matches$.next(value));
  }
}
