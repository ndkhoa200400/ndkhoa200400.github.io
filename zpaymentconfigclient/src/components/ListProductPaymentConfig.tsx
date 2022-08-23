import { Switch, Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IProductPaymentMethod, TDisplayCondition } from "../types/type";

export const ListProductPaymentMethodConfig: FC<{
  list: IProductPaymentMethod[];
  updateProductPaymentMethodById: (
    methodId: number,
    data: IProductPaymentMethod
  ) => Promise<void>;
}> = ({ list, updateProductPaymentMethodById }) => {
  const columns: ColumnsType<IProductPaymentMethod> = [
    {
      title: "ID phương thức",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <Link to={`${record.id}`}>{record.id}</Link>,
    },
    {
      title: "Tên phương thức",
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
      title: "Số lượng nhà cung cấp",
      dataIndex: "amountProviders",
      key: "amountProviders",
      render: (_, record) => record.paymentMethods?.length ?? 0,
    },
    {
      title: "Vị trí",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Điều kiện hiển thị",
      dataIndex: "displayConditions",
      key: "displayConditions",
      render: (text: TDisplayCondition) => (
        <Tag color={text === "outapp" ? "cyan" : "volcano"}>{text}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "enable",
      key: "enable",
      render: (_, record) => (
        <Switch
          checked={record.enable}
          onChange={(checked) =>
            updateProductPaymentMethodById(record.id, {
              ...record,
              enable: checked,
            })
          }
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={list}
      rowKey={(r) => r.id}
      pagination={false}
    ></Table>
  );
};
