import React from 'react'
import { useDispatch } from 'react-redux';

import { Form, Input, InputNumber, DatePicker, Select, Button } from "antd";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { startCreatingTournament } from '../../store';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export const CreateTournament = () => {

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(startCreatingTournament(values));
  };

  return (
    <Form
        name='new-tournament'
        layout='horizontal'
        initialValues={{remember: false}}
        autoComplete='off'
        onFinish={onFinish}
    >
      
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

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Crear Torneo
                </Button>
              </Form.Item>
    </Form>
  )
}