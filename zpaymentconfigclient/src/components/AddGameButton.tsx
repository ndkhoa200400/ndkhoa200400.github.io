import { PlusOutlined } from "@ant-design/icons";
import { Card, Row } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
export const AddGameButton: FC = () => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable={true}
      className="cursor-pointer"
      onClick={() => navigate(`/games/create-game`)}
      style={{
        width: 64,
        height: 64,
      }}
    >
      <Row align="middle" title="CREATE">
        <PlusOutlined />
      </Row>
    </Card>
  );
};
