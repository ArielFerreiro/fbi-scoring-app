import { ConfigProvider, Layout, Flex, Spin, theme} from 'antd';
import { useTheme } from '../../hooks';

const { Content } = Layout;

export const CheckingAuth = () => {

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
                <Spin size="large" />
            </Flex>
          </Content>
      </Layout>

    </ConfigProvider>
    
  )
}
