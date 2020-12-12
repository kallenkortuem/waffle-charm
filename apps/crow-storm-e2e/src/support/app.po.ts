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
  cy.get(`[data-cy=layout-selector-${mode}]`, { timeout: 5000 })

export const getMasteryGridGroup = (
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7
): Cypress.Chainable<JQuery<HTMLButtonElement>> =>
  cy.get(`[data-cy=mastery-grid-group-${level}]`, { timeout: 5000 })

export const getMasteryLevelFilter = (
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'all'
): Cypress.Chainable<JQuery<HTMLButtonElement>> =>
  cy.get(`[data-cy=mastery-level-filter-${level}]`, { timeout: 5000 })

export const getMasteryList = (): Cypress.Chainable<JQuery<HTMLTableElement>> =>
  cy.get('[data-cy=mastery-list]', { timeout: 5000 })

export const getMasteryCards = (): Cypress.Chainable<JQuery<Node>> =>
  cy.get('[data-cy=mastery-card]', { timeout: 5000 })

export const getChampionRoleFilter = (): Cypress.Chainable<
  JQuery<HTMLElement>
> => cy.get('[data-cy=champion-role-filter]', { timeout: 5000 })

export const getSummonerName = (): Cypress.Chainable<
  JQuery<HTMLAnchorElement>
> => cy.get('[data-cy=summoner-name]', { timeout: 5000 })
