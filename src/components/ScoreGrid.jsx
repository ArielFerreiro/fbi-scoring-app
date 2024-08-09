
import { useScore } from '../hooks/useScore';
import { useEffect, useState } from 'react';
import { calculatePoints } from '../helpers';

import { Table, Flex } from "antd";

const columns = [
    {
      title: 'Ronda',
      dataIndex: 'round',
      key: 'round',
    },
    {
      title: '1D',
      dataIndex: '1D',
      key: '1D',
    },
    {
      title: '2D',
      dataIndex: '2D',
      key: '2D',
    },
      {
        title: '3D',
        dataIndex: '3D',
        key: '3D',
      },
      {
        title: '4D',
        dataIndex: '4D',
        key: '4D',
      },
      {
        title: '5D',
        dataIndex: '5D',
        key: '5D',
      },
      {
        title: 'Imp',
        dataIndex: 'impacts',
        key: 'impacts',
      },
      {
        title: 'Pts',
        dataIndex: 'points',
        key: 'points',
      },
  ];

export const ScoreGrid = () => {

    const { scores } = useScore();
    const [rows, setRows] = useState([]);

    useEffect( () => {

        let newRows = [];

        scores.map( (round, index) => {

            const total = round.reduce(calculatePoints);
            const impactos = round.filter( (e) => e > 0);

            let ronda = '';

            if (index === 0) {
                ronda = 'Prueba';
            } else {
                if ( index <= 8 ) {
                    ronda = `Ronda ${ index }`;
                } else {
                    ronda = `Reintento ${ index-8 }`;
                }
            }

            const newItem = {
                'key': index,
                'round': ronda,
                '1D': round[0],
                '2D': round[1],
                '3D': round[2],
                '4D': round[3],
                '5D': round[4],
                'impacts': impactos.length,
                'points': total
            };

            newRows = [...newRows, newItem];
        });

        setRows( newRows );

    }, [scores]);

    return (
        <Flex style={{ 'marginTop': '32px' }} justify='center'>
            <Table dataSource={rows} columns={columns} size="small"  pagination={{ pageSize: 5 }}/>
        </Flex>
    )
}
