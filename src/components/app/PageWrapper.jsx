import { ConfigProvider, Layout, theme } from 'antd';
import { useTheme } from '../../hooks';
const { Content } = Layout;

export const PageWrapper = ({children}) => {

  const { isDarkTheme } = useTheme();

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
          { children }
        </Content>
      </Layout>
        
 
    </ConfigProvider>
  )
}
