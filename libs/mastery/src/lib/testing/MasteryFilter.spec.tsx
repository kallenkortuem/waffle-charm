import { render } from '@testing-library/react'
import React from 'react'
import MasteryFilter from '../MasteryFilter'

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
