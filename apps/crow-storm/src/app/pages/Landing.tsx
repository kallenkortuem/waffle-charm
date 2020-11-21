import PageContainer from '@waffle-charm/material/PageContainer'
import React from 'react'
import WelcomeBanner from '../components/WelcomeBanner'

/* eslint-disable-next-line */
export interface LandingProps {}

export const Landing = (props: LandingProps): React.ReactElement => {
  return (
    <PageContainer maxWidth="md">
      <WelcomeBanner />
    </PageContainer>
  )
}

export default Landing
