import { createStyles, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { useStyles } from './clash-team-styles'

interface RankedPlayerStatsChampionsProps {
  championName: string
  championImgSrc: string
  winRate: number
  totalGames: number
  kda: number
}

interface PlayerStatsRankedProps {
  summonerName: string
  rankImage: string
  rankLabel: string
  champions: RankedPlayerStatsChampionsProps[]
}

interface MasteryPlayerStatsChampionsProps {
  championName: string
  championImgSrc: string
  masteryPointsLabel: string
  masteryLevelLabel: string
}

interface PlayerStatsMasteryProps {
  summonerName: string
  masteryPoints: number
  totalMasteryLabel: string
  champions: MasteryPlayerStatsChampionsProps[]
}

interface HistoryPlayerStatsMatchesProps {
  championName: string
  championImgSrc: string
  matchWon: boolean
  roleIconSrc: string
  roleLabel: string
  goldShare: number
}

interface PlayerStatsHistoryProps {
  matchDefeatLabel: string
  matchLoses: number
  matchTotalLabel: string
  matchVictoryLabel: string
  matchWins: number
  summonerName: string
  teamGoldShareLabel: string
  matches: HistoryPlayerStatsMatchesProps[]
}

export const memoizedRankedPlayers: Record<
  string,
  Partial<PlayerStatsRankedProps>
> = {
  ['Iron Tigger99']: {
    summonerName: 'Iron Tigger99',
    rankImage: '/cdn/images/rank',
    rankLabel: 'Silver II',
    champions: [
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Swain.png',
        championName: 'Swain',
        kda: 1.8,
        totalGames: 5,
        winRate: 0.6,
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Camile.png',
        championName: 'Camile',
        kda: 3.7,
        totalGames: 5,
        winRate: 0.25,
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Pantheon.png',
        championName: 'Pantheon',
        kda: 7.5,
        totalGames: 3,
        winRate: 1,
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Nautilus.png',
        championName: 'Nautilus',
        kda: 3.4,
        totalGames: 3,
        winRate: 0.67,
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Pyke.png',
        championName: 'Pyke',
        kda: 2.7,
        totalGames: 3,
        winRate: 0.67,
      },
    ],
  },
}

export const PlayerStatsRankedResolver = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const data = {
    summonerName,
    rankImage: memoizedRankedPlayers[summonerName].rankImage,
    rankLabel: memoizedRankedPlayers[summonerName].rankLabel,
    champions: memoizedRankedPlayers[summonerName].champions,
  } as PlayerStatsRankedProps
  return <PlayerStatsRanked {...data} />
}

