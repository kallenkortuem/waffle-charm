import { getGreeting } from '../../support/app.po'

describe('mastery grid group', () => {
  beforeEach(() => {
    cy.visitSummoner()
  })

  it('should display welcome message', () => {
    getGreeting().contains('Champion Mastery')
  })
})
