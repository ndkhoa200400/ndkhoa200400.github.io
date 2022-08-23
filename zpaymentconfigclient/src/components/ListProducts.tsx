import { Space, Switch } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../types/type";

export const ListProduct: FC<{
  list: IProduct[];
  updateProduct: (productID: number, data: IProduct) => Promise<void>;
}> = ({ list, updateProduct }) => {
  const columns: ColumnsType<IProduct> = [
    {
      title: "ID sản phẩm",
      dataIndex: "productID",
      key: "productID",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.productID}`}>{record.productID}</Link>
        </Space>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record.description,
          }}
        ></div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => record.price,
    },
    {
      title: "Hướng dẫn",
      dataIndex: "instruction",
      key: "instruction",
      render: (_, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record.instruction,
          }}
        ></div>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "enable",
      key: "enable",
      render: (_, record) => (
        <Switch
          checked={record.enable}
          onChange={(checked) => {
            updateProduct(record.productID, {
              ...record,
              enable: checked,
            });
          }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={list}
      rowKey={(r) => r.productID}
      pagination={false}
    ></Table>
  );
};
