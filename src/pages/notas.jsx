import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
} from "antd";
import axios from "axios";

const Notas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
  };
  const showModalEdit = async (id) => {
    setIsModalOpen(true);
    setIsUpdate(true);
    const response = await axios.get(`http://localhost:3000/nota/${id}`);
    const dto = response.data;
    const datos = { nota: parseInt(dto.nota), user: dto.User.name, id: dto.id };
    form.setFieldsValue(datos);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const getData = async () => {
    let response = await axios.get("http://localhost:3000/users");
    setData(
      response.data.map((item) => {
        item.key = item.id;
        return item;
      })
    );
  };

  const getDataNota = async () => {
    let response = await axios.get("http://localhost:3000/nota");
    setDataUser(response.data);
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/nota/${id}`);
    getDataNota();
  };
  const onFinish = async (values) => {
    const idNota = values.id;
    const objeto = data.find((item) => item.name == values.user);
    const value = { ...values, user_id: objeto.id };
    const { id, user, ...newValue } = value;

    if (isUpdate) {
      await axios.put(`http://localhost:3000/nota/${idNota}`, newValue);
    } else {
      await axios.post("http://localhost:3000/nota", newValue);
    }
    getData();
    getDataNota();
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    getData();
    getDataNota();
  }, []);
  return (
    <>
      <Button className="mt-5 ml-5" type="primary" onClick={showModal}>
        Create Nota
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={""}
      >
        <Form form={form} onFinish={onFinish} className="text-center mt-10">
          <Form.Item
            name="nota"
            rules={[
              {
                required: true,
                message: "Please input your nota!",
              },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "The grade must be greater than 0 and less than 100",
              },
            ]}
          >
            <InputNumber
              name="nota"
              placeholder="Enter the note"
              style={{ width: "65%" }}
            />
          </Form.Item>
          <Form.Item name={"id"} hidden>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name={"user"}
            rules={[
              {
                required: true,
                message: "Please input your User!",
              },
            ]}
          >
            <Select
              style={{
                width: 305,
                minWidth: 185,
                maxWidth: 400,
              }}
              options={data.map((item) => {
                return {
                  key: item.id,
                  value: item.name,
                  label: item.name,
                  id: item.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item>
            {isUpdate ? (
              <Button block type="primary" htmlType="submit">
                Update
              </Button>
            ) : (
              <Button block type="primary" htmlType="submit">
                Create
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Row className="ml-5">
        {dataUser.map((item) => {
          return (
            <>
              <Col span={6} key={item.id}>
                <Card title="User" bordered={false} className="mb-5">
                  <div className="mb-3">
                    <p>
                      <strong>Nota:</strong> {item.nota}
                    </p>
                    <p>
                      <strong>UserName:</strong> {item.User.name}
                    </p>
                  </div>
                  <div>
                    <Popconfirm
                      description="Are you sure to delete this user?"
                      okText="Yes"
                      cancelText="No"
                      className="me-4"
                      onConfirm={() => deleteUser(item.id)}
                    >
                      <Button type="primary" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                    <Button
                      type="primary"
                      onClick={() => showModalEdit(item.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};
export default Notas;
