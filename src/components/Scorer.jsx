import { useEffect, useLayoutEffect, useState } from 'react';

import { Button, Col, Row, Divider, Badge, Flex, Select} from 'antd';
import { AlertOutlined, FrownFilled, ClearOutlined } from '@ant-design/icons';

import { ScoreButton } from './';

export const Scorer = ({ scores, setRoundScores = () => {} }) => {

    const [annotations, setAnnotations] = useState([]);
    const [retry, setRetryRound] = useState(0);
    
    const [counter, setCounter] = useState({cinco: 0, cuatro: 0, tres: 0, dos: 0, cero: 0});

    useEffect( () => {
        setRetryRound(0);
    }, [scores]);

    let options = scores.map((score, index) => {
        if (score.fail === true) {
            return {
                value: index, 
                label: `Ronda ${index}`
            }
        }
        return;
    });
    let retriesFilter = scores.map((score, index) => {
        if (score.retries !== 0) {
            return score.retries;
        }
        return;
    });
    retriesFilter = retriesFilter.filter((f) => f !== undefined);
    options = options.filter((s) => s !== undefined && !retriesFilter.includes(s.value) );


    const addScore = (score) => {
        if (annotations.length === 4) {
            const final = [...annotations, score];
            setRoundScores(final, retry, false);
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

    const addFailure = () => {

        const zerosToComplete = 5 - annotations.length;
        const arr = new Array(zerosToComplete).fill(0);
        const final = [...annotations, ...arr];
        setRoundScores(final, 0, true);
        setAnnotations( (a) => [] );
        setCounter((c) => c = {cinco: 0, cuatro: 0, tres: 0, dos: 0, cero: 0} );
    }

    const setReRound = (e) => {
        setRetryRound( e );
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
        <Flex style={{ 'marginTop': '16px', 'marginRight': '16px'}} justify="space-between">
            {
                (scores.length <= 8 || scores.length >=11) ?
                    <Button 
                        type="dashed" 
                        icon={<AlertOutlined />}
                        style={{marginLeft: '16px'}} 
                        onClick={addFailure} 
                        disabled={annotations.length === 0 ? true : false}
                    >
                        Fallo Admisible
                    </Button>      
                    :
                    <Select
                        showSearch
                        allowClear
                        onChange={setReRound}
                        style={{marginLeft: '16px'}} 
                        placeholder="Elija Ronda"
                        filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        
                        options={options}
                    />             
                               
            }

            <Button 
                type="dashed" 
                icon={<ClearOutlined  />}
                danger 
                style={{marginRight: '16px'}} 
                onClick={onDelete} 
                disabled={annotations.length === 0 ? true : false}>
                Borrar
            </Button>
        </Flex>

        </>
       
    )
}
