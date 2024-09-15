import NotFoundCardComponent from './not-found-card.component';

describe('NotFoundCardComponent', () => {
  const content = 'Content not found...';
  beforeEach(() => {
    cy.mount(`<app-not-found-card>${content}</app-not-found-card>`, {
      imports: [NotFoundCardComponent],
    });
  });

  it('should render the mat-card component', () => {
    cy.get('mat-card').should('exist');
  });

  it('should render the content inside mat-card', () => {
    cy.get('mat-card')
      .find('mat-card-content')
      .should('exist')
      .and('contain', content);
  });
});
