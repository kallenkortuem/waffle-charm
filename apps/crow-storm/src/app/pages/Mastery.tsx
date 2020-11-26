import Typography from '@material-ui/core/Typography'
import { PageContainer } from '@waffle-charm/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMastery } from '../+store/features/mastery.slice'
import {
  createSelectSummonerByName,
  selectSummonerLoadingStatus,
} from '../+store/features/summoner.slice'
import { MasteryTotalProgress } from '../components/MasteryTotalProgress'
const WelcomeBanner = React.lazy(() => import('../components/WelcomeBanner'))
const MasteryViewer = React.lazy(() => import('../components/MasteryViewer'))

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

  const [tag, setTag] = useState('')

  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setTag(value)
  }

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
            <MasteryTotalProgress
              summonerName={summonerName}
              onTagChange={handleSetTag}
              tag={tag}
            />

            <MasteryViewer tag={tag} />
          </>
        )}
      </PageContainer>
    </main>
  )
}

export default Mastery
