import { Form, Input, InputNumber, Switch, Typography } from "antd";
import Table from "antd/lib/table";
import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProductPricing } from "../types/type";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IProductPricing;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const ListProductProvderConfig: FC<{
  list: IProductPricing[];
  updatePriceOfProvider: (
    provideId: string,
    data: Partial<IProductPricing>
  ) => Promise<void>;
}> = ({ list, updatePriceOfProvider }) => {
  const [form] = Form.useForm<IProductPricing>();
  const [data, setData] = useState(list);
  useEffect(() => {
    setData(list);
  }, [list]);

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: IProductPricing) =>
    record.provideId === editingKey;

  const edit = (record: Partial<IProductPricing>) => {
    form.setFieldsValue({
      amount: record.amount,
    });
    setEditingKey(record.provideId);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IProductPricing;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.provideId);
      if (index > -1) {
        const item = newData[index];
        const newItem = { ...item, ...row };
        newData.splice(index, 1, newItem);
        if (!_.isEmpty(row))
          await updatePriceOfProvider(item.provideId, newItem);
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID nhà cung cấp",
      dataIndex: "provideId",
      key: "provideId",
      render: (_, record) => (
        <Link to={`/providers/${record.provideId}`}>{record.provideId}</Link>
      ),
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "provideName",
      key: "provideName",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      editable: true,
    },

    {
      title: "Trạng thái",
      dataIndex: "enable",
      key: "enable",
      render: (_, record) => (
        <Form.Item name="enable">
          <Switch
            checked={record.enable}
            onChange={(e) => {
              form.setFieldsValue({
                enable: e,
              });

              save(record.provideId);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_: any, record: IProductPricing) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.provideId)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              Hủy
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Chỉnh sửa
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IProductPricing) => ({
        record,
        inputType: col.dataIndex === "amount" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns}
        loading={data == null}
        rowClassName="editable-row"
        dataSource={data}
        // dataSource={list}
        rowKey={(r) => r.provideId}
        pagination={false}
      ></Table>
    </Form>
  );
};
