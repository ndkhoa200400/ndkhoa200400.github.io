import { MyLayout } from "components/MyLayout";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_MENU_OPTIONS, HOME_NAVIGATOR } from "../utils/constants";

export const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getKeyOnPathname = () => {
    if (pathname.includes("games")) return "1";
    if (pathname.includes("payment-methods")) return "2";
    if (pathname.includes("providers")) return "3";
    return "1";
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState(getKeyOnPathname);

  useEffect(() => {
    setSelectedMenuItem(getKeyOnPathname());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onSelect = (select: any) => {
    setSelectedMenuItem(select.key);
    navigate(HOME_NAVIGATOR[select.key]);
  };

  return (
    <MyLayout
      defaultSelectedKeys={[selectedMenuItem]}
      menuOptions={HOME_MENU_OPTIONS}
      selectedKeys={[selectedMenuItem]}
      onSelect={onSelect}
    />
  );
};
