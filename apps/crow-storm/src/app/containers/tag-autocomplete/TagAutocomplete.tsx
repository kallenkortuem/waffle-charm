/* eslint-disable no-use-before-define */
import React, { ReactElement } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { selectAllTag, tagActions, TagEntity } from '@waffle-charm/store'
import { useDispatch, useSelector } from 'react-redux'

const filter = createFilterOptions()

export default function TagAutoComplete(props: {
  championId?: string
}): ReactElement {
  const { championId } = props
  const dispatch = useDispatch()
  const allTag = useSelector(selectAllTag)
  const [value, setValue] = React.useState(null)
  const [open, toggleOpen] = React.useState(false)

  const handleClose = () => {
    setDialogValue({
      name: '',
      championIds: [],
    } as TagEntity)

    toggleOpen(false)
  }

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    championIds: [],
  } as TagEntity)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(
      tagActions.upsertOne({
        name: dialogValue.name,
        championIds: [championId],
      })
    )
    handleClose()
  }

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue({
                name: newValue,
                championIds: [],
              })
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue({
              name: newValue.inputValue,
              championIds: [],
            })
          } else {
            setValue(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            })
          }

          return filtered
        }}
        id="free-solo-dialog-demo"
        options={allTag}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Tag" variant="outlined" />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="tag-form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="tag-form-dialog-title">Add a new tag</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Don't see a tag on our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({ ...dialogValue, name: event.target.value })
              }
              label="tag name"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
