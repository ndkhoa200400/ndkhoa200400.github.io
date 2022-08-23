import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { LoadingFullScreen } from "components/LoadingFullScreen";
import { MyCard } from "components/MyCard";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProvider } from "types/type";
import { callAPI, getProviderById, updateProviderById } from "utils/api-hepler";
import { getSuccessModal } from "utils/success-modal";
export const ProviderPage = () => {
  let params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [provider, setProvider] = useState<IProvider>();

  const [form] = Form.useForm<IProvider>();
  const onFinish = async (values: IProvider) => {
    callAPI(updateProviderById, [id, values], setProvider, {
      onDone: () => {
        getSuccessModal({
          content: "Cập nhật thành công",
          onDone: () => navigate("../"),
        });
      },
    });
  };

  useEffect(() => {
    if (id) {
      callAPI(getProviderById, [id], setProvider);
    }
  }, [id]);

  return provider ? (
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
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={provider}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="ID" name="provideId">
                <Input disabled />
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
  ) : (
    <LoadingFullScreen />
  );
};
