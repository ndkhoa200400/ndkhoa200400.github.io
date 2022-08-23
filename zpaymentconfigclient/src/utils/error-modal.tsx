import { Modal } from "antd";

export const getErrorModal = (props: {
  title?: string;
  content: string;
  onOK?: () => any;
}) => {
  let { title, content, onOK } = props;
  title = title ?? "Đã có lỗi xảy ra";

  Modal.error({
    title: title,
    content: (
      <div
        style={{
          fontSize: "1.2rem",
        }}
      >
        <p>{content}</p>
      </div>
    ),
    closable: true,
    onOk: onOK,
    okType: "danger",
  });
};
