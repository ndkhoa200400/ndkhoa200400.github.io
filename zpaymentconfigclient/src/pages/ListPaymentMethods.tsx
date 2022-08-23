import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IPaymentMethod } from "../types/type";
import { callAPI, getPaymentMethodList } from "../utils/api-hepler";

export const ListPaymentMethodsPage = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<IPaymentMethod> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.id}`}>{record.id}</Link>
        </Space>
      ),
    },
    {
      title: "Tên phương thức thanh toán",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Loại phương thức",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Hành động",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.id}`}>Chỉnh sửa</Link>
        </Space>
      ),
    },
  ];

  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>();
  // const data = paymentMethods;

  useEffect(() => {
    callAPI(getPaymentMethodList, [], setPaymentMethods);
  }, []);

  return (
    <div>
      <Title className="text-left">Phương thức thanh toán</Title>
      <div className="w-100 text-right my-3">
        <Button
          className="ml-auto"
          onClick={() => {
            navigate("./create-payment-method");
          }}
        >
          Tạo mới
        </Button>
      </div>
      <Table
        dataSource={paymentMethods}
        columns={columns}
        rowKey={(record) => record.id}
        loading={paymentMethods == null}
      ></Table>
    </div>
  );
};
