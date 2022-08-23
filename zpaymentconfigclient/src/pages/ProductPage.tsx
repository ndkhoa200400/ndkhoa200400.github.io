import { Breadcrumb } from "antd";
import { CreateButton } from "components/CreateButton";
import { ProductForm } from "components/ProductForm";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useParams } from "react-router-dom";
import {
  callAPI,
  CallAPIOptionsDefault,
  getOneProduct,
  getProductPaymentMethods,
  updateProductById,
  updateProductPaymentMethod,
} from "utils/api-hepler";
import { ListProductPaymentMethodConfig } from "../components/ListProductPaymentConfig";
import { LoadingFullScreen } from "../components/LoadingFullScreen";
import { MyCard } from "../components/MyCard";
import { IProduct, IProductPaymentMethod } from "../types/type";

export const ProductPage = () => {
  let params = useParams();
  const { appId, groupId, productID } = params;

  const [product, setProduct] = useState<IProduct>();
  const [instruction, setInstruction] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState(EditorState.createEmpty());

  const [productPaymentMethods, setProductPaymentMethod] =
    useState<IProductPaymentMethod[]>();

  const onFinish = async (values: IProduct) => {
    values.enable = product.enable;
    values.instruction = draftToHtml(
      convertToRaw(instruction.getCurrentContent())
    );
    values.description = draftToHtml(
      convertToRaw(description.getCurrentContent())
    );
    callAPI(
      updateProductById,
      [Number(appId), groupId, Number(productID), values],
      setProduct,
      CallAPIOptionsDefault
    );
  };

  useEffect(() => {
    if (appId && groupId && productID) {
      callAPI(
        getOneProduct,
        [Number(appId), groupId, Number(productID)],
        setProduct
      );
    }
  }, [appId, groupId, productID]);

  useEffect(() => {
    if (product && !productPaymentMethods) {
      setInstruction(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(product?.instruction))
        )
      );

      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(product?.description))
        )
      );

      callAPI(
        getProductPaymentMethods,
        [Number(appId), Number(productID)],
        setProductPaymentMethod
      );
    }
  }, [appId, productID, product, productPaymentMethods]);

  let updateProductPaymentMethodById = async (
    methodId: number,
    data: IProductPaymentMethod
  ) => {
    const res = await callAPI(updateProductPaymentMethod, [
      Number(appId),
      groupId,
      Number(productID),
      methodId,
      data,
    ]);
    if (res) {
      await callAPI(
        getProductPaymentMethods,
        [Number(appId), Number(productID)],
        setProductPaymentMethod
      );
    }
  };
  return product ? (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/games">Danh sách game</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products`}>Nhóm sản phẩm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/games/${appId}/group-products/${groupId}`}>
            {groupId}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <div>Sản phẩm {product.productID}</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MyCard title={`Cài đặt sản phẩm ${product.productID}`}>
        <ProductForm
          product={product}
          setProduct={setProduct}
          onFinish={onFinish}
          instruction={instruction}
          setInstruction={setInstruction}

          description={description}
          setDescription={setDescription}
          isEdit={true}
        />

        <div className="mt-3 px-0"></div>
        <CreateButton link="add-payment-method" title="Thêm một phương thức" />
        <MyCard title="Danh sách phương thức thanh toán">
          <ListProductPaymentMethodConfig
            list={productPaymentMethods}
            updateProductPaymentMethodById={updateProductPaymentMethodById}
          />
        </MyCard>
      </MyCard>
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
