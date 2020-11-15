import {
  getLayoutSelector,
  getMasteryGridGroup,
  getMasteryList,
} from '../../support/app.po'

describe('mastery layout', () => {
  beforeEach(() => cy.visit('/'))

  it('should allow toggling between layout views', () => {
    getLayoutSelector('list').should('have.attr', 'aria-pressed', 'false')
    getLayoutSelector('module').should('have.attr', 'aria-pressed', 'true')

    // check that the module view has an item
    getMasteryGridGroup(7).should('exist')
    getMasteryList().should('not.exist')

    // change the layout view
    getLayoutSelector('list').click().blur()

    // check that the module view has an item
    getMasteryGridGroup(7).should('not.exist')
    getMasteryList().should('exist')
    getLayoutSelector('list').should('have.attr', 'aria-pressed', 'true')
    getLayoutSelector('module').should('have.attr', 'aria-pressed', 'false')

    // switch back
    getLayoutSelector('module').click().blur()
  })
})
