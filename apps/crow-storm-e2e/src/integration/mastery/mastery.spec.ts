import {
  getGreeting,
  getLayoutSelector,
  getMasteryCards,
  getMasteryGridGroup,
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
    getGreeting().contains('Brian Muller')
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
  })

  describe('layout views', () => {
    it('should allow toggling between layout views', () => {
      getLayoutSelector('list').should('have.attr', 'aria-pressed', 'false')
      getLayoutSelector('module').should('have.attr', 'aria-pressed', 'true')

      // check that the module view has an item
      getMasteryGridGroup(null).should('exist')
      getMasteryList().should('not.exist')

      // change the layout view
      getLayoutSelector('list').click()

      // check that the module view has an item
      getMasteryGridGroup(1).should('not.exist')
      getMasteryList().should('exist')
      getLayoutSelector('list').should('have.attr', 'aria-pressed', 'true')
      getLayoutSelector('module').should('have.attr', 'aria-pressed', 'false')
    })
  })
})
