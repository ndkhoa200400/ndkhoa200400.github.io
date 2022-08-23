import { Spin } from "antd";

export const LoadingFullScreen = () => {
  return (
    <div className="w-100 h-100 d-flex justify-center align-center">
      <Spin size="large"></Spin>
    </div>
  );
};
