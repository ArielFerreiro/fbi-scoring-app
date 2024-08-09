import { Space, Typography } from 'antd'

const { Text } = Typography;


export const RoundCounter = ({ scores }) => {

    let text = '';
    
    switch (scores.length) {
        case 0:
            text = 'Inicie el conteo marcando las 5 primeras puntuaciones.';
            break;
        case 1:
            text = 'Ronda de Prueba';
            break;
        case 2:
            text = 'Ronda 1';
            break;
        case 3:
            text = 'Ronda 2';
            break;
        case 4:
            text = 'Ronda 3';
            break;
        case 5:
            text = 'Ronda 4';
            break;
        case 6:
            text = 'Ronda 5';
            break;
        case 7:
            text = 'Ronda 6';
            break;
        case 8:
            text = 'Ronda 7';
            break;
        case 9:
            text = 'Ronda 8';
            break;
        case 10:
            text = 'Reintento 1';
            break;
        default:
            text = 'Terminado, reinicie el contador.'
            break;
    }


    return (
        <Space style={{ 'marginTop': '8px', 'marginLeft': '8px' }}>
            <Text type="secondary" style={{ margin: 0 }}>
                {  text  }
            </Text>
        </Space>
    )
}

