import { ComponentFixture, TestBed } from '@angular/core/testing';
import NotFoundCardComponent from './not-found-card.component';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotFoundCardComponent', () => {
  let component: NotFoundCardComponent;
  let fixture: ComponentFixture<NotFoundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, NotFoundCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content in the ng-content slot', () => {
    const text = 'Content inside ng-content';
    @Component({
      selector: 'app-host',
      template: `
        <app-not-found-card>
          <p>{{ text }}</p>
        </app-not-found-card>
      `,
      standalone: true,
      imports: [NotFoundCardComponent],
    })
    class HostComponent {
      text: string = text;
    }

    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();

    const content = hostFixture.debugElement.query(By.css('p')).nativeElement;
    expect(content.textContent).toContain(text);
  });
});
