import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components';

import { startCreatingUserWithEmailPassword } from '../store';
import { Alert, Input, Form, Divider, Flex, Tooltip, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, LockOutlined, MailOutlined  } from '@ant-design/icons';


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  const onFinish = (values) => {
    setFormSubmitted(true);
    dispatch( startCreatingUserWithEmailPassword(values) );
  };


  return (
    <AuthLayout title='Crear Cuenta'> 

        <Form 
            name='register'
            layout='vertical'
            initialValues={{remember: true}}
            className="animate__animated animate__fadeIn  animate__faster"
            autoComplete='off'
            onFinish={onFinish}
        >
            <Flex gap={2} vertical style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0px 5px 5px rgba(0,0,0,0.2)' }}>
                <Form.Item
                    label="Nombre"
                    name="displayName"
                    rules={[
                        {
                        required: true,
                        message: 'Por favor ingrese su nombre!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />}  placeholder='Ingrese su correo'/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Por favor ingrese su correo!',
                        },
                        {
                        type: 'email',
                        message: 'Ingrese un correo valido!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />}  placeholder='Ingrese su correo'/>
                </Form.Item>
                <Form.Item
                    label="Clave"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Por favor ingrese su clave!',
                        },
                        {
                        min: 6,
                        message: 'La clave debe tener al menos 6 digitos!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />}  placeholder='Ingrese su clave'/>
                </Form.Item>
                <Flex justify='space-between' style={{ marginTop: '16px'}}>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" disabled={ isCheckingAuthentication }>
                            Crear Cuenta
                        </Button>
                    </Form.Item>
                </Flex>
                <Alert message="Warning" type="error" showIcon closable style={{ marginTop: '8px', display: !!errorMessage ? '': 'none' }} />
                <Divider plain>Ya tenes cuenta?</Divider>
                <Link color='inherit' to='/auth/login'>
                    Login
                </Link>    
            </Flex>
        </Form>      

    </AuthLayout>
  )
}
