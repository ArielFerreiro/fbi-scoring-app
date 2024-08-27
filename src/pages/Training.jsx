import { useNavigate } from 'react-router-dom';

import { Col, Row, Divider, FloatButton, message } from 'antd';
import { RetweetOutlined, LeftOutlined } from '@ant-design/icons'; 

import { AppMenu, Scorer, RoundCounter, Totals, ScoreGrid, PageWrapper } from '../components';
import { useScore } from '../hooks';

export const Training = () => {

    const navigator = useNavigate();

    const {impacts, points, efficiency, scores, onAddRound, onReset} = useScore();
    const [ messageApi, contextHolder ] = message.useMessage();

    const onResetScoreBoard = () => {
        
        onReset();
    
        messageApi.info('Puntuacion Reiniciada!');
    }

    const onBack = () => {
        navigator(-1);
    }

    return (
        <PageWrapper>

            { contextHolder }

            <Row justify="center" align="top">
                <Col           
                    xs={{ flex: '100%' }}
                    sm={{ flex: '80%' }}
                    md={{ flex: '50%' }}
                    lg={{ flex: '40%' }}
                    xl={{ flex: '30%' }}>


                        <AppMenu />
                        <RoundCounter scores={ scores }/>
                        <Scorer scores={ scores } setRoundScores={ (round, retry, fail) => {onAddRound(round, retry, fail);} } />
                        <Divider orientation="left">Totales</Divider>
                        <Totals impacts={ impacts } points={ points } efficiency={ efficiency }/>
                        <ScoreGrid />

                </Col>
            </Row>

            <FloatButton.Group shape="square" style={{ insetInlineStart: 18 }}>
                <FloatButton
                    icon={<RetweetOutlined />}
                    badge={{ dot: true }}
                    tooltip='Reiniciar Puntuacion'
                    onClick={onResetScoreBoard}
                / >
                <FloatButton 
                    icon={ < LeftOutlined />}  
                    tooltip='Volver'
                    type='primary'
                    onClick={onBack}/>
            </FloatButton.Group>
        </PageWrapper>
    )
}