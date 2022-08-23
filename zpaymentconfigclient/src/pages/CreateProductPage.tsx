import { Breadcrumb, Card, Modal } from "antd";
import { ProductForm } from "components/ProductForm";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addProductToGroupProduct, callAPI } from "utils/api-hepler";
import { LoadingFullScreen } from "../components/LoadingFullScreen";
import { IProduct } from "../types/type";
export const CreateProductPage = () => {
  let params = useParams();
  const { appId, groupId } = params;
  // const appId = null;
  const navigate = useNavigate();
  const data: IProduct = {
    image: "",
    productID: 0,
    enable: true,
    instruction: "",
    price: 0,
    description: "",
    productName: "",
  };
  const [product, setProduct] = useState(data);

  const [instruction, setInstruction] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState(EditorState.createEmpty());

  const onFinish = async (values: IProduct) => {
    values.instruction = draftToHtml(
      convertToRaw(instruction.getCurrentContent())
    );
    values.description = draftToHtml(
      convertToRaw(description.getCurrentContent())
    );
    callAPI(
      addProductToGroupProduct,
      [Number(appId), groupId, values],
      setProduct,
      {
        onDone: () => {
          Modal.success({
            content: "Tạo mới thành công",
            afterClose() {
              navigate("../");
            },
          });
        },
      }
    );
  };

  return appId ? (
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
          <div>Tạo sản phẩm</div>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="Tạo sản phẩm"
        headStyle={{
          background: "#f7fafc",
          fontSize: "1.2rem",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        <ProductForm
          product={product}
          setProduct={setProduct}
          onFinish={onFinish}
          instruction={instruction}
          setInstruction={setInstruction}
          description={description}
          setDescription={setDescription}
        />
      </Card>
    </div>
  ) : (
    <LoadingFullScreen />
  );
};
