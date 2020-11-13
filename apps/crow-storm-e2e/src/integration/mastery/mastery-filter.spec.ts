import { getMasteryLevelFilter } from '../../support/app.po'

describe('mastery level filter', () => {
  beforeEach(() => cy.visit('/'))

  it('should have all selected by default', () => {
    getMasteryLevelFilter(7).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(6).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(5).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(4).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(3).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(2).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
  })

  it('should disable the the button if there is only one selected', () => {
    getMasteryLevelFilter(7).click().blur()
    getMasteryLevelFilter(6).click().blur()
    getMasteryLevelFilter(5).click().blur()
    getMasteryLevelFilter(4).click().blur()
    getMasteryLevelFilter(3).click().blur()
    getMasteryLevelFilter(2).click().blur()
    getMasteryLevelFilter(1).should('have.attr', 'aria-pressed', 'true')
    getMasteryLevelFilter(1).should('have.attr', 'disabled')

    // reset
    getMasteryLevelFilter(7).click().blur()
    getMasteryLevelFilter(6).click().blur()
    getMasteryLevelFilter(5).click().blur()
    getMasteryLevelFilter(4).click().blur()
    getMasteryLevelFilter(3).click().blur()
    getMasteryLevelFilter(2).click().blur()
  })
})
