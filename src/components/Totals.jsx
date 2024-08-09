import { Badge, Flex } from 'antd'

import './Totals.css';

export const Totals = ({ impacts, points, isTrial = false }) => {
    
    return (
      <Flex justify='space-around' align='center'>

        <Badge count='Impactos'  style={{ backgroundColor: '#52c41a', }}>
          <div className='box' style={{'background': isTrial ? '#E0F2F1' : '#EEEEEE'}}> 
            { impacts }
          </div>
        </Badge>

        <Badge count='Puntos'  style={{ backgroundColor: '#52c41a', }}>
          <div className='box' style={{'background': isTrial ? '#E0F2F1' : '#EEEEEE'}}> 
            { points }
          </div>
        </Badge>

      </Flex>
    )
}

