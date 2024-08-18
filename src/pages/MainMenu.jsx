import React from 'react'
import { Tabs } from 'antd';
import { CreateTournament } from '../components';

const items = [
  {
    key: '1',
    label: 'Crear Torneo',
    children: < CreateTournament />,
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
