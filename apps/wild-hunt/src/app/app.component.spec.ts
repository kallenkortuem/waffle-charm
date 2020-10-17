import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [    
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
