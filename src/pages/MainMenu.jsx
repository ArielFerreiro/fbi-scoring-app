import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Tabs, FloatButton } from 'antd';
import { MoonOutlined, LogoutOutlined, SunOutlined, AimOutlined } from '@ant-design/icons'; 

import { PageWrapper, TournamentList, JoinTournament } from '../components/';
import { startLogout } from '../store';
import { useTheme } from '../hooks';

const items = [
  {
    key: '1',
    label: 'Torneos Activos',
    children: < TournamentList />,
  },
  {
    key: '2',
    label: 'Unirse a Torneo',
    children: < JoinTournament />,
  }
];

export const MainMenu = () => {

  const dispatch = useDispatch();
  const navigator = useNavigate();
  
  const { onToggleTheme, isDarkTheme } = useTheme();

  const onLogout = () => {
    dispatch(startLogout());
  }

  const onTraining = () => {
    navigator('/training');
  }

  return (
    <PageWrapper>
      <Tabs defaultActiveKey="1" items={items} style={{padding:'8px'}} />
      <FloatButton.Group shape="square" style={{ insetInlineEnd: 18 }}>
      <FloatButton 
            icon={ < AimOutlined />}  
            tooltip='Entrenamiento Libre'
            onClick={onTraining}/>
        <FloatButton 
            icon={ isDarkTheme ? <SunOutlined/> : <MoonOutlined />}  
            tooltip='Cambiar Tema'
            onClick={onToggleTheme}/>
        <FloatButton 
            icon={ < LogoutOutlined />}  
            tooltip='Salir'
            type='primary'
            onClick={onLogout}/>
      </FloatButton.Group>
    </PageWrapper>
  )
}
