import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Zoom,
} from '@material-ui/core'
import BanIcon from '@material-ui/icons/Block'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import { MasteryCard } from '@waffle-charm/mastery'
import {
  bansActions,
  createSelectBansById,
  createSelectFavoriteById,
  favoriteActions,
  selectBansFeatureEnabled,
  selectChampionEntities,
  selectChampionVendor,
  selectFavoriteFeatureEnabled,
  selectLevel,
  selectLolVersion,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

export interface MasteryViewerItem {
  championId: string
}
const MasteryGridViewItem = (props: MasteryViewerItem): React.ReactElement => {
  const { championId } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  const lolVersion = useSelector(selectLolVersion)
  const masteryLoadingStatus = useSelector(selectMasteryLoadingStatus)
  const isFavoriteFeatureEnabled = useSelector(selectFavoriteFeatureEnabled)
  const isBansFeatureEnabled = useSelector(selectBansFeatureEnabled)

  const selectBansById = createSelectBansById()
  const isBaned = useSelector((state) => selectBansById(state, champion.key))

  const selectFavoriteById = createSelectFavoriteById()
  const isFavorite = useSelector((state) =>
    selectFavoriteById(state, champion.key)
  )

  const handleBanClick = () => {
    const a = isBaned
      ? bansActions.remove(championId)
      : bansActions.add({ id: championId })

    dispatch(a)
  }

  const handleFavoriteClick = () => {
    const a = isFavorite
      ? favoriteActions.remove(championId)
      : favoriteActions.add({ id: championId })

    dispatch(a)
  }

  const actionCTAs = (
    <>
      {isFavoriteFeatureEnabled && (
        <IconButton
          aria-label={t('championFavoriteCTA')}
          onClick={handleFavoriteClick}
        >
          <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
        </IconButton>
      )}
      {isBansFeatureEnabled && (
        <IconButton aria-label={t('championBanCTA')} onClick={handleBanClick}>
          <BanIcon color={isBaned ? 'error' : 'disabled'} />
        </IconButton>
      )}
    </>
  )

  return (
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
      <MasteryCard
        mastery={mastery}
        loading={
          masteryLoadingStatus === 'loading' ||
          masteryLoadingStatus === 'not loaded'
        }
        version={lolVersion}
        championVendor={championVendor}
        champion={champion}
        actionCTAs={actionCTAs}
        hideFullImg
      />
    </Zoom>
  )
}

const useMasteryGridViewStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      padding: theme.spacing(2),
      gridGap: theme.spacing(2),
      gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
    },
  })
)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MasteryViewProps {}

export const MasteryModuleView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { t } = useTranslation()
  const classes = useMasteryGridViewStyles()
  const level = useSelector(selectLevel)
  const sortedChampionIds = useSelector(selectVisibleChampionIds)

  const items = React.useMemo(() => {
    return sortedChampionIds?.map((championId) => (
      <MasteryGridViewItem key={championId} championId={championId} />
    ))
  }, [sortedChampionIds])

  return (
    <Paper className={classes.root} data-cy={`mastery-grid-group-${level}`}>
      {items}
    </Paper>
  )
}

export default MasteryModuleView
