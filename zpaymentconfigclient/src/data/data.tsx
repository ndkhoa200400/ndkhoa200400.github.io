import {
  IPaymentMethod,
  IProductPaymentMethod,
  IProvider,
  IGame,
  IGroupProduct,
} from "../types/type";



export const paymentMethods: IPaymentMethod[] = [
  {
    id: 5,
    name: "E-Wallet",
    desc: "",
    type: "e-wallet",
    logo: null,
  },
  {
    id: 2,
    name: "SMS",
    desc: "Tỉ lệ quy đổi point tùy theo nhà mạng",
    type: "sms",
    logo: null,
  },
  {
    id: 0,
    name: "Credit Card",
    desc: "Tỉ lệ quy đổi point tùy theo nhà mạng",
    type: "credit",
    logo: null,
  },
];
export const providers: IProvider[] = [
  {
    provideId: "CC",
    provideName: "Thẻ tín dụng",
    desc: "",
  },
  {
    provideId: "38",
    provideName: "ZaloPay",
    desc: "",
  },
  {
    provideId: "ABB",
    provideName: "Ngân hàng TMCP An Bình (ABB)",
    desc: "",
  },
];

export const games: IGame[] = [
  {
    appId: 199450332601884030,
    name: "VLTK H5",
    background: "http://photo.gamecenter.zdn.vn/45782",
    banner1: "https://photo.gamecenter.zdn.vn/44136",
    banner2: "https://photo.gamecenter.zdn.vn/44135",
    logo: "https://zalo.vltkh5.zing.vn/login/static/media/vltk-logo.00c1713b.png",
  },
  {
    appId: 2538253094251826700,
    name: "VLTK H5 DEV",
    background: "http://photo.gamecenter.zdn.vn/45782",
    banner1: "https://photo.gamecenter.zdn.vn/44136",
    banner2: "https://photo.gamecenter.zdn.vn/44135",
    logo: "https://logo.zp.zdn.vn/app/d816b3248f61663f3f70_2_1.jpg",
  },
];

export const productPaymentMethods: Record<string, IProductPaymentMethod[]> = {
  "1003": [
    {
      id: 0,
      name: "E-Wallet",
      desc: "",
      type: "e-wallet",
      enable: true,
      order: 1,
      paymentMethods: [
        {
          provideId: "ABB",
          provideName: "Ngân hàng TMCP An Bình (ABB)",
          desc: "",
          amount: 11000,
          enable: true,
        },
        {
          provideId: "CC",
          provideName: "Thẻ tín dụng",
          desc: "",
          amount: 11000,
          enable: true,
        },
      ],
      displayConditions: "outapp",
    },
    {
      id: 0,
      name: "Credit Card",
      desc: "Tỉ lệ quy đổi point tùy theo nhà mạng",
      type: "credit",
      enable: true,
      paymentMethods: null,
      order: 2,
      displayConditions: "outapp",
    },
    {
      id: 0,
      name: "SMS",
      desc: "Tỉ lệ quy đổi point tùy theo nhà mạng",
      type: "sms",
      enable: true,
      paymentMethods: [
        {
          provideId: "38",
          provideName: "ZaloPay",
          desc: "",
          amount: 11000,
          enable: true,
        },
        {
          provideId: "CC",
          provideName: "Thẻ tín dụng",
          desc: "",
          amount: 11000,
          enable: true,
        },
        {
          provideId: "ABB",
          provideName: "Ngân hàng TMCP An Bình (ABB)",
          desc: "",
          amount: 11000,
          enable: true,
        },
      ],
      displayConditions: "outapp",
      order: 3,
    },
  ],
};

window["paymentMethods"] = paymentMethods;
window["providers"] = providers;
window["games"] = games;
