import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, InputNumber, DatePicker, Select, Button, message, Row, Col } from "antd";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { clearMessage, startCreatingTournament } from '../../store';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export const CreateTournament = () => {

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [messageApi, contextHolder] = message.useMessage();

  const [submittable, setSubmittable] = useState(false);

  const dispatch = useDispatch()
  const { isSaving, messageSaved } = useSelector( state => state.tournament);

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
    dispatch(startCreatingTournament(values));
    form.resetFields();
  };

  return (
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
            <Input placeholder='Ingrese el nombre del torneo'/>
        </Form.Item>

        <Form.Item
            label="Cantidad de Participantes"
            name="numShooters"
            rules={[
            {
                required: true,
                message: 'Por favor ingrese un numero!',
            },
            ]}
        >
            <InputNumber min={1} max={30} changeOnWheel/>
        </Form.Item>

        <Form.Item
            label="Fecha del Torneo"
            name="date"
            rules={[
            {
                required: true,
                message: 'Por favor seleccione una fecha!',
            },
            ]}
        >
            <DatePicker
                minDate={dayjs()}
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
            allowClear
            options={[
                { value: 'veterano', label: 'Veterano' },
                { value: 'mayor', label: 'Mayor' },
                { value: 'junior', label: 'Junior' },
                { value: 'dama', label: 'Dama' },
            ]}
            />
        </Form.Item>

        <Row justify={'space-evenly'}>
            <Col>
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
            <Col>
                <Form.Item>
                    <Button>
                        Mis Torneos
                    </Button>
                </Form.Item>            
            </Col>
        </Row>
    </Form>
  )
}