import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography } from "antd";

const { Text } = Typography;



export const JoinTournament = () => {

  const dispatch = useDispatch();
  const { displayName } = useSelector( state => state.auth);

  return (
    <Row justify="center" align="top" style={{padding: "8px"}}>
      <Col           
        xs={{ flex: '100%' }}
        sm={{ flex: '80%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '40%' }}
        xl={{ flex: '30%' }}>
        
        <Text strong type="secondary">Competidor - </Text>  <Text strong>{displayName} </Text>
      </Col>
    </Row>
  )
}