import { getGreeting } from '../../support/app.po'

describe('mastery grid group', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    getGreeting().contains('Champion Mastery')
  })
})
