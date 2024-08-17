import { Button } from 'antd'

export const ScoreButton = ({ value = 5, onClick, disabled = false }) => {
  return (
    <Button type="primary" shape="circle"  onClick={ () => { onClick(value); } } disabled={disabled}>
      {value}
    </Button>
  )
}
