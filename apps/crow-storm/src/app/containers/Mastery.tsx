import { PageContainer } from '@waffle-charm/material'
import { selectSummonerLoadingStatus } from '@waffle-charm/store'
import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { WelcomeBanner } from '../components/WelcomeBanner'
import MasteryViewer from '../containers/MasteryViewer'

const MasteryTotalProgress = lazy(
  () => import('../containers/MasteryTotalProgress')
)

export const Mastery = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const summonerLoading = useSelector(selectSummonerLoadingStatus)

  return (
    <main>
      <PageContainer maxWidth="md">
        {summonerLoading === 'not loaded' || summonerLoading === 'error' ? (
          <WelcomeBanner />
        ) : (
          <>
            <MasteryTotalProgress summonerName={summonerName} />

            <MasteryViewer />
          </>
        )}
      </PageContainer>
    </main>
  )
}

export default Mastery
