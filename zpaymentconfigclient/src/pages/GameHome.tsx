import { MyLayout } from "components/MyLayout";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GAME_HOME_MENU_OPTIONS,
  GAME_HOME_NAVIGATOR
} from "../utils/constants";

export const GameHome = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getKeyOnPathname = () => {
    console.log(pathname);
    if (pathname.includes("group-products")) return "1";
    if (pathname.includes("products")) return "2";

    return "0";
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState(getKeyOnPathname);

  useEffect(() => {
    setSelectedMenuItem(getKeyOnPathname());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onSelect = (select: any) => {
    setSelectedMenuItem(select.key);
    navigate(GAME_HOME_NAVIGATOR[select.key]);
  };

  return (
    <MyLayout
      defaultSelectedKeys={[selectedMenuItem]}
      menuOptions={GAME_HOME_MENU_OPTIONS}
      selectedKeys={[selectedMenuItem]}
      onSelect={onSelect}
    />
  );
};
