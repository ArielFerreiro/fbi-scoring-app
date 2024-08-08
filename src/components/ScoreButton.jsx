import { Button } from '@mui/material'

export const ScoreButton = ({ value = 5, onClick }) => {
  return (
    <Button variant="contained" onClick={ () => { onClick(value); } }>
      {value}
    </Button>
  )
}
