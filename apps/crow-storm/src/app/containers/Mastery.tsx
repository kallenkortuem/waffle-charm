import Typography from '@material-ui/core/Typography'
import { Skeleton } from '@material-ui/lab'
import { PageContainer } from '@waffle-charm/material'
import {
  createSelectSummonerByName,
  fetchMastery,
  selectSummonerLoadingStatus,
} from '@waffle-charm/store'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { WelcomeBanner } from '../components/WelcomeBanner'
import MasteryViewer from '../containers/MasteryViewer'
const MasteryTotalProgress = lazy(
  () => import('../containers/MasteryTotalProgress')
)

export const Mastery = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const selectSummonerByName = createSelectSummonerByName()
  const [showTotal, setShowTotal] = useState(true)
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
        {/* <Typography variant="h4" component="h1">
          {summoner?.name}
        </Typography> */}

        {summonerLoading === 'not loaded' || summonerLoading === 'error' ? (
          <WelcomeBanner />
        ) : (
          <>
            <Suspense fallback={<Skeleton variant="rect"></Skeleton>}>
              {showTotal ? (
                <MasteryTotalProgress summonerName={summonerName} />
              ) : null}
            </Suspense>

            <MasteryViewer />
          </>
        )}
      </PageContainer>
    </main>
  )
}

export default Mastery
