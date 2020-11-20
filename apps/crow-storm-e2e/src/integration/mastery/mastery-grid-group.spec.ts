import {
  getMasteryCards,
  getMasteryGridGroup,
  getMasteryLevelFilter,
} from '../../support/app.po'

describe('mastery grid group', () => {
  beforeEach(() => {
    cy.visitSummoner()
  })

  it('should respect the mastery filter', () => {
    getMasteryCards().should('exist')
    getMasteryGridGroup(2).should('not.exist')
    getMasteryLevelFilter(2).click()
    getMasteryGridGroup(2).should('exist')
    getMasteryLevelFilter(2).click()
    getMasteryGridGroup(2).should('not.exist')
  })
})
