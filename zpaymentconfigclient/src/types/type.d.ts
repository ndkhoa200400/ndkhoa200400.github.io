export interface IGame {
  appId: number;
  name: string;
  banner1?: string;
  banner2?: string;
  background?: string;
  logo?: string;
}

export interface IGroupProduct {
  groupId: string;
  groupName: string;
  products?: Record<string, IProduct>;
}

export interface IProduct {
  description: string;
  image: string;
  instruction: string;
  price: number;
  productID: number;
  productName: string;
  enable: boolean;
  iapImage?: string;
  groupId?: string
}

export interface IProductByAppId extends IProduct{
  groupId: string
  groupName: string 
  appId: number
}

export interface IPaymentMethod {
  id: number;
  name: string;
  desc: string;
  type: string;
  logo?: string;
}

export interface IProvider {
  provideId: string;
  provideName: string;
  desc: string;
}

export interface IProductPricing extends IProvider {
  amount: number;

  enable: boolean;
}

export interface IProductPaymentMethod extends IPaymentMethod {
  enable: boolean;
  order: number;
  paymentMethods: IProductPricing[];
  displayConditions: TDisplayCondition;
}
export type TDisplayCondition = "outapp" | "inapp";

export interface ICreateProductPaymentMethod {
  appId: number;
  groupId: string;
  productID: number;
  methodId: number;
  enable: boolean;
  order: number;
  displayConditions: TDisplayCondition;
}

export interface IAddProductPricing {
  provideId: string;
  amount: number;
  enable: boolean;
}


export interface IProfile {
  id: int 
  name: string 
  avatar: string
}