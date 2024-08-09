import { Divider, FloatButton, Layout, message } from 'antd';
import { RetweetOutlined } from '@ant-design/icons'; 

import { AppMenu, Scorer, RoundCounter, Totals, ScoreGrid } from '../components';
import { useScore } from '../hooks';

const { Header, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

const contentStyle = {
    backgroundColor: '#fff',
}

export const MainPage = () => {

    const {impacts, points, testImpacts, testPoints, scores, onAddRound, onReset} = useScore();
    const [messageApi, contextHolder] = message.useMessage();

    const onResetScoreBoard = () => {
        
        onReset();
    
        messageApi.info('Puntuacion Reiniciada!');
    }

    return (
        <>
            {contextHolder}

            <Layout>
                <Header style={headerStyle}>
                    <AppMenu />
                </Header>
                <Content style={contentStyle}>
                    <RoundCounter scores={ scores }/>
                    <Scorer scores={ scores } setRoundScores={ (round) => {onAddRound(round);} } />
                    <Divider orientation="left">Totales</Divider>
                    <Totals impacts={ impacts } points={ points } />
                    <ScoreGrid />
                </Content>
            </Layout>
            <FloatButton
                icon={<RetweetOutlined />}
                badge={{ dot: true }}
                style={{
                '--initial-position-bottom': '24px',
                '--initial-position-right': '24px',
                '--edge-distance': '24px',
                }}
                onClick={onResetScoreBoard}
            / >
        </>
    )
}