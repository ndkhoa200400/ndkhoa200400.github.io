import { Breadcrumb, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CreateButton } from "components/CreateButton";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IGroupProduct } from "types/type";
import { callAPI, getGroupProductsByAppId } from "utils/api-hepler";

export const ListGroupProduct: FC = () => {
  const params = useParams();
  const { appId } = params;

  const columns: ColumnsType<IGroupProduct> = [
    {
      title: "ID nhóm sản phẩm",
      dataIndex: "groupId",
      key: "groupId",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.groupId}`}>{record.groupId}</Link>
        </Space>
      ),
    },
    {
      title: "Tên nhóm sản phẩm",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "amountProducts",
      key: "amountProducts",
      render: (_, record) => Object.values(record.products ?? {}).length,
    },
    {
      title: "Hành động",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.groupId}`}>Chỉnh sửa</Link>
        </Space>
      ),
    },
  ];

  const [groupProducts, setGroupProducts] = useState<IGroupProduct[]>();

  useEffect(() => {
    if (appId) {
      callAPI(getGroupProductsByAppId, [Number(appId)], setGroupProducts);
    }
  }, [appId]);

  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products`}>Nhóm sản phẩm</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-100 text-right my-3">
        <CreateButton link="./../create-group-product" />
      </div>
      <Table
        dataSource={groupProducts}
        columns={columns}
        rowKey={(record) => record.groupId}
        loading={groupProducts == null}
      ></Table>
    </div>
  );
};
