import { provideRouter, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-content',
  template: '<p>Mock Content</p>',
})
class MockComponent {}

const routes: Routes = [{ path: '', component: MockComponent }];

describe('ContentComponent', () => {
  beforeEach(() => {
    cy.mount(ContentComponent, {
      providers: [provideRouter(routes)],
    });
  });

  it('should render the router-outlet', () => {
    cy.get('router-outlet').should('exist');
  });

  it('should handle router-outlet content (mocked)', async () => {
    cy.get('router-outlet').should('exist');
    cy.contains('Mock Content').should('be.visible');
  });
});
