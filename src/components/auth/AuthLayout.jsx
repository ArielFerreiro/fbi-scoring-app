import { ConfigProvider, Layout, Flex, Row, Col, Typography, theme} from 'antd';
import { useTheme } from '../../hooks';

const { Title } = Typography;
const { Content } = Layout;

export const AuthLayout = ({ children, title=''}) => {

  const { onToggleTheme, isDarkTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
          // 1. Use dark algorithm
          algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout  style={{ minHeight: '100vh', minWidth: '100vw', margin:"0px", position:'absolute', top:0, left:0}} hasSider={false}>
          <Content>
            <Flex gap="middle" 
                  align="center" 
                  justify='center'  
                  vertical
                  style={{minHeight: '100vh', padding: 4 }}
            >
                <Row justify="center" align="start">
                    <Col           
                        xs={{ flex: '100%' }}>

                        <Title level={5}>{ title }</Title>
                        { children }

                    </Col>
                </Row>
            </Flex>
          </Content>
      </Layout>

    </ConfigProvider>
    
  )
}
