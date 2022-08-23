import { Modal } from "antd";

export const getSuccessModal = (
  props: {
    title?: string;
    content?: string;

    onDone?: () => void;
  } = {}
) => {
  let { content, title, onDone } = props;

  Modal.success({
    content: content || "Cập nhật thành công",
    title,
    onOk: onDone,
  });
};
