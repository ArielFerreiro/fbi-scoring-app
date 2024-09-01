import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Row, Col, Typography, Form, Select, Button } from "antd";
const { Column } = Table;
const { Text } = Typography;

function removeDuplicates(arr) {
    return [...new Set(arr)];
}


export const JoinTournament = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);

  const { displayName } = useSelector( state => state.auth);
  const { isSaving, messageSaved, tournaments } = useSelector( state => state.tournament);

  const [ selectedTournament, setSelectedTournament] = useState(null);
  const [ categories, setCategories ] = useState([]);
  const [ shifts, setShifts ] = useState([]);
  const [ disciplines, setDisciplines ] = useState([]);

  useEffect(
    () => {
      if (selectedTournament) {
        setCategories(selectedTournament.categories);
        setShifts(selectedTournament.shift);
        setDisciplines(selectedTournament.discipline);
        form.resetFields();
      }
    }, [selectedTournament]);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTournament(selectedRows[0]);
    }
  };

  const data = tournaments.map( t => {
    return {
      key: t.id,
      ...t
    }
  });

  const onFinish = (values) => {
    console.log(values);
    //dispatch(startCreatingTournament(values));
    form.resetFields();
  };

  return (
    <>
      <Row justify="center" align="top" style={{padding: "8px"}}>
        <Col           
          xs={{ flex: '100%' }}
          sm={{ flex: '80%' }}
          md={{ flex: '50%' }}
          lg={{ flex: '40%' }}
          xl={{ flex: '30%' }}>
          
          <Text strong type="secondary">Competidor - </Text>  <Text strong>{displayName} </Text>

          <Table 
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
              size='small'
              dataSource={data}
              style={{paddingTop: '8px'}}
          >
            <Column title='Club'  dataIndex='club' key='bluv' />\
            <Column title='Nombre'  dataIndex='name' key='name' width='100' />
            <Column title='Fecha'  dataIndex='date' key='date' 
              sorter= {{
                compare: (a, b) => a.date < b.date,
                defaultSortOrder: 'descend',
              }} />
          </Table>
        </Col>
      </Row>
      <Row justify="center" align="top" style={{paddingLeft: "8px", paddingRight: "8px"}}>
        <Col>

          <Form form={form}
              name='join-tournament'
              layout='horizontal'
              initialValues={{remember: false}}
              autoComplete='off'
              onFinish={onFinish}
          >

            <Form.Item
                label="Turno"
                name="shift"
                style={{
                    display: 'inline-block',
                }}
                rules={[
                {
                    required: true,
                    message: 'Seleccione al menos un turno!',
                },
                ]}
            >
            <Select
                placeholder="Seleccione su turno"
                allowClear
                style={{ width: 'calc(100vw-16px)'}}
                options={ shifts.map( s => { 
                  return {"label": s, "value": s } 
                } ) }
                />
            </Form.Item> 

            <Form.Item
                label="Disciplina"
                name="discipline"
                rules={[
                {
                    required: true,
                    message: 'Seleccione al menos una disciplina!',
                },
                ]}
            >
                <Select
                  placeholder="Seleccione su disciplina"
                  allowClear
                  style={{ width: 'calc(100vw-16px)'}}
                  options={ disciplines.map( d => { 
                    return {"label": d, "value": d } 
                  } ) }
                />
            </Form.Item>

            <Form.Item
                label="Categoria"
                name="categories"
                rules={[
                {
                    required: true,
                    message: 'Seleccione una categoria!',
                },
                ]}
            >
                <Select
                  placeholder="Seleccione su categoria"
                  allowClear
                  style={{ width: 'calc(100vw-16px)'}}
                  options={ categories.map( c => { 
                    return {"label": c, "value": c } 
                  } ) }
                />
            </Form.Item>

            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isSaving} 
                    disabled={!submittable}>
                    Anotarse
                </Button>
            </Form.Item>    
          </Form>
        </Col>
      </Row>
    </>
  )
}