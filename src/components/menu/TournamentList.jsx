import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Table, Space, Button } from 'antd';
const { Column } = Table;

import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { clearActive, setActive, startDeletingTournament, startLoadingTournaments } from '../../store';
import { CheckingAuth } from '..';

export const TournamentList = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { isSaving, tournaments } = useSelector( state => state.tournament);
    const { uid } = useSelector( state => state.auth);

    useEffect(() => {
        dispatch(startLoadingTournaments());
    }, []);

    const onDelete = (tournament) => {
      dispatch(startDeletingTournament(tournament));
    }

    const onView = (tournament) => {
      dispatch(setActive(tournament));
      navigator('/tournament');
    }

    const onCreate = () => {
      dispatch(clearActive());
      navigator('/tournament');
    }

    let data = tournaments.map( t => {
          return {
            key: t.id,
            ...t
          }
    });
    data = data.filter( t => t.uid === uid );

    if (isSaving) {
        return (<CheckingAuth />);
    } else {
        return (
          <Flex align="center" justify='center' gap="middle" vertical>
                <Table 
                    size='small'
                    dataSource={data}
                >
                  <Column title='Nombre'  dataIndex='name' key='name' width='150' />
                  <Column title='Fecha'  dataIndex='date' key='date'  
                    sorter= {{
                      compare: (a, b) => a.date < b.date,
                      multiple: 1,
                    }} />
                  <Column title='Acciones' key='actions'       
                    render={(_, tournament) => (
                      <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => {onView(tournament)}}/>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => {onDelete(tournament)}} />
                      </Space>
                    )}/>
                </Table>
                <Button type='primary' onClick={ () => {onCreate()}}>Crear Torneo</Button>
          </Flex>
        )
    }
}
