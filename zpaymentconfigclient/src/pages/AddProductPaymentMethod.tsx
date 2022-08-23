import {
  Breadcrumb,
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Switch
} from "antd";
import { LoadingFullScreen } from "components/LoadingFullScreen";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addProductPaymentMethod,
  callAPI,
  getAvailablePaymentMethodsForProduct
} from "utils/api-hepler";
import { getErrorModal } from "utils/error-modal";
import { MyCard } from "../components/MyCard";
import { ICreateProductPaymentMethod, IPaymentMethod } from "../types/type";

const { Option } = Select;
export const AddProductPaymentMethod = () => {
  const params = useParams();

  const { appId, groupId, productID } = params;
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] =
    useState<ICreateProductPaymentMethod>();

  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>();

  const [form] = Form.useForm<ICreateProductPaymentMethod>();
  const [enable, setEnable] = useState(true);
  const onFinish = async (values: ICreateProductPaymentMethod) => {
  console.log('==== ~ onFinish ~ values', values)
    values.enable = enable;
    values.appId = Number(appId);
    values.groupId = groupId;
    values.productID = Number(productID);
    console.log("Success:", values);

    if (values.methodId == null) {
      return getErrorModal({
        content: "Vui lòng chọn phương thức thanh toán",
      });
    }
    try {
      const res = await addProductPaymentMethod(
        Number(appId),
        groupId,
        Number(productID),
        values
      );
      if (res.err >= 0) {
        navigate("../");
      } else {
        getErrorModal({
          content: res.msg,
        });
      }
    } catch (error) {
      getErrorModal({
        content: _.get(error, "message"),
      });
    }
  };

  useEffect(() => {
    if (appId && productID)
      callAPI(
        getAvailablePaymentMethodsForProduct,
        [appId, productID],
        setPaymentMethods
      );
  }, [appId, productID]);

  return paymentMethods ? (
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
          <div>Thêm mới phương thức thanh toán</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Thêm mới phương thức thanh toán">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={paymentMethod}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row text-left">
              <Form.Item label="Tên phương thức" name="methodId" required>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return (
                      option.value
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0 ||
                      option.children
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                  style={{ width: "100%" }}
                  onChange={(value: string) => {
                    setPaymentMethod({
                      ...paymentMethod,
                      methodId: Number(value),
                    });
                  }}
                >
                  {paymentMethods.map((p) => (
                    <Option key={p.id} value={p.id}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12} className="gutter-row ">
              <Form.Item label="Trạng thái" name="enable">
                <div className="text-left">
                  <Switch checked={enable} onChange={() => {
                    setEnable(!enable)
                  }} />
                </div>
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

            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item
                label="Điều kiện hiển thị"
                name="displayConditions"
                initialValue="outapp"
              >
                <Select className="w-100">
                  <Option value={"outapp"}>OUTAPP</Option>
                  <Option value={"inapp"}>INAPP</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </MyCard>
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
