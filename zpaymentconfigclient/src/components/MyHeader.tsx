import { Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import { CSSProperties, useContext } from "react";
import { ProfileContextType } from "store/context-types/ProfileContextType";
import { ProfileContext } from "store/contexts/ProfileContext";
import { LoadingFullScreen } from "./LoadingFullScreen";
import { MyTitle } from "./MyTitle";

const style: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  zIndex: 1000,
  width: "100%",
};

export const MyHeader = () => {
  const { profile } = useContext(ProfileContext) as ProfileContextType;
  return (
    <Header style={style}>
      <MyTitle />
      <div className="ant-card-hoverable text-right px-5">
        {profile ? (
          <>
            <Avatar src={profile?.avatar}></Avatar>
            <span className="text-white"> {profile?.name}</span>
          </>
        ) : (
          <>
            <LoadingFullScreen />
          </>
        )}
      </div>
    </Header>
  );
};
