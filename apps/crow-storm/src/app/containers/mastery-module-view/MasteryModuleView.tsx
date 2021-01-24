import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core'
import BanIcon from '@material-ui/icons/Block'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import { MasteryCard } from '@waffle-charm/mastery'
import {
  bansActions,
  createSelectBansById,
  createSelectFavoriteById,
  createSelectFilteredChampion,
  favoriteActions,
  selectChampionEntities,
  selectChampionVendor,
  selectLevel,
  selectLolVersion,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
  selectSortedMasteryChampionIds,
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
  const selectFilteredChampion = createSelectFilteredChampion()
  const filteredChampion = useSelector((state) =>
    selectFilteredChampion(state, champion)
  )
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
      <IconButton
        aria-label={t('championFavoriteCTA')}
        onClick={handleFavoriteClick}
      >
        <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
      </IconButton>
      <IconButton aria-label={t('championBanCTA')} onClick={handleBanClick}>
        <BanIcon color={isBaned ? 'error' : 'disabled'} />
      </IconButton>
      {/* <IconButton aria-label="share">
        <ShareIcon />
      </IconButton> */}
    </>
  )

  return (
    <Grid
      item
      lg={4}
      md={4}
      sm={6}
      xs={12}
      style={{
        display: filteredChampion ? 'block' : 'none',
      }}
    >
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
    </Grid>
  )
}

const useMasteryGridViewStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingTop: theme.spacing(1),
      flexGrow: 1,
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
    <div className={classes.root} data-cy={`mastery-grid-group-${level}`}>
      <Grid container direction="row" spacing={2}>
        {items}
      </Grid>
    </div>
  )
}

export default MasteryModuleView
