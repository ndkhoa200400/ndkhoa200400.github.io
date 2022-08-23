import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch
} from "antd";
import { AddPriceConfigToProductPaymentMethodModal } from "components/AddPriceProductPaymentMethodModal";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addPriceConfigToProductPaymentMethod,
  callAPI,
  CallAPIOptionsDefault,
  getOneProductPaymentMethod,
  updatePriceConfigToProductPaymentMethod,
  updateProductPaymentMethod
} from "utils/api-hepler";
import { getSuccessModal } from "utils/success-modal";
import { ListProductProvderConfig } from "../components/ListProductProvidersConfig";
import { LoadingFullScreen } from "../components/LoadingFullScreen";
import { MyCard } from "../components/MyCard";
import {
  IAddProductPricing,
  IProductPaymentMethod,
  IProductPricing
} from "../types/type";

const { Option } = Select;
export const ProductPaymentMethodPage = () => {
  const params = useParams();

  const { appId, groupId, productID, methodId } = params;

  const [productPaymentMethod, setProductPaymentMethod] =
    useState<IProductPaymentMethod>();

  const [form] = Form.useForm<IProductPaymentMethod>();

  const [enable, setEnable] = useState(true);

  const [showAddProviderModal, setShowAddProviderModal] = useState(false);

  useEffect(() => {
    if (appId && groupId && methodId && productID) {
      callAPI(
        getOneProductPaymentMethod,
        [Number(appId), Number(productID), Number(methodId)],
        setProductPaymentMethod
      );
    }
  }, [appId, groupId, methodId, productID]);

  useEffect(() => {
    if (productPaymentMethod) {
      setEnable(productPaymentMethod.enable);
    }
  }, [productPaymentMethod]);

  const onFinish = async (values: IProductPaymentMethod) => {
    // Object.assign()
    values.enable = enable;

    console.log("Success:", values);

    callAPI(
      updateProductPaymentMethod,
      [Number(appId), groupId, Number(productID), methodId, values],
      setProductPaymentMethod,
      CallAPIOptionsDefault
    );
  };

  const onAddProvider = async (values: IAddProductPricing) => {
    await callAPI(
      addPriceConfigToProductPaymentMethod,
      [Number(appId), groupId, Number(productID), methodId, values],
      setProductPaymentMethod,
      {
        onDone: () => {
          getSuccessModal({
            content: `Thêm mới thành công một nhà cung cấp cho phương thức  ${productPaymentMethod.name}`,
          });
          setShowAddProviderModal(false);
          setEnable(true);
        },
      }
    );
    await callAPI(
      getOneProductPaymentMethod,
      [Number(appId), Number(productID), Number(methodId)],
      setProductPaymentMethod
    );
  };

  const updatePriceOfProvider = async (
    provideId: string,
    data: Partial<IProductPricing>
  ) => {
    callAPI(
      updatePriceConfigToProductPaymentMethod,
      [Number(appId), groupId, Number(productID), methodId, provideId, data],
      setProductPaymentMethod,
      CallAPIOptionsDefault
    );
  };
  return productPaymentMethod ? (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products`}>Nhóm sản phẩm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products/${groupId}`}>
            {groupId}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products/${groupId}/${productID}`}>
            Sản phẩm {productID}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <div>Phương thức thanh toán {productPaymentMethod.name}</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Cài đặt">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          size="middle"
          initialValues={productPaymentMethod}
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row text-left">
              <Form.Item label="ID phương thức" name="id">
                <Input disabled></Input>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12} className="gutter-row text-left">
              <Form.Item label="Tên phương thức" name="name">
                <Input disabled></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item
                label="Vị trí hiển thị"
                name="order"
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập vị trí hiển thị",
                  },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>

            <Col xs={24} lg={6} className="gutter-row">
              <Form.Item label="Điều kiện hiển thị" name="displayConditions">
                <Select style={{ width: "100%" }}>
                  <Option value={"outapp"}>OUTAPP</Option>
                  <Option value={"inapp"}>INAPP</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={6} className="gutter-row ">
              <Form.Item label="Trạng thái" name="enable">
                <div className="text-left">
                  <Switch
                    checked={enable}
                    onChange={(checked) => setEnable(checked)}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>

        <div>
          <MyCard
            title="Danh sách nhà cung cấp"
            bodyStyle={{
              padding: 0,
            }}
            extra={
              <Button onClick={() => setShowAddProviderModal(true)}>
                Thêm mới
              </Button>
            }
          >
            <ListProductProvderConfig
              list={productPaymentMethod?.paymentMethods  ?? []}
              updatePriceOfProvider={updatePriceOfProvider}
            />
          </MyCard>
        </div>
      </MyCard>
      <AddPriceConfigToProductPaymentMethodModal
        onAddProvider={onAddProvider}
        setShowAddProviderModal={setShowAddProviderModal}
        showAddProviderModal={showAddProviderModal}
      />
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
