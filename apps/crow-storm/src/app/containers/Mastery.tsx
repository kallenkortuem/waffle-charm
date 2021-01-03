import Typography from '@material-ui/core/Typography'
import { PageContainer } from '@waffle-charm/material'
import {
  createSelectSummonerByName,
  fetchMastery,
  selectSummonerLoadingStatus,
} from '@waffle-charm/store'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { WelcomeBanner } from '../components/WelcomeBanner'
import { MasteryTotalProgress } from '../containers/MasteryTotalProgress'

const MasteryViewer = React.lazy(() => import('../containers/MasteryViewer'))

export const Mastery = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const summonerLoading = useSelector(selectSummonerLoadingStatus)

  useEffect(() => {
    if (summoner) {
      dispatch(fetchMastery(summoner?.id))
    }
  }, [dispatch, summoner])

  return (
    <main>
      <PageContainer maxWidth="md">
        <Typography variant="h4" component="h1">
          {t('championMastery')}
        </Typography>

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
