import { Breadcrumb, Space, Switch, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  callAPI,
  CallAPIOptionsDefault,
  getListProductByAppid,
  updateProductById,
} from "utils/api-hepler";
import { IProduct, IProductByAppId } from "../types/type";
interface IListProduct extends IProduct {
  groupId: string;
}

export const ListProductPage = () => {
  const [groupProductIds, setGroupProductIds] = useState<string[]>();
  const columns: ColumnsType<IListProduct> = [
    {
      title: "ID nhóm sản phẩm",
      dataIndex: "groupId",
      key: "groupId",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`../group-products/${record.groupId}`}>
            {record.groupId}
          </Link>
        </Space>
      ),
      sorter: (a, b) => a.groupId.localeCompare(b.groupId),
      filters:
        groupProductIds?.map((g) => {
          return {
            text: g,
            value: g,
          };
        }) ?? undefined,
      onFilter: (value: string, record) => record.groupId === value,
    },
    {
      title: "ID sản phẩm",
      dataIndex: "productID",
      key: "productID",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`../group-products/${record.groupId}/${record.productID}`}>
            {record.productID}
          </Link>
        </Space>
      ),
      sorter: (a, b) => a.productID - b.productID,
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
      sorter: (a, b) => a.price - b.price,
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
          onChange={async (e) => {
            const res = await callAPI(updateProductById, [
              appId,
              record.groupId,
              record.productID,
              {
                ...record,
                enable: e,
              },
              null,
              CallAPIOptionsDefault,
            ]);

            if (res) {
              const newProducts = [...products];
              for (let i = 0; i < newProducts.length; i++) {
                const p = newProducts[i];
                if (
                  p.productID === res.productID &&
                  p.groupId === res.groupId
                ) {
                  newProducts[i].enable = res.enable;
                  break;
                }
              }
              setProducts(newProducts);
            }
          }}
        />
      ),
    },
  ];
  const params = useParams();
  const { appId } = params;

  const [products, setProducts] = useState<IProductByAppId[]>();

  useEffect(() => {
    if (appId) {
      callAPI(getListProductByAppid, [Number(appId)], setProducts).then((p) => {
        const gpIds = new Set<string>();

        for (const p2 of p) {
          gpIds.add(p2.groupId);
        }
        setGroupProductIds(Array.from(gpIds));
      });
    }
  }, [appId]);
  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/products`}>Danh sách sản phẩm</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(r) => r.productID}
        pagination={false}
        loading={products == null}
      ></Table>
    </div>
  );
};
