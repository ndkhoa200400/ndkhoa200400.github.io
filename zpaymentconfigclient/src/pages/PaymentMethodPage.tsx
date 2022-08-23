import { Breadcrumb, Button, Col, Form, Input, Row, Select } from "antd";
import { LoadingFullScreen } from "components/LoadingFullScreen";
import { MyCard } from "components/MyCard";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPaymentMethod } from "types/type";
import {
  callAPI,
  getPaymentMethodById,
  updatePaymentMethod
} from "utils/api-hepler";
import { getSuccessModal } from "utils/success-modal";
const { Option } = Select;
export const PaymentMethodPage = () => {
  let params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>();

  useEffect(() => {
    if (id) {
      callAPI(getPaymentMethodById, [Number(id)], setPaymentMethod);
    }
  }, [id]);

  const [form] = Form.useForm<IPaymentMethod>();
  const onFinish = (values: IPaymentMethod) => {
    callAPI(updatePaymentMethod, [id, values], setPaymentMethod, {
      onDone: () => {
        getSuccessModal({
          content: "Cập nhật thành công",
          onDone: () => navigate("../"),
        });
      },
    });

    setPaymentMethod(values);
  };

  return paymentMethod ? (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/payment-methods">Danh sách phương thức thanh toán</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <div>Chi tiết</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Cài đặt">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={paymentMethod}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="ID" name="id">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="Tên phương thức thanh toán" name="name">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="Mô tả" name="desc">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12} className="gutter-row text-left">
              <Form.Item label="Loại phương thức" name="type">
                <Select
                  style={{ width: "100%" }}
                  defaultValue={paymentMethod.type}
                  onChange={(value: string) => {
                    setPaymentMethod({
                      ...paymentMethod,
                      type: value,
                    });
                  }}
                >
                  <Option value="sms">SMS</Option>
                  <Option value="card">Card điện thoại</Option>
                  <Option value="e-wallet">Ví điện tử</Option>
                  <Option value="credit">Credit Card</Option>
                  <Option value="bank">Ngân hàng</Option>
                  <Option value="google-play">Google Play</Option>
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
