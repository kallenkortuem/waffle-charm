import { getMasteryLevelFilter } from '../../support/app.po'

describe('mastery level filter', () => {
  beforeEach(() => cy.visit('/'))

  it('should have 1 selected by default', () => {
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
  })

  it('should still remain selected if it is the only one', () => {
    getMasteryLevelFilter(1).click().blur()
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(1).click().blur()
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
  })
})
