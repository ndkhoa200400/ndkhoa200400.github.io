import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IProvider } from "../types/type";
import { callAPI, getProviderList } from "../utils/api-hepler";
const columns: ColumnsType<IProvider> = [
  {
    title: "ID",
    dataIndex: "provideId",
    key: "provideId",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`${record.provideId}`}>{record.provideId}</Link>
      </Space>
    ),
    sorter: (a, b) => a.provideId.localeCompare(b.provideId),
  },
  {
    title: "Tên nhà cung cấp",
    dataIndex: "provideName",
    key: "provideName",
  },
  {
    title: "Mô tả",
    dataIndex: "desc",
    key: "desc",
  },

  {
    title: "Hành động",
    key: "edit",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`${record.provideId}`}>Chỉnh sửa</Link>
      </Space>
    ),
  },
];
export const ListProviderPage = () => {
  const navigate = useNavigate();

  const [providers, setProviders] = useState<IProvider[]>();
  useEffect(() => {
    callAPI(getProviderList, [], setProviders);
  }, []);

  return (
    <div>
      <Title className="text-left">Nhà cung cấp</Title>
      <div className="w-100 text-right my-3">
        <Button
          className="ml-auto"
          onClick={() => {
            navigate("./create-provider");
          }}
        >
          Tạo mới
        </Button>
      </div>
      <Table
        dataSource={providers}
        columns={columns}
        rowKey={(record) => record.provideId}
        loading={providers == null}
      ></Table>
    </div>
  );
};
