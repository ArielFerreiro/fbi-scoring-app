import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthLayout } from '../components/';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../store';
import { LockOutlined, UserOutlined, GoogleOutlined  } from '@ant-design/icons';
import { Alert, Form, Input, Divider, Flex, Button } from 'antd';


export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth);
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onFinish = (values) => {
    //console.log('Success:', values);
    dispatch(startLoginWithEmailPassword(values));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
        <Form
          name='login'
          layout='vertical'
          initialValues={{remember: true}}
          className="animate__animated animate__fadeIn  animate__faster"
          autoComplete='off'
          onFinish={onFinish}
        >
     
          <Flex gap={2} vertical style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0px 5px 5px rgba(0,0,0,0.2)' }}>
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
              <Input prefix={<UserOutlined />}  placeholder='Ingrese su correo'/>
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
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Form.Item>
              <Button 
                icon={<GoogleOutlined /> } 
                disabled={ isAuthenticating } 
                onClick={ onGoogleSignIn } 
              >
                Google
              </Button>
            </Flex>
            <Alert message={errorMessage} type="error" showIcon closable style={{ marginTop: '8px', display: !!errorMessage ? '': 'none' }} />
            <Divider plain>No tenes cuenta?</Divider>
            <Link color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Flex>

        </Form>
    </AuthLayout>
  )
}