import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import ChampionRoleFilter from './ChampionRoleFilter'

enablei18nMocks()
describe('ChampionRoleFilter', () => {
  const allTags = ['Tank', 'Fighter', 'Support', 'Assasin', 'Mage', 'Marksman']
  const tag = 'Assasin'
  const handleSetTag = () => {
    return null
  }
  it('should render successfully', () => {
    const { baseElement } = render(
      <ChampionRoleFilter
        tag={tag}
        allTags={allTags}
        onTagChange={handleSetTag}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
