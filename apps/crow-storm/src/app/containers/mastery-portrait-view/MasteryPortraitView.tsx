import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { getChampionLoadingSplashImageSrc } from '@waffle-charm/champions'
import {
  fetchChampionDetail,
  masteryViewerActions,
  selectChampionDetailEntities,
  selectChampionEntities,
  selectLolVersion,
  selectMasteryEntities,
  selectSelectedChampionId,
  selectSkinPreferenceEntities,
  selectVisibleChampionIds,
  skinPreferenceActions,
} from '@waffle-charm/store'
import clsx from 'clsx'
import React, { ReactElement, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryPortraitViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    champions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridGap: theme.spacing(2),
    },
    champion: {
      width: '100%',
      height: '100%',
      display: 'flex',
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      transition: 'all .3s ease-in',
    },
    active: {
      transform: 'scale(1.3)',
      zIndex: 4,
      cursor: 'initial',
    },
    details: {},
    championImage: {
      width: `100%`,
      height: `100%`,
      transform: 'scale(1.08)',
      margin: theme.spacing(0, 0, 0, 0),
    },
    floatingActions: {
      justifyContent: 'space-between',
      width: '100%',
    },
    contentOverlay: {
      bottom: '0',
      left: '0',
      position: 'fixed',
      width: '100%',
      color: theme.palette.common.white,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
  })
)

export function MasteryPortraitView(
  props: MasteryPortraitViewProps
): ReactElement {
  const visibleChampionIds = useSelector(selectVisibleChampionIds)
  const classes = useStyles()

  const items = useMemo(() => {
    return visibleChampionIds.map((id) => {
      return <MasteryPortraitViewItem key={id} championId={id} />
    })
  }, [visibleChampionIds])

  return (
    <div className={classes.root}>
      <div className={classes.champions}>{items}</div>
    </div>
  )
}

function MasteryPortraitViewContent(props: {
  championId: string
}): ReactElement {
  const { championId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const championDetail = useSelector(selectChampionDetailEntities)[championId]
  const skinPreference = useSelector(selectSkinPreferenceEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const bull = <span className={classes.bullet}>•</span>

  const handlePrevSkin = () => {
    const skinIndex = championDetail.skins.findIndex(
      (x) => x.num === skinPreference?.skinNum
    )
    const skinNum =
      skinIndex === 0 || skinIndex === -1
        ? championDetail.skins[championDetail.skins.length - 1].num
        : championDetail.skins[skinIndex - 1].num
    dispatch(skinPreferenceActions.upsertOne({ id: championId, skinNum }))
  }

  const handleNextSkin = () => {
    const skinIndex = championDetail.skins.findIndex(
      (x) => x.num === skinPreference?.skinNum
    )
    const skinNum =
      skinIndex === championDetail.skins.length - 1
        ? championDetail.skins[0].num
        : skinIndex === -1
        ? championDetail.skins[1].num
        : championDetail.skins[skinIndex + 1].num

    if (skinNum === 0) {
      dispatch(skinPreferenceActions.remove(championId))
    } else {
      dispatch(skinPreferenceActions.upsertOne({ id: championId, skinNum }))
    }
  }

  return (
    <div className={classes.contentOverlay}>
      <CardContent>
        <Typography variant="body1">{championDetail?.name}</Typography>
        <div>
          <Typography variant="caption">
            {championDetail?.tags?.map((tag, i) => {
              return i === 0 ? (
                tag
              ) : (
                <>
                  {bull}
                  {tag}
                </>
              )
            })}
          </Typography>
        </div>
        <div>
          <Typography variant="caption">
            Mastery {mastery?.championLevel}
            {bull}
            {mastery?.championPoints?.toLocaleString()}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.floatingActions}>
        <Tooltip color="inherit" placement="top" title={'Previous'}>
          <IconButton size="small" onClick={handlePrevSkin}>
            <NavigateBeforeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip placement="top" title={'Next'}>
          <IconButton color="inherit" size="small" onClick={handleNextSkin}>
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </div>
  )
}

function MasteryPortraitViewItem(props: { championId: string }): ReactElement {
  const { championId } = props
  const dispatch = useDispatch()
  const classes = useStyles()
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const active = useSelector(selectSelectedChampionId) === championId
  const championDetail = useSelector(selectChampionDetailEntities)[championId]
  const skinPreference = useSelector(selectSkinPreferenceEntities)[championId]

  const handleClick = () => {
    dispatch(
      masteryViewerActions.setSelectedChampionId(active ? null : championId)
    )
    if (!championDetail) {
      dispatch(fetchChampionDetail({ version, name: champion?.id }))
    }
  }

  return (
    <Card
      elevation={active ? 4 : 0}
      className={clsx(classes.champion, { [classes.active]: active })}
    >
      <CardActionArea onClick={handleClick}>
        <img
          className={classes.championImage}
          src={getChampionLoadingSplashImageSrc(
            champion,
            skinPreference?.skinNum ?? 0
          )}
          alt={champion.name}
        />
      </CardActionArea>
      {active && <MasteryPortraitViewContent championId={championId} />}
    </Card>
  )
}
