import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IGame } from "../types/type";
import { callAPI, createNewGame } from "../utils/api-hepler";

export const CreateGamePage = () => {
  const [game, setGame] = useState<IGame>({
    appId: 0,
    name: "",
    background: "",
    banner1: "",
    banner2: "",
    logo: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm<IGame>();
  const onFinish = async (values: IGame) => {
    callAPI(createNewGame, [values], null, {
      onDone: () => navigate("../"),
    });
  };

  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <div>Tạo mới Game</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="Tạo mới"
        headStyle={{
          background: "#f7fafc",
          fontSize: "1.2rem",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish} size="middle">
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item
                label="ID ứng dụng"
                name="appId"
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập APP ID!",
                  },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12} className="gutter-row">
              <Form.Item label="Tên hiển thị" name="name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className=" mt-4 gutter-row">
              <Form.Item label="Link Logo" name="logo">
                <Input
                  onChange={(e) => {
                    setGame({
                      ...game,
                      logo: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <div
                style={{
                  textAlign: "left",
                }}
              >
                {game.logo ? (
                  <Image src={game.logo} height="128px"></Image>
                ) : null}
              </div>
            </Col>

            <Col xs={24} lg={12} className="gutter-row mt-4">
              <Form.Item label="Link Background" name="background">
                <Input
                  onChange={(e) => {
                    setGame({
                      ...game,
                      background: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <div
                style={{
                  textAlign: "left",
                }}
              >
                {game.background ? (
                  <Image src={game.background} height="128px"></Image>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row className="mt-4" gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} lg={12} className="gutter-row mt-4">
              <Form.Item label="Link Banner 1" name="banner1">
                <Input
                  onChange={(e) => {
                    setGame({
                      ...game,
                      banner1: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <div
                style={{
                  textAlign: "left",
                }}
              >
                {game.banner1 ? (
                  <Image src={game.banner1} height="128px"></Image>
                ) : null}
              </div>
            </Col>

            <Col xs={24} lg={12} className="gutter-row mt-4">
              <Form.Item label="Link Banner 2" name="banner2">
                <Input
                  onChange={(e) => {
                    setGame({
                      ...game,
                      banner2: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <div
                style={{
                  textAlign: "left",
                }}
              >
                {game.banner2 ? (
                  <Image src={game.banner2} height="128px"></Image>
                ) : null}
              </div>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
