import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import ChampionRoleFilter from './ChampionRoleFilter'

enablei18nMocks()
describe('ChampionRoleFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionRoleFilter />)
    expect(baseElement).toBeTruthy()
  })
})
