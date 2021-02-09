import { IconButton, Menu, MenuItem } from '@material-ui/core'
import CollectionsIcon from '@material-ui/icons/Collections'
import {
  fetchChampionDetail,
  selectChampionDetailEntities,
  selectChampionEntities,
  selectLolVersion,
  selectSkinPreferenceEntities,
  skinPreferenceActions,
} from '@waffle-charm/store'
import React, { ReactElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface SkinPreferenceMenuProps {
  championId: string
}

export function SkinPreferenceMenu(
  props: SkinPreferenceMenuProps
): ReactElement {
  const { championId } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const champion = useSelector(selectChampionEntities)[championId]
  const championDetail = useSelector(selectChampionDetailEntities)[championId]
  const skinPreference = useSelector(selectSkinPreferenceEntities)[championId]
  const version = useSelector(selectLolVersion)

  useEffect(() => {
    if (!championDetail) {
      dispatch(fetchChampionDetail({ version, name: champion?.id }))
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnChange = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const num = parseInt(event.target['value'])
    const skinNum = championDetail.skins.find((x) => x.num === num)?.num
    if (skinNum) {
      dispatch(skinPreferenceActions.upsertOne({ id: championId, skinNum }))
    } else {
      dispatch(skinPreferenceActions.remove(championId))
    }
    setAnchorEl(null)
  }

  const items = championDetail?.skins?.map(({ num, name }) => (
    <MenuItem
      key={num}
      value={num}
      selected={num === skinPreference?.skinNum}
      onClick={handleOnChange}
    >
      {name}
    </MenuItem>
  ))

  return (
    <div>
      <IconButton
        aria-label={t('skinPreferenceSelect')}
        aria-controls="skin-preference-select"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <CollectionsIcon />
      </IconButton>
      <Menu
        id="skin-preference-select"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {items}
      </Menu>
    </div>
  )
}

export default SkinPreferenceMenu
