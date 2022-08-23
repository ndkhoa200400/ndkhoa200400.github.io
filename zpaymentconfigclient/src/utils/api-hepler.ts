import _ from "lodash";
import { get, post, TAPIResponse } from "../api/api";
import {
  IAddProductPricing,
  ICreateProductPaymentMethod,
  IGame,
  IGroupProduct,
  IPaymentMethod,
  IProduct,
  IProductByAppId,
  IProductPaymentMethod,
  IProfile,
  IProvider,
} from "../types/type";
import { getErrorModal } from "./error-modal";
import { getSuccessModal } from "./success-modal";
import { login } from "./zgs-helpder";

export interface CallAPIOptions {
  onDone?: CallableFunction;
  onError?: () => any;
}

export const CallAPIOptionsDefault: CallAPIOptions = {
  onDone: () => {
    getSuccessModal();
  },
};

export async function callAPI<T>(
  callback: (...params) => Promise<TAPIResponse<T>>,
  params: any,
  setDataFunction?: CallableFunction,
  options?: CallAPIOptions
) {
  const zgsk = localStorage.getItem("zgsk");
  let nTry = 1;
  if (!zgsk) {
    getErrorModal({
      content: "Vui lòng đăng nhập",
    });
    window.location.href = "error";
    return;
  }
  while (nTry < 3) {
    try {
      const res = await callback(...params);

      if (res.err >= 0) {
        if (setDataFunction) setDataFunction(res.data);
        if (options) {
          if (options.onDone) {
            options.onDone();
          }
        }

        return res.data;
      } else {
        if (res.err === -2) {
          getErrorModal({
            content: res.msg,
            onOK: () => {
              window.location.href = `/error?code=${res.err}`;
            },
          });
          return null;
        } else if (res.err === -3) {
          await login();
          nTry++;
          if (nTry === 3) {
            getErrorModal({
              content: res.msg,
              onOK: () => {
                window.location.href = `/error?code=${res.err}`;
              },
            });
            return null;
          }
        } else {
          getErrorModal({
            content: res.msg,
            onOK: options?.onError ?? undefined,
          });
          return null
        }
      }
    } catch (error) {
      getErrorModal({
        content: _.get(error, "message", "Lỗi"),
        onOK: options?.onError ?? undefined,
      });
      return null;
    }
  }
  if (nTry === 3) {
    getErrorModal({
      content: "Lỗi đã xảy ra",
      onOK: options?.onError ?? undefined,
    });
    return null;
  }
}

export async function getGameList() {
  return get<IGame[]>("games");
}

export async function createNewGame(data: IGame) {
  return post<IGame>("games", data);
}

export async function getGameById(appId: number) {
  return get<IGame>(`games/${appId}`);
}

export async function updateGame(appId: number, data: IGame) {
  return post<IGame>(`games/${appId}`, data);
}

export async function getPaymentMethodList() {
  return get<IPaymentMethod[]>("payment-methods");
}

export async function getPaymentMethodById(id: number) {
  return get<IPaymentMethod>(`payment-methods/${id}`);
}
export async function createPaymentMethod(data: IPaymentMethod) {
  return post<IPaymentMethod>("payment-methods", data);
}

export async function updatePaymentMethod(id: number, data: IPaymentMethod) {
  return post<IPaymentMethod>(`payment-methods/${id}`, data);
}

export async function getProviderList() {
  return get<IProvider[]>("providers");
}

export async function getProviderById(id: string) {
  return get<IProvider>(`providers/${id}`);
}
export async function updateProviderById(id: string, data: IProvider) {
  return post<IProvider>(`providers/${id}`, data);
}

export async function createProvider(data: IProvider) {
  return post<IProvider>(`providers`, data);
}

export async function getGroupProductsByAppId(appId: number) {
  return get<IGroupProduct[]>(`games/${appId}/group-products`);
}
export async function getOneGroupProductByAppId(
  appId: number,
  groupId: string
) {
  return get<IGroupProduct>(`games/${appId}/group-products/${groupId}`);
}
export async function addGroupProductToGame(data: IGroupProduct) {
  return post<IGroupProduct>(`group-products`, data);
}
export async function addProductToGroupProduct(
  appId: number,
  groupId: string,
  data: IProduct
) {
  return post<IProduct>(
    `games/${appId}/group-products/${groupId}/products`,
    data
  );
}

export async function getOneProduct(
  appId: number,
  groupId: string,
  productId: number
) {
  return get<IProduct>(
    `games/${appId}/group-products/${groupId}/products/${productId}`
  );
}

export async function updateProductById(
  appId: number,
  groupId: string,
  productId: number,
  data: Partial<IProduct>
) {
  return post<IProduct>(
    `games/${appId}/group-products/${groupId}/products/${productId}`,
    data
  );
}

export async function getProductPaymentMethods(
  appId: number,
  productId: number
) {
  return get<IProductPaymentMethod[]>(
    `games/${appId}/products/${productId}/payment-methods`
  );
}

export async function addProductPaymentMethod(
  appId: number,
  groupId: string,
  productId: number,
  data: ICreateProductPaymentMethod
) {
  return post<IProductPaymentMethod>(
    `games/${appId}/group-products/${groupId}/products/${productId}/payment-methods`,
    data
  );
}

export async function getOneProductPaymentMethod(
  appId: number,
  productId: number,
  methodId: number
) {
  return get<IProductPaymentMethod>(
    `games/${appId}/products/${productId}/payment-methods/${methodId}`
  );
}

export async function updateProductPaymentMethod(
  appId: number,
  groupId: string,
  productId: number,
  methodId: number,
  data: Partial<IProductPaymentMethod>
) {
  return post<IProductPaymentMethod>(
    `games/${appId}/group-products/${groupId}/products/${productId}/payment-methods/${methodId}`,
    data
  );
}

export async function addPriceConfigToProductPaymentMethod(
  appId: number,
  groupId: string,
  productId: number,
  methodId: number,
  data: Partial<IAddProductPricing>
) {
  return post<IAddProductPricing>(
    `games/${appId}/group-products/${groupId}/products/${productId}/payment-methods/${methodId}/add`,
    data
  );
}

export async function updatePriceConfigToProductPaymentMethod(
  appId: number,
  groupId: string,
  productId: number,
  methodId: number,
  provideId: string,
  data: Partial<IAddProductPricing>
) {
  return post<IAddProductPricing>(
    `games/${appId}/group-products/${groupId}/products/${productId}/payment-methods/${methodId}/${provideId}`,
    data
  );
}

export async function getListProductByAppid(appId: number) {
  return get<IProductByAppId[]>(`games/${appId}/products`);
}

export async function getAvailablePaymentMethodsForProduct(
  appId: number,
  productId: number
) {
  return get<IPaymentMethod[]>(`payment-methods/products`, {
    appId,
    productId,
  });
}

export async function getAvailableProvidersForProduct(
  appId: number,
  productId: number
) {
  return get<IPaymentMethod[]>(`providers/products`, {
    appId,
    productId,
  });
}

export async function getProfile() {
  return get<IProfile>(`profile`, {
    zgsk: localStorage.getItem("zgsk"),
  });
}
