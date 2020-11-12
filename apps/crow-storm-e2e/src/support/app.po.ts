export const getGreeting = (): Cypress.Chainable<JQuery<HTMLHeadingElement>> =>
  cy.get('h1')
export const getDarkModeToggle = (): Cypress.Chainable<
  JQuery<HTMLButtonElement>
> => cy.get('[data-cy=dark-mode]')
export const getBody = (): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get('body', { timeout: 1000 })
