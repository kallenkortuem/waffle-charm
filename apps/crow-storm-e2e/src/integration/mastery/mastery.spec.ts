import {
  getGreeting,
  getLayoutSelector,
  getMasteryCards,
  getMasteryGridGroup,
  getMasteryLevelFilter,
  getMasteryList,
} from '../../support/app.po'
describe('mastery grid group', () => {
  beforeEach(() => {
    cy.visit('/?summonerName=Brian Muller')
  })

  it('should display welcome message', () => {
    getGreeting().contains('Champion Mastery')
  })

  it('should respect the mastery filter', () => {
    getMasteryCards().should('exist')
    getMasteryGridGroup(2).should('not.exist')
    getMasteryLevelFilter(2).click()
    getMasteryGridGroup(2).should('exist')
    getMasteryLevelFilter(2).click()
    getMasteryGridGroup(2).should('not.exist')
  })

  it('should have 1 selected by default', () => {
    getMasteryCards().should('exist')
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
  })

  it('should still remain selected if it is the only one', () => {
    getMasteryCards().should('exist')
    getMasteryLevelFilter(1).click()
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(1).click()
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
  })

  it('should allow toggling between layout views', () => {
    getMasteryCards().should('exist')
    getLayoutSelector('list').should('have.attr', 'aria-pressed', 'false')
    getLayoutSelector('module').should('have.attr', 'aria-pressed', 'true')

    // check that the module view has an item
    getMasteryGridGroup(1).should('exist')
    getMasteryList().should('not.exist')

    // change the layout view
    getLayoutSelector('list').click()

    // check that the module view has an item
    getMasteryGridGroup(1).should('not.exist')
    getMasteryList().should('exist')
    getLayoutSelector('list').should('have.attr', 'aria-pressed', 'true')
    getLayoutSelector('module').should('have.attr', 'aria-pressed', 'false')

    // switch back
    getLayoutSelector('module').click()
  })
})
