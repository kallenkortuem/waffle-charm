import { Typography } from '@material-ui/core'
import { PageContainer } from '@waffle-charm/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import WelcomeBanner from '../components/WelcomeBanner'

/* eslint-disable-next-line */
export interface LandingProps {}

export const Landing = (props: LandingProps): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        {t('championMastery')}
      </Typography>
      <WelcomeBanner />
    </PageContainer>
  )
}

export default Landing
