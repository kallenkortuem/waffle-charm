import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const roleOptions = ['top', 'jungle', 'mid', 'bottom', 'support']

/* eslint-disable-next-line */
export interface RoleToggleButtonGroupProps {
  value?: string
  onChange: (e: React.MouseEvent<HTMLInputElement>, value: any) => void
}

export function RoleToggleButtonGroup(props: RoleToggleButtonGroupProps) {
  const { value, onChange } = props
  const { t } = useTranslation()

  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={onChange}
      aria-label={t('roleToggleButtonGroup')}
    >
      <ToggleButton
        value="top"
        aria-label={t('roleToggleButtonTop')}
        data-cy={`role-toggle-button-top`}
      >
        {t('roleToggleButtonTop')}
      </ToggleButton>
      <ToggleButton
        value="jungle"
        aria-label={t('roleToggleButtonJungle')}
        data-cy={`role-toggle-button-jungle`}
      >
        {t('roleToggleButtonJungle')}
      </ToggleButton>
      <ToggleButton
        value="mid"
        aria-label={t('roleToggleButtonMid')}
        data-cy={`role-toggle-button-mid`}
      >
        {t('roleToggleButtonMid')}
      </ToggleButton>
      <ToggleButton
        value="adc"
        aria-label={t('roleToggleButtonAdc')}
        data-cy={`role-toggle-button-adc`}
      >
        {t('roleToggleButtonAdc')}
      </ToggleButton>
      <ToggleButton
        value="support"
        aria-label={t('roleToggleButtonSupport')}
        data-cy={`role-toggle-button-support`}
      >
        {t('roleToggleButtonSupport')}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default RoleToggleButtonGroup
