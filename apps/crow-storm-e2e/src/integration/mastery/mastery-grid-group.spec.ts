import {
  getMasteryGridGroup,
  getMasteryLevelFilter,
} from '../../support/app.po'

describe('mastery grid group', () => {
  beforeEach(() => cy.visit('/'))

  it('should respect the mastery filter', () => {
    getMasteryGridGroup(7).should('exist')
    getMasteryLevelFilter(7).click().blur()
    getMasteryGridGroup(7).should('not.exist')
    getMasteryLevelFilter(7).click().blur()
  })
})