export const PlayerStatsRanked = (
  props: PlayerStatsRankedProps
): React.ReactElement => {
  const classes = useStyles()
  const { summonerName, rankImage, rankLabel, champions } = props

  return (
    <div className={classes.summoner}>
      <h3 className={classes.summonerName}>{summonerName}</h3>
      <img className={classes.rankImage} src={rankImage} alt="" />
      <h4 className={classes.rankLabel}>{rankLabel}</h4>
      <div className={classes.horizontalDivider}></div>
      <div className={classes.champions}>
        {champions.map(
          ({ championName, championImgSrc, winRate, totalGames, kda }, i) => (
            <div className={classes.champion} key={i}>
              <img
                className={classes.championImage}
                src={championImgSrc}
                alt={championName}
              />
              <div className={classes.championStats}>
                <span className={classes.winRate}>{winRate}</span> ({totalGames}
                )
              </div>
              <div className={classes.championStats}>
                <span
                  className={clsx(classes.kda, {
                    [classes.kdaLow]: kda <= 3,
                    [classes.kdaHigh]: kda >= 4.3,
                  })}
                >
                  {kda}
                </span>
                KDA
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export const memoizedMasteryPlayers: Record<
  string,
  Partial<PlayerStatsMasteryProps>
> = {
  ['Iron Tigger99']: {
    masteryPoints: 319,
    champions: [
      {
        championName: 'Yumi',
        championImgSrc: '/cdn/11.4.1/img/champion/Yumi.png',
        masteryPointsLabel: `123.6 k pts`,
        masteryLevelLabel: 'Lv 7',
      },
      {
        championName: 'Yumi',
        championImgSrc: '/cdn/11.4.1/img/champion/Yumi.png',
        masteryPointsLabel: '72.4 k pts',
        masteryLevelLabel: 'Lv 7',
      },
      {
        championName: 'Senna',
        championImgSrc: '/cdn/11.4.1/img/champion/Senna.png',
        masteryPointsLabel: '55.6 k pts',
        masteryLevelLabel: 'Lv 7',
      },
      {
        championName: 'Sett',
        championImgSrc: '/cdn/11.4.1/img/champion/Sett.png',
        masteryPointsLabel: '55 k pts',
        masteryLevelLabel: 'Lv 6',
      },
      {
        championName: 'Annie',
        championImgSrc: '/cdn/11.4.1/img/champion/Annie.png',
        masteryPointsLabel: '48.1 k pts',
        masteryLevelLabel: 'Lv 6',
      },
    ],
  },
}

export const PlayerStatsMasteryResolver = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const data = {
    summonerName,
    totalMasteryLabel: `TOTAL MASTERY`,
    champions: memoizedMasteryPlayers[summonerName].champions,
    masteryPoints: memoizedMasteryPlayers[summonerName].masteryPoints,
  } as PlayerStatsMasteryProps
  return <PlayerStatsMastery {...data} />
}

export const PlayerStatsMastery = (
  props: PlayerStatsMasteryProps
): React.ReactElement => {
  const classes = useStyles()
  const { summonerName, masteryPoints, totalMasteryLabel, champions } = props

  return (
    <div className={classes.summoner}>
      <h3 className={classes.summonerName}>{summonerName}</h3>
      <p className={classes.totalMasteryPoints}>{masteryPoints}</p>
      <p className={classes.totalMasteryLabel}>{totalMasteryLabel}</p>
      <div className={classes.horizontalDivider}></div>
      <div className={classes.champions}>
        {champions.map(
          (
            {
              championName,
              championImgSrc,
              masteryPointsLabel,
              masteryLevelLabel,
            },
            i
          ) => (
            <div className={classes.champion} key={i}>
              <img
                className={classes.championImage}
                src={championImgSrc}
                alt={championName}
              />
              <div
                className={clsx(classes.championStats, classes.masteryPoints)}
              >
                {masteryPointsLabel}
              </div>
              <div className={classes.championStats}>
                <img
                  className={classes.masteryLevelIcon}
                  src="/icons/mastery-level"
                  alt=""
                />
                {masteryLevelLabel}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export const memoizedHistoryPlayers: Record<
  string,
  Partial<PlayerStatsHistoryProps>
> = {
  ['Iron Tigger99']: {
    matchWins: 6,
    matchLoses: 10,
    matchTotalLabel: `${6 + 10} TOTAL MATCHES`,
    matches: [
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Pantheon.png',
        championName: 'Pantheon',
        goldShare: 15,
        matchWon: true,
        roleIconSrc: '/cdn/11.4.1/support',
        roleLabel: 'Support',
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Nautilus.png',
        championName: 'Nautilus',
        goldShare: 13,
        matchWon: true,
        roleIconSrc: '/cdn/11.4.1/support',
        roleLabel: 'Support',
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Nautilus.png',
        championName: 'Nautilus',
        goldShare: 12,
        matchWon: false,
        roleIconSrc: '/cdn/11.4.1/support',
        roleLabel: 'Support',
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Garen.png',
        championName: 'Garen',
        goldShare: 22,
        matchWon: true,
        roleIconSrc: '/cdn/11.4.1/top',
        roleLabel: 'Top',
      },
      {
        championImgSrc: '/cdn/11.4.1/img/champion/Mordekaiser.png',
        championName: 'Mordekaiser',
        goldShare: 19,
        matchWon: false,
        roleIconSrc: '/cdn/11.4.1/support',
        roleLabel: 'Support',
      },
    ],
  },
}

export const PlayerStatsHistoryResolver = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const data = {
    summonerName,
    matchDefeatLabel: 'Defeat',
    matchVictoryLabel: 'Victory',
    matchWins: memoizedHistoryPlayers[summonerName].matchWins,
    matchLoses: memoizedHistoryPlayers[summonerName].matchLoses,
    matchTotalLabel: memoizedHistoryPlayers[summonerName].matchTotalLabel,
    matches: memoizedHistoryPlayers[summonerName].matches,
  } as PlayerStatsHistoryProps
  return <PlayerStatsHistory {...data} />
}

export const PlayerStatsHistory = (
  props: PlayerStatsHistoryProps
): React.ReactElement => {
  const classes = useStyles()
  const {
    summonerName,
    matchWins,
    matchLoses,
    matches,
    matchTotalLabel,
    matchVictoryLabel,
    matchDefeatLabel,
    teamGoldShareLabel,
  } = props

  return (
    <div className={classes.summoner}>
      <h3 className={classes.summonerName}>{summonerName}</h3>
      <div className={classes.matchWinLoss}>
        <span className={classes.matchWins}>{matchWins}</span>
        <div className={classes.verticalDivider}></div>
        <span className={classes.matchLoses}>{matchLoses}</span>
      </div>
      <p className={classes.matchTotal}>{matchTotalLabel}</p>
      <div className={classes.horizontalDivider}></div>
      <div className={classes.matches}>
        {matches.map(
          (
            {
              championName,
              championImgSrc,
              matchWon,
              roleIconSrc,
              roleLabel,
              goldShare,
            },
            i
          ) => (
            <div className={classes.match}>
              <img
                className={classes.championImage}
                src={championImgSrc}
                alt={championName}
              />
              <p
                className={clsx(classes.matchResult, {
                  [classes.matchVictory]: matchWon,
                })}
              >
                {matchWon ? matchVictoryLabel : matchDefeatLabel}
              </p>
              <div className={classes.matchRole}>
                <img className={classes.roleIcon} src={roleIconSrc} alt="" />
                {roleLabel}
              </div>
              <div className={classes.matchGoldShare}>
                <img
                  className={classes.goldShareIcon}
                  src="/icons/gold.png"
                  alt={teamGoldShareLabel}
                />
                {goldShare}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

interface ClashTeamProps {
  teamImageSrc: string
  teamAbbreviatedName: string
  rankedTabLabel: string
  teamName: string
  clashTierLabel: string
  masteryTabLabel: string
  historyTabLabel: string
  players: string[]
}

export const ClashTeam = (): React.ReactElement => {
  const classes = useStyles()
  const {
    teamImageSrc,
    teamAbbreviatedName,
    rankedTabLabel,
    teamName,
    clashTierLabel,
    masteryTabLabel,
    historyTabLabel,
    players,
  } = {
    teamImageSrc: '/images/BINGUS.png',
    teamAbbreviatedName: 'BIN',
    rankedTabLabel: 'Ranked',
    teamName: 'Bingus',
    clashTierLabel: 'TIER III',
    masteryTabLabel: 'Mastery',
    historyTabLabel: 'History',
    players: [
      'Iron Tigger99',
      'Iron Tigger99',
      'Iron Tigger99',
      'Iron Tigger99',
      'Iron Tigger99',
    ],
  } as ClashTeamProps

  return (
    <div className={classes.root}>
      <div className={classes.clashTeam}>
        <img className={classes.teamImage} src={teamImageSrc} alt="" />
        <h1 className={classes.teamAbbreviatedName}>{teamAbbreviatedName}</h1>
        <div className={classes.verticalDivider}></div>
        <p className={classes.teamName}>{teamName}</p>
        <p className={classes.clashTier}>{clashTierLabel}</p>
      </div>
      <div className={classes.tabs}>
        <div
          className={clsx(classes.summoners, classes.tab, classes.tabRanked, {
            [classes.active]: true,
          })}
          aria-label={rankedTabLabel}
        >
          {players &&
            players.map((summonerId, i) => (
              <PlayerStatsRankedResolver key={i} summonerName={summonerId} />
            ))}
        </div>
        <div
          className={clsx(classes.summoners, classes.tab, classes.tabMastery, {
            [classes.active]: true,
          })}
          aria-label={masteryTabLabel}
        >
          {players &&
            players.map((summonerId, i) => (
              <PlayerStatsMasteryResolver key={i} summonerName={summonerId} />
            ))}
        </div>
        <div
          className={clsx(classes.summoners, classes.tab, classes.tabHistory, {
            [classes.active]: true,
          })}
          aria-label={historyTabLabel}
        >
          {players &&
            players.map((summonerId, i) => (
              <PlayerStatsHistoryResolver key={i} summonerName={summonerId} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ClashTeam
