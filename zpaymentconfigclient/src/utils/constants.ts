import { IconMenu } from "components/IconMenu";

export const HOME_MENU_OPTIONS = [
  { label: "Danh sách game", key: "1", icon: IconMenu("/static/icon/game.png") }, // remember to pass the key prop
  { label: "Phương thức thanh toán", key: "2", icon: IconMenu("/static/icon/payment.png") },
  { label: "Nhà cung cấp", key: "3", icon: IconMenu("/static/icon/provider.png") },
];

export const HOME_NAVIGATOR = {
  "1": "/games",
  "2": "/payment-methods",
  "3": "/providers",
};

export const GAME_HOME_MENU_OPTIONS = [
  { label: "Game", key: "0", icon: IconMenu("/static/icon/game.png") },
  { label: "Nhóm sản phẩm", key: "1" , icon: IconMenu("/static/icon/group-product.png")},
  {
    label: "Danh sách sản phẩm",
    key: "2",
    icon: IconMenu("/static/icon/product.png")
  },
];

export const GAME_HOME_NAVIGATOR = {
  "0": "",
  "1": "group-products",
  "2": "products",
};
