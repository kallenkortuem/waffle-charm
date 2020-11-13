export const getGreeting = (): Cypress.Chainable<JQuery<HTMLHeadingElement>> =>
  cy.get('h1')

export const getDarkModeToggle = (): Cypress.Chainable<
  JQuery<HTMLButtonElement>
> => cy.get('[data-cy=dark-mode]')

export const getBody = (): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get('body', { timeout: 1000 })

export const getLayoutSelector = (
  mode: 'list' | 'module'
): Cypress.Chainable<JQuery<HTMLButtonElement>> =>
  cy.get(`[data-cy=layout-selector-${mode}]`, { timeout: 1000 })

export const getMasteryGridGroup = (
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7
): Cypress.Chainable<JQuery<HTMLButtonElement>> =>
  cy.get(`[data-cy=mastery-grid-group-${level}]`, { timeout: 1000 })

export const getMasteryLevelFilter = (
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7
): Cypress.Chainable<JQuery<HTMLButtonElement>> =>
  cy.get(`[data-cy=mastery-level-filter-${level}]`, { timeout: 1000 })

export const getWorkInProgress = (): Cypress.Chainable<
  JQuery<HTMLParagraphElement>
> => cy.get(`[data-cy=work-in-progress]`, { timeout: 1000 })
