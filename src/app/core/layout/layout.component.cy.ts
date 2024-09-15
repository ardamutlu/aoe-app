import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  beforeEach(() => {
    cy.mount(LayoutComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { params: of({}) } }],
    });
  });

  it('should render the header component', () => {
    cy.get('app-header').should('exist');
  });

  it('should render the content component', () => {
    cy.get('app-content').should('exist');
  });
});
