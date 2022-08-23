import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { CreateButton } from "components/CreateButton";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addGroupProductToGame, callAPI } from "utils/api-hepler";
import { LoadingFullScreen } from "../components/LoadingFullScreen";
import { MyCard } from "../components/MyCard";
import { IGroupProduct } from "../types/type";

export const CreateGroupProductPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { appId } = params;
  const [form] = Form.useForm<IGroupProduct>();
  const onFinish = (
    values: IGroupProduct & {
      appId: number;
    }
  ) => {
    values.products = values.products ?? {};
    values.appId = Number(appId);
    callAPI(addGroupProductToGame, [values], null, {
      onDone: () => navigate("../group-products"),
    });
  };
  const data: IGroupProduct | undefined = {
    groupId: "",
    groupName: "",
    products: {},
  };
  return data ? (
    <div className="">
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products`}>Nhóm sản phẩm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <div>Tạo nhóm sản phẩm</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title="Tạo nhóm sản phẩm">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={data}
          size="middle"
        >
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="ID nhóm sản phẩm" name="groupId">
                <Input />
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
        <CreateButton link="create-product" />
        {/* <MyCard
          title="Danh sách sản phẩm"
          bodyStyle={{
            padding: 0,
          }}
        >
          <ListProduct list={data.products} />
        </MyCard> */}
      </MyCard>
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
