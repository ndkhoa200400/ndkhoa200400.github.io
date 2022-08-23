import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select
} from "antd";
import _ from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyCard } from "../components/MyCard";
import { IPaymentMethod } from "../types/type";
import { createPaymentMethod } from "../utils/api-hepler";
import { getErrorModal } from "../utils/error-modal";
const { Option } = Select;
export const CreatePaymentMethodPage = () => {
  const navigate = useNavigate();
  // const appId = null;

  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>();

  const [form] = Form.useForm<IPaymentMethod>();
  const onFinish = async (values: IPaymentMethod) => {
    console.log("Success:", values);

    try {
      const res = await createPaymentMethod(values);
      if (res.data) {
        alert("Success");
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
    setPaymentMethod(values);
  };

  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/payment-methods">Danh sách phương thức thanh toán</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <div>Tạo mới</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Tạo mới">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={paymentMethod}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item
                label="ID"
                name="id"
                className="w-100"
                hasFeedback
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập ID!",
                  },
                ]}
              >
                <InputNumber className="w-100" />
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
                  // defaultValue={paymentMethod.type}
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
  );
};
