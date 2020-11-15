import React from 'react'
import { render } from '@testing-library/react'

import MasteryFilter from '../MasteryFilter'

describe('MasteryFilter', () => {
  const allTags = ["Tank", "Fighter", "Support", "Assasin", "Mage", "Marksman"]
  const tag = "Assasin"
  const layout = "module"
  const masteryLevels = ["1"]
  const handleSetTag= () => { return null }
  const handleLayoutChange= () => { return null }
  const handleSetMasteryLevels = () => { return null }

  it('should render successfully', () => {
    const { baseElement } = render(<MasteryFilter
      allTags={allTags}
      tag={tag}
      layout={layout}
      masteryLevels={masteryLevels}
      onTagChange={handleSetTag}
      onLayoutChange={handleLayoutChange}
      onMasteryLevelsChange={handleSetMasteryLevels}
      />)
    expect(baseElement).toBeTruthy()
  })
})
