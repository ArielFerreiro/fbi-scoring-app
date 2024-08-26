import React from 'react'
import { Tabs } from 'antd';
//import { CreateTournament } from '../components';
import { TournamentList } from '../components/';

const items = [
  {
    key: '1',
    label: 'Torneos Activos',
    children: < TournamentList />,
  },
  {
    key: '2',
    label: 'Unirse a Torneo',
    children: 'Content of Tab Pane 2',
  },
];

export const MainMenu = () => {
  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}
