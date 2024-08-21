import { useDispatch, useSelector } from 'react-redux';
import { CheckingAuth } from '../components';
import { useEffect } from 'react';

import { startLoadingTournaments } from '../store';

import { Space, Table, Tag, Typography  } from 'antd';

const catColors = {
    'veterano': 'orange',
    'mayor': 'blue',
    'junior': 'green',
    'dama': 'pink'
}

const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
        title: 'Lineas',
        dataIndex: 'lines',
        key: 'lines',
    },
    {
        title: 'Categorias',
        key: 'categories',
        dataIndex: 'categories',
        render: (_, { categories }) => (
          <>
            {categories.map((category) => {
              return (
                <Tag color={catColors[category]} key={category}>
                  {category.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Disciplina',
        key: 'discipline',
        dataIndex: 'discipline',
        render: (_, { discipline }) => (
          <>
            {discipline.map((d) => {
              return (
                <Tag key={d}>
                  {d.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

export const TournamentList = () => {

    const dispatch = useDispatch();
    const { isSaving, tournaments } = useSelector( state => state.tournament);

    useEffect(() => {
        dispatch(startLoadingTournaments());
    }, []);

    const data = tournaments.map( t => {
        return {
            key: t.id,
            name: t.name,
            date: t.date,
            lines: t.lines,
            categories: t.categories,
            discipline: t.discipline
        }
    });

    if (isSaving) {
        return (<CheckingAuth />);
    } else {
        return (
            <Space direction='vertical'>
                <Typography.Title level={5}>Torneos Activos</Typography.Title>
                <Table 
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    size='small'
                    columns={columns} 
                    dataSource={data}
                />

            </Space>
        )
    }
}
