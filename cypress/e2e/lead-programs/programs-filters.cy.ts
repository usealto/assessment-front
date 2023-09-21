describe('Lead Programs', () => {
  beforeEach(() => {
    cy.loginToAuth0(Cypress.env('auth_username-admin'), Cypress.env('auth_password-admin'));
    cy.visit('/');
  });

  it('Access Lead Programs Page', function () {
    cy.get('[ng-reflect-router-link="l/programs"]').click();
    cy.get('h1').should('have.text', 'Programmes');
  });

  it('Search Programs and check if title is right', () => {
    cy.get('[ng-reflect-router-link="l/programs"]').click();
    cy.wait(500);

    cy.get('[data-cy="programCard"] > .panel > .title')
      .eq(1)
      .then(($data) => {
        const text = $data.text();
        cy.get('[data-cy="programSearch"]').type(text);
        cy.wait(500);

        cy.get('[data-cy="programCardList"]')
          .children()
          .eq(1)
          .within(() => {
            cy.get(`[data-cy="program${text}"]`);
          });
      });
  });

  it('Filters programs by team', function () {
    let teamShortname = '';
    cy.get('[ng-reflect-router-link="l/programs"]').click();
    cy.wait(500);

    // Select a program card that already has at least one team

    cy.get('[data-cy="programCard"]').contains('Équipes:').first().click().wait(500);

    // Select first team badge and collect shortname

    cy.get('[data-cy="teamBadge"]')
      .first()
      .then(($data) => {
        teamShortname = $data.text();

        // Goes back to programs page

        cy.get('.cancel-btn').click();
        cy.wait(500);

        // Click the team search dropdown's input and type the collected shortname

        cy.get(
          '[data-cy="programTeamFilter"] > .ng-select-multiple > .ng-select-container > .ng-arrow-wrapper',
        ).click();
        cy.get('.ng-dropdown-header > input').type(`${teamShortname}{enter}`);

        // Check the programs card list and get the first element

        cy.get('[data-cy="programCardList"]')
          .children()
          .eq(1)
          .within(() => {
            cy.get(`[data-cy="programCard"]`).first().click();
          });

        // Check the program teams badges list and check the list contains the collected shortname

        cy.get('[data-cy="teamBadge"]').contains(`${teamShortname}`);
      });
  });
});