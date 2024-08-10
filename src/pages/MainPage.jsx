import { ConfigProvider, Divider, FloatButton, Layout, message, theme } from 'antd';
import { RetweetOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'; 

import { AppMenu, Scorer, RoundCounter, Totals, ScoreGrid } from '../components';
import { useScore, useTheme } from '../hooks';

const { Content } = Layout;

export const MainPage = () => {

    const {impacts, points, efficiency, scores, onAddRound, onReset} = useScore();
    const { onToggleTheme, isDarkTheme } = useTheme();
    const [messageApi, contextHolder] = message.useMessage();

    const onResetScoreBoard = () => {
        
        onReset();
    
        messageApi.info('Puntuacion Reiniciada!');
    }

    return (
        <ConfigProvider
            theme={{
                // 1. Use dark algorithm
                algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

                // 2. Combine dark algorithm and compact algorithm
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
        >
            {contextHolder}

            <Layout  style={{ minHeight: '100vh', minWidth: '100vw', margin:"0px", position:'absolute', top:0, left:0}} hasSider={false}>
                <Content>
                    <AppMenu />
                    <RoundCounter scores={ scores }/>
                    <Scorer scores={ scores } setRoundScores={ (round) => {onAddRound(round);} } />
                    <Divider orientation="left">Totales</Divider>
                    <Totals impacts={ impacts } points={ points } efficiency={ efficiency }/>
                    <ScoreGrid />
                </Content>
            </Layout>
            <FloatButton.Group shape="square" style={{ insetInlineEnd: 18 }}>
                <FloatButton icon={ isDarkTheme ? <SunOutlined/> : <MoonOutlined />}  onClick={onToggleTheme}/>
                <FloatButton
                    icon={<RetweetOutlined />}
                    badge={{ dot: true }}
                    onClick={onResetScoreBoard}
                / >
            </FloatButton.Group>
        </ConfigProvider>
    )
}