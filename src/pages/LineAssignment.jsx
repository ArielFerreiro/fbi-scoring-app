import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Row, Col, Flex, FloatButton, Typography, Table, Button } from "antd"
import { LeftOutlined, SaveOutlined } from '@ant-design/icons'; 
const { Title } = Typography;

import { PageWrapper } from "../components"
import { linesInArray, shuffle } from "../helpers";
import { startLinesAssignment } from "../store";

export const LineAssignment = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { active } = useSelector( state => state.tournament);
    const [lines, setLines] = useState(linesInArray(active.lines));
    
    const expandedRowRender = (record, index, indent, expanded ) => {

        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
            },
            {
                title: 'Linea',
                dataIndex: 'line',
            }
        ];

        let expandedData = [];
        for (let i = 0; i < active.shift.length; i++) {

            const currentShift = active.shift[i].toString();

            if (record.key === currentShift) {
                const shiftAppointments = active.appointments.filter( a => a.shift === currentShift );

                for ( let j = 0; j < shiftAppointments.length; j++) {
                    expandedData.push({
                        key: currentShift,
                        name: shiftAppointments[j].name,
                        line: lines[j]+1
                    });
                }
            }

        }
        return <Table rowkey={(record) => record.key} columns={columns} dataSource={expandedData} pagination={false} />;
    };

    const columns = [
        {
        title: 'Turno',
        dataIndex: 'shift',
        },
        {
        title: 'Asignar',
        key: 'operation',
        render: () => <Button onClick={onShuffle} type="primary" size="small">Mezclar</Button>,
        },
    ];
    const data = [];
    for (let i = 0; i < active.shift.length; ++i) {
        data.push({
            key: active.shift[i].toString(),
            shift: active.shift[i]
        });
    }
    const onShuffle = () => {
        const rand = shuffle(lines);
        setLines(rand);
    }

    const onBack = () => {
        navigate(-1);
    }

    const onSave = () => {
        dispatch(startLinesAssignment(active, lines));
    }

    return (
        <PageWrapper>

            <Row justify="center" align="top" style={{padding: "8px"}}>
                <Col           
                    xs={{ flex: '100%' }}
                    sm={{ flex: '80%' }}
                    md={{ flex: '50%' }}
                    lg={{ flex: '40%' }}
                    xl={{ flex: '30%' }}>

                    <Title level={4}>Asignar Lineas</Title>

                    <Table
                        rowkey={(record) => record.key}
                        columns={columns}
                        dataSource={data}
                        expandable={{ 
                            expandedRowRender,
                            expandRowByClick: true
                        }}
                        size="small"
                    />
                </Col>
            </Row>

            <Flex justify="center" align="top" style={{padding: "8px"}}>

                <Button 
                    type='primary' 
                    icon={<SaveOutlined />}
                    onClick={onSave}
                >
                    Guardar
                </Button>

            </Flex>
            <FloatButton.Group shape="square" style={{ insetInlineEnd: 18 }}>
                <FloatButton 
                    icon={ < LeftOutlined />}  
                    tooltip='Volver'
                    type='primary'
                    onClick={onBack}/>
            </FloatButton.Group>
        </PageWrapper>
    )
}