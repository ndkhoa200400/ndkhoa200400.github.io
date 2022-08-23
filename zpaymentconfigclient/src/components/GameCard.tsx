import { Card, Col, Row, Image } from "antd";
import Title from "antd/lib/typography/Title";

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IGame } from "../types/type";

export const GameCard: FC<{
  game: IGame;
}> = ({ game }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable={true}
      className="cursor-pointer"
      onClick={() =>
        navigate(`/games/${game.appId}`, {
          replace: true,
        })
      }
      style={{
        minWidth: "320px"
      }}
    >
      <Row align="middle">
        <Col>
          <Image src={game.logo} height="64px" width="64px"></Image>
        </Col>
        <Col className="ml-3">
          <Row>
            <Title level={4} ellipsis>
              {game.name}
            </Title>
          </Row>
          <Row>AppID: {game.appId}</Row>
        </Col>
      </Row>
    </Card>
  );
};
