import { List } from "antd";
import { FC, useEffect, useState } from "react";
import { callAPI, getGameList,  } from "utils/api-hepler";
import { AddGameButton } from "components/AddGameButton";
import { GameCard } from "components/GameCard";
import { LoadingFullScreen } from "components/LoadingFullScreen";
import { IGame } from "types/type";

export const ListGamePage: FC = () => {
  const [gameList, setGameList] = useState<IGame[]>();

  useEffect(() => {
 
    callAPI(getGameList, [], setGameList);
  }, []);

  return gameList ? (
    <div>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        dataSource={gameList}
        itemLayout="horizontal"
        rowKey={(record: IGame) => record.appId}
        renderItem={(record) => (
          <List.Item>
            <GameCard game={record} />
          </List.Item>
        )}
      />
      <AddGameButton />
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
