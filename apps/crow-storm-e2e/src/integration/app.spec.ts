import { getDarkModeToggle, getGreeting, getBody } from '../support/app.po'

describe('crow-storm', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Champion Mastery')
  })

  it('should toggle dark-mode theme', () => {
    getBody().should(($body) => {
      expect($body).to.have.css('background-color', 'rgb(48, 48, 48)')
      expect($body).to.have.css('color', 'rgb(255, 255, 255)')
    })

    getDarkModeToggle().click()

    getBody().should(($body) => {
      expect($body).to.have.css('background-color', 'rgb(250, 250, 250)')
      expect($body).to.have.css('color', 'rgba(0, 0, 0, 0.87)')
    })
  })
})
