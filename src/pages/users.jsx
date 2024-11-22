import { Table, Row, Col, Modal, Button, Form, Input, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const Users = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LastName",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (text ? "Activo" : "Inactivo"),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return value.slice(0, 10);
      },
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "x",
      render: (value, row) => {
        return (
          <>
            <Popconfirm
              description="Are you sure to delete this user?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteUser(row.id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      render: (value, row) => (
        <Button type="primary" onClick={() => showModalEdit(row.id)}>
          Edit
        </Button>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
  };
  const showModalEdit = async (id) => {
    setIsModalOpen(true);
    setIsUpdate(true);
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    form.setFieldsValue(response.data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
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

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    getData();
  };
  const onFinish = async (values) => {
    const idUser = values.id;
    const { id, ...data } = values;
    if (isUpdate) {
      await axios.put(`http://localhost:3000/users/${idUser}`, data);
    } else {
      await axios.post("http://localhost:3000/users", values);
    }
    getData();
    form.resetFields();
    handleCancel();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row>
        <Col md={23}>
          <div className="mt-5 flex justify-end">
            <Button type="primary" onClick={showModal}>
              Create User
            </Button>
          </div>
          <Modal
            title="Create User"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={""}
          >
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your LastName!",
                  },
                ]}
              >
                <Input placeholder="LastName" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item name="id" hidden>
                <Input type="text" />
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
        </Col>
      </Row>
      <Row>
        <Col md={24} style={{ display: "flex", justifyContent: "center" }}>
          <Table dataSource={data} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default Users;
