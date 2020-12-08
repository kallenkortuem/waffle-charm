import {
  getChampionRoleFilter,
  getGreeting,
  getLayoutSelector,
  getMasteryCards,
  getMasteryGridGroup,
  getMasteryLevelFilter,
  getMasteryList,
  getSummonerName,
} from '../../support/app.po'

const summonerName = 'Brian Muller'

describe('mastery grid group', () => {
  beforeEach(() => {
    cy.visit(`/?summonerName=${summonerName}`)

    // wait for the cards to show to know that the page is loaded
    getMasteryCards().should('exist')
  })

  it('should display welcome message', () => {
    getGreeting().contains('Champion Mastery')
  })

  describe('summoner info', () => {
    it('should show the summoner name', () => {
      getSummonerName().should('have.text', summonerName)
      getSummonerName().should(
        'have.attr',
        'href',
        `https://porofessor.gg/live/na/${summonerName?.toLocaleLowerCase()}`
      )
    })

    it('should show the role filter for desktop but not mobile', () => {
      getChampionRoleFilter().should('exist')

      // switch to mobile viewport
      cy.viewport('iphone-6')

      getChampionRoleFilter().should('not.exist')
    })
  })

  describe('mastery level filter', () => {
    it('should have 1 selected by default', () => {
      getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
    })

    it('should respect the filter', () => {
      getMasteryGridGroup(2).should('not.exist')
      getMasteryLevelFilter(2).click()
      getMasteryGridGroup(2).should('exist')
      getMasteryLevelFilter(1).click()
      getMasteryGridGroup(2).should('not.exist')
    })

    it('should require one to be selected', () => {
      getMasteryLevelFilter(1).click()
      getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
      getMasteryLevelFilter(1).click()
      getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
    })
  })

  describe('layout views', () => {
    it('should allow toggling between layout views', () => {
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
    })

    it('should switch to grid view and hide layout selector on mobile', () => {
      // first switch to list view and make sure it exists
      getLayoutSelector('list').click()
      getMasteryList().should('exist')

      // change the viewport to mobile
      cy.viewport('iphone-6')

      // check to see that list view and layout buttons are hidden
      getLayoutSelector('list').should('not.exist')
      getMasteryList().should('not.exist')

      // check to see that the mastery cards are shoing
      getMasteryCards().should('exist')
    })
  })
})
