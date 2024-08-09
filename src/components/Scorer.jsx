import { useState } from 'react';

import { Button, Col, Row, Divider, Badge, Flex } from 'antd'
import { FrownFilled } from '@ant-design/icons';

import { ScoreButton } from './';

export const Scorer = ({ scores, setRoundScores = () => {} }) => {

    const [annotations, setAnnotations] = useState([]);
    const [counter, setCounter] = useState({cinco: 0, cuatro: 0, tres: 0, dos: 0, cero: 0});

    const addScore = (score) => {
        if (annotations.length === 4) {
            const final = [...annotations, score];
            setRoundScores(final);
            setAnnotations( (a) => [] );
            setCounter((c) => c = {cinco: 0, cuatro: 0, tres: 0, dos: 0, cero: 0} );
        } else {
            setAnnotations( (a) => [...a, score] );
            switch (score) {
                case 5:
                    counter.cinco++;
                    setCounter(counter);
                    break;
                case 4:
                    counter.cuatro++;
                    setCounter(counter);
                    break;
                case 3:
                    counter.tres++;
                    setCounter(counter);
                    break;
                case 2:
                    counter.dos++;
                    setCounter(counter);
                    break;
                case 0:
                    counter.cero++;
                    setCounter(counter);
                    break;
                default:
                    break;
            }
        }
    }

    const addNoScores = () => {
        setRoundScores([0,0,0,0,0]);
    }

    const onDelete = () => {
        setAnnotations( (a) => [] );
        setCounter((c) => c = {cinco: 0, cuatro: 0, tres: 0, dos: 0, cero: 0} );
    }

    return (
        <>
            <Divider orientation="left">Puntuacion Ronda</Divider>
            <Row style={{ 'marginTop': '16px', 'marginLeft': '16px'}}>
            <Col className="gutter-row" span={4}>
                <Badge count={counter.cinco}>
                    <ScoreButton value={5} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
                </Badge>
            </Col>
            <Col className="gutter-row" span={4}>
                <Badge count={counter.cuatro}>
                    <ScoreButton value={4} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
                </Badge>
            </Col>
            <Col className="gutter-row" span={4}>
                <Badge count={counter.tres}>
                    <ScoreButton value={3} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
                </Badge>
            </Col>
            <Col className="gutter-row" span={4}>
                <Badge count={counter.dos}>
                    <ScoreButton value={2} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>            
                </Badge>
            </Col>
            <Col className="gutter-row" span={4}>
                <Badge count={counter.cero}>
                    <ScoreButton value={0} onClick={addScore} disabled={ scores.length === 11 ? true : false }/>
                </Badge>
            </Col>
            <Col className="gutter-row" span={4}>
                <Button type="primary" danger shape="circle" onClick={ addNoScores } disabled={ (annotations.length !== 0 ||  scores.length === 11) ? true : false }>
                    <FrownFilled />
                </Button>            
            </Col>
        </Row> 
        <Flex style={{ 'marginTop': '16px', 'marginRight': '16px'}} justify="end">
            <Button type="dashed" danger onClick={onDelete}>
                Borrar
            </Button>
        </Flex>

        </>
       
    )
}
