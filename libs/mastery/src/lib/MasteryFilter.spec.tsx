import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import MasteryFilter from './MasteryFilter'

enablei18nMocks()
describe('MasteryFilter', () => {
  const layout = 'module'
  const masteryLevels = ['1']

  const handleLayoutChange = () => {
    return null
  }
  const handleSetMasteryLevels = () => {
    return null
  }

  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryFilter
        layout={layout}
        masteryLevels={masteryLevels}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelsChange={handleSetMasteryLevels}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
