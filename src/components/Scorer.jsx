import { useState } from 'react';

import { Button, Col, Row, Divider } from 'antd'
import { FrownFilled } from '@ant-design/icons';

import { ScoreButton } from './';

export const Scorer = ({ scores, setRoundScores = () => {} }) => {

    const [annotations, setAnnotations] = useState([]);

    const addScore = (score) => {
        if (annotations.length === 4) {
            const final = [...annotations, score];
            setRoundScores(final);
            setAnnotations( (a) => [] );
        } else {
            setAnnotations( (a) => [...a, score] );
        }
    }

    const addNoScores = () => {
        setRoundScores([0,0,0,0,0]);
    }

    return (
        <>
            <Divider orientation="left">Puntuacion Ronda</Divider>
            <Row style={{ 'marginTop': '16px', 'marginLeft': '16px'}}>
            <Col className="gutter-row" span={4}>
                <ScoreButton value={5} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
            </Col>
            <Col className="gutter-row" span={4}>
                <ScoreButton value={4} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
            </Col>
            <Col className="gutter-row" span={4}>
                <ScoreButton value={3} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
            </Col>
            <Col className="gutter-row" span={4}>
                <ScoreButton value={2} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
            </Col>
            <Col className="gutter-row" span={4}>
                <ScoreButton value={0} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
            </Col>
            <Col className="gutter-row" span={4}>
                <Button type="primary" danger shape="circle" onClick={ addNoScores } disabled={ (annotations.length !== 0 ||  scores.length === 11) ? true : false }>
                    <FrownFilled />
                </Button>            
            </Col>
        </Row> 
        </>
       
    )
}
