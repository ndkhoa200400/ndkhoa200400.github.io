import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callAPI, createProvider } from "utils/api-hepler";
import { MyCard } from "../components/MyCard";
import { IProvider } from "../types/type";
export const CreateProviderPage = () => {
  const navigate = useNavigate();

  // const appId = null;

  const [form] = Form.useForm<IProvider>();
  const onFinish = (values: IProvider) => {
    console.log("Success:", values);
    callAPI(createProvider, [values], null, {
      onDone: () => {
        navigate("../");
      },
    });
  };

  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/providers">Danh sách nhà cung cấp</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <div>Chi tiết</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Cài đặt">
        <Form layout="vertical" form={form} onFinish={onFinish} size="middle">
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="ID" name="provideId">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="Tên nhà cung cấp" name="provideName">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} className="gutter-row">
              <Form.Item label="Mô tả" name="desc">
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
      </MyCard>
    </div>
  );
};
