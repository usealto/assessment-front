describe('L/Teams Members Section', () => {
  beforeEach(() => {
    cy.loginToAuth0(Cypress.env('auth_username-admin'), Cypress.env('auth_password-admin'));
    cy.visit('/', {});
    cy.get('[ng-reflect-router-link="l/teams"]').click();
  });

  it('Filters members by score', () => {
    const score = 50;

    cy.get('[data-cy="filterByScore"]').click();

    cy.get('.ng-dropdown-header > input').clear();

    // Selects first value of the scores dropdown including text "50" which is "< 50 %"

    cy.get('.ng-dropdown-header > input')
      .type(`${score}`)
      .then(() => {
        cy.get('.ng-dropdown-panel > .ng-dropdown-panel-items > div > .ng-option').first().click();
      });

    // Collects first "Score global" value of the members table and transforms it into integer

    cy.get('[data-cy="progressBadge"]')
      .first()
      .then(($element) => {
        const num = parseInt($element.text());

        // Then compares it to 50

        expect(num).to.be.lessThan(score);
      });
  });
});
