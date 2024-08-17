
import { useScore } from '../../hooks/useScore';
import { useEffect, useState } from 'react';
import { calculatePoints } from '../../helpers';

import { Table, Flex, Tag } from "antd";

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
      {
        title: 'Fallo',
        dataIndex: 'fail',
        key: 'fail',
        render: (text) => {

          if (text === 'X') {
            return <Tag color={'volcano'}>X</Tag>;
          }

        }

      },
  ];

export const ScoreGrid = () => {

    const { scores } = useScore();
    const [rows, setRows] = useState([]);

    useEffect( () => {

        let newRows = [];

        scores.map( (round, index) => {

            const roundScores = round.scores;
            let fail = '';
            if (round.fail === true) {
              fail = 'X';
            }
            

            const total = roundScores.reduce(calculatePoints);
            const impactos = roundScores.filter( (e) => e > 0);

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
                '1D': roundScores[0],
                '2D': roundScores[1],
                '3D': roundScores[2],
                '4D': roundScores[3],
                '5D': roundScores[4],
                'impacts': impactos.length,
                'points': total,
                'fail': fail
            };

            newRows = [...newRows, newItem];
        });

        setRows( newRows );

    }, [scores]);

    return (
        <Flex style={{ 'marginTop': '32px' }} justify='center'>
            <Table dataSource={rows} columns={columns} size="small"  pagination={{ pageSize: 4 }}/>
        </Flex>
    )
}
