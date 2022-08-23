import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { CreateButton } from "components/CreateButton";
import { ListProduct } from "components/ListProducts";
import { LoadingFullScreen } from "components/LoadingFullScreen";
import { MyCard } from "components/MyCard";
import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IGroupProduct, IProduct } from "types/type";
import {
  callAPI,
  getOneGroupProductByAppId,
  updateProductById,
} from "utils/api-hepler";
import { getErrorModal } from "utils/error-modal";

export const GroupProductPage: FC = () => {
  const params = useParams();
  const { appId, groupId } = params;
  const [form] = Form.useForm<IGroupProduct>();

  const onFinish = (values: IGroupProduct) => {
    console.log("Success:", values);
    alert(JSON.stringify(values));
  };

  const [groupProduct, setGroupProduct] = useState<IGroupProduct>();
  useEffect(() => {
    if (appId && groupId) {
      callAPI(
        getOneGroupProductByAppId,
        [Number(appId), groupId],
        setGroupProduct
      );
    }
  }, [appId, groupId]);

  const updateProduct = async (productID: number, data: IProduct) => {
    try {
      const res = await updateProductById(
        Number(appId),
        groupId,
        productID,
        data
      );
      if (res.err < 0) {
        getErrorModal({
          content: res.msg,
        });
      } else {
        const products = groupProduct.products;
        products[productID] = res.data;

        setGroupProduct({
          ...groupProduct,
          products: products,
        });
      }
    } catch (error) {
      getErrorModal({
        content: _.get(error, "message"),
      });
    }
  };

  return groupProduct ? (
    <div className="">
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products`}>Nhóm sản phẩm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <div>{groupProduct.groupId}</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Cài đặt">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={groupProduct}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="ID nhóm sản phẩm" name="groupId">
                <Input disabled value={groupProduct.groupId} />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="Tên nhóm sản phẩm" name="groupName">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
        <div className="w-100 text-right my-3">
          <CreateButton link="./create-product" title="Thêm mới sản phẩm" />
        </div>
        <MyCard
          title="Danh sách sản phẩm"
          bodyStyle={{
            padding: 0,
          }}
        >
          <ListProduct
            list={Object.values(groupProduct.products ?? {})}
            updateProduct={updateProduct}
          />
        </MyCard>
      </MyCard>
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
