describe('Units Detail Page', () => {
  const data = [
    {
      id: 1,
      name: 'Archer',
      description:
        'Quick and light. Weak at close range; excels at battle from distance',
      expansion: 'Age of Kings',
      age: 'Feudal',
      cost: {
        Wood: 25,
        Gold: 45,
      },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: '0/0',
      accuracy: '80%',
    },
  ];

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/assets/mock-data/units.json',
      },
      data,
    ).as('getUnit');

    cy.visit(`/units/detail/1`);
  });

  it('should display unit details correctly', () => {
    cy.wait('@getUnit');

    cy.get('mat-list-item').should('have.length', 10);
    cy.contains('ID').next().should('contain', data[0].id);
    cy.contains('Name').next().should('contain', data[0].name);
    cy.contains('Description').next().should('contain', data[0].description);
    cy.contains('Wood').next().should('contain', data[0].cost.Wood);
    cy.contains('Gold').next().should('contain', data[0].cost.Gold);
    cy.contains('Reload Time').next().should('contain', data[0].reload_time);
    cy.contains('Hit Points').next().should('contain', data[0].hit_points);
    cy.contains('Attack').next().should('contain', data[0].attack);
    cy.contains('Accuracy').next().should('contain', data[0].accuracy);
  });

  it('should display a not found message when unit does not exist', () => {
    const unitId = 345345345;
    cy.intercept({
      method: 'GET',
      url: '/assets/mock-data/units.json',
    }).as('getUnitNotFound');

    cy.visit(`/units/detail/${unitId}`);

    cy.wait('@getUnitNotFound');
    cy.get('app-not-found-card').should('exist');
    cy.contains(`"${unitId}" not found...`).should('exist');
  });
});
