import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  beforeEach(() => {
    cy.mount(HeaderComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { params: of({}) } }],
    });
  });

  it('should render the company logo', () => {
    cy.get('img').should(
      'have.attr',
      'src',
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500',
    );
  });

  it('should display navigation links for desktop', () => {
    cy.get('#desktop-menu a[routerLink="/home"]')
      .should('exist')
      .and('have.text', 'Home');

    cy.get('#desktop-menu a[routerLink="/units"]')
      .should('exist')
      .and('have.text', 'Units');
  });

  it('should display navigation links for mobile', () => {
    cy.get('#mobile-menu a[routerLink="/home"]')
      .should('exist')
      .and('have.text', 'Home');

    cy.get('#mobile-menu a[routerLink="/units"]')
      .should('exist')
      .and('have.text', 'Units');
  });
});
