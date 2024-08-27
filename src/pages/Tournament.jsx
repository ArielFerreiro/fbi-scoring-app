import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form, FloatButton, Input, InputNumber, DatePicker, Select, Button, message, Row, Col } from "antd";
import { AimOutlined, DisconnectOutlined, LeftOutlined } from '@ant-design/icons'; 

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { clearActive, clearMessage, startCreatingTournament, startInactivatingTournament } from '../store';
import { PageWrapper } from '../components';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export const Tournament = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [messageApi, contextHolder] = message.useMessage();

  const [submittable, setSubmittable] = useState(false);

  const dispatch = useDispatch()
  const { isSaving, messageSaved, active } = useSelector( state => state.tournament);

  useEffect(() => {
    if (active != undefined) {
        form.setFieldsValue({ 
            name: active.name, 
            numShooters: active.lines, 
            date: dayjs(active.date, dateFormat), 
            shift: active.shift,
            discipline: active.discipline,
            categories: active.categories
         });
    }
  }, [active]);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  useEffect(() => {
    if (messageSaved != '') {
        messageApi.info(messageSaved);
        dispatch(clearMessage());
    }
  }, [messageSaved]);

  const onFinish = (values) => {
    //console.log(values.date.format("YYYY-MM-DD"))
    dispatch(startCreatingTournament(values));
    form.resetFields();
  };

  const onInactivate = () => {
    dispatch(startInactivatingTournament(active));
    form.resetFields();
  }

  const onBack = () => {
    dispatch(clearActive());
    navigate(-1);
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
                
                <Form form={form}
                    name='new-tournament'
                    layout='horizontal'
                    initialValues={{remember: false}}
                    autoComplete='off'
                    onFinish={onFinish}
                >
                    {contextHolder}
                    <Form.Item
                        label="Nombre del Torneo"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un nombre!',
                        },
                        ]}
                    >
                        <Input placeholder='Ingrese el nombre del torneo'  disabled={(active != undefined)} />
                    </Form.Item>

                    <Form.Item
                        label="Cantidad de Lineas"
                        name="numShooters"
                        rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un numero!',
                        },
                        ]}
                    >
                        <InputNumber min={1} max={30} changeOnWheel disabled={(active != undefined)}/>
                    </Form.Item>

                    <Row justify={'space-between'}>
                            <Form.Item
                                label="Fecha del Torneo"
                                name="date"
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 8px)',
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: 'Por favor seleccione una fecha!',
                                },
                                ]}
                            >
                                <DatePicker
                                    minDate={dayjs()}
                                    disabled={(active != undefined)}
                                />
                            </Form.Item>            

                            <Form.Item
                                label="Turnos"
                                name="shift"
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 8px)',
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: 'Seleccione al menos un turno!',
                                },
                                ]}
                            >
                            <Select
                                placeholder="Seleccione los turnos"
                                mode="multiple"
                                allowClear
                                disabled={(active != undefined)}
                                options={[
                                    { value: '09:00', label: '09:00' },
                                    { value: '10:00', label: '10:00' },
                                    { value: '11:00', label: '11:00' },
                                    { value: '12:00', label: '12:00' },
                                    { value: '13:00', label: '13:00' },
                                    { value: '14:00', label: '14:00' },
                                    { value: '15:00', label: '15:00' },
                                    { value: '16:00', label: '16:00' },
                                    { value: '17:00', label: '17:00' },                        
                                    { value: '18:00', label: '18:00' },
                                    { value: '19:00', label: '19:00' },
                                    { value: '20:00', label: '20:00' },
                                    { value: '21:00', label: '21:00' },
                                    { value: '22:00', label: '22:00' },
                                ]}
                                />
                            </Form.Item>            
                    </Row>


                    <Form.Item
                        label="Disciplina"
                        name="discipline"
                        rules={[
                        {
                            required: true,
                            message: 'Seleccione al menos un tipo de disciplina!',
                        },
                        ]}
                    >
                        <Select
                        placeholder="Seleccione las disciplinas"
                        style={{ width: '100%' }}
                        mode="multiple"
                        allowClear
                        disabled={(active != undefined)}
                        options={[
                            { value: 'pistola', label: 'Pistola' },
                            { value: 'revolver', label: 'Revolver' },
                            { value: 'mini-rifle', label: 'Mini Rifle' },
                        ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Categorias"
                        name="categories"
                        rules={[
                        {
                            required: true,
                            message: 'Seleccione al menos una categoria!',
                        },
                        ]}
                    >
                        <Select
                        placeholder="Seleccione las categorias"
                        style={{ width: '100%' }}
                        mode="multiple"
                        disabled={(active != undefined)}
                        allowClear
                        options={[
                            { value: 'veterano', label: 'Veterano' },
                            { value: 'mayor', label: 'Mayor' },
                            { value: 'junior', label: 'Junior' },
                            { value: 'dama', label: 'Dama' },
                        ]}
                        />
                    </Form.Item>

                    <Row justify={'center'}>
                        <Col style={{ display: (active != undefined) ? 'none' : null }}>
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={isSaving} 
                                    disabled={!submittable}>
                                    Crear Torneo
                                </Button>
                            </Form.Item>    
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        
        <FloatButton.Group shape="square" style={{ insetInlineEnd: 18 }}>
            <FloatButton 
                icon={ < AimOutlined />}  
                tooltip='Iniciar Torneo'
                onClick={onBack}
            />
            <FloatButton 
                    style={{ display: (active != undefined) ? null : 'none'}}
                    icon={ <DisconnectOutlined /> }  
                    tooltip='Inactivar'
                    onClick={onInactivate}/>
            <FloatButton 
                icon={ < LeftOutlined />}  
                tooltip='Volver'
                type='primary'
                onClick={onBack}/>
      </FloatButton.Group>
    </PageWrapper>
    
  )
}