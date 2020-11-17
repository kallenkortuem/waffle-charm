import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import BorderLinearProgress from '@waffle-charm/material/BorderLinearProgress'
import React from 'react'

/* eslint-disable-next-line */
export interface MasteryLinearProgressProps {
  current: number
  total: number
  label: string
  progress?: number
}

export const MasteryLinearProgress = (props: MasteryLinearProgressProps) => {
  const { current, total, label, progress } = props
  return (
    <div style={{ textAlign: 'right' }}>
      <Typography variant="caption" component="div" color="textSecondary">
        {current.toLocaleString() + ' / ' + total.toLocaleString()}
      </Typography>
      <Tooltip title={label}>
        <BorderLinearProgress
          value={progress}
          variant="determinate"
        ></BorderLinearProgress>
      </Tooltip>
    </div>
  )
}

export default MasteryLinearProgress
