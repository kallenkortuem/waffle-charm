import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, Message } from '@waffle-charm/api-interfaces';

@Component({
  selector: 'waffle-charm-root',
  template: `
    <div style="text-align: center;">
      <h1>Welcome to wild-hunt!</h1>
      <img
        width="450"
        src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
      />
    </div>
    <div>Message: {{ hello$ | async | json }}</div>
    <div>Config: {{ config$ | async | json }}</div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  config$ = this.http.get<Config>('/api/config');
  constructor(private http: HttpClient) {}
}
