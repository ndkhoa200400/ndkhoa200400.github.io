import { Button } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const CreateButton: FC<{
  link: string;
  title?: string;
}> = ({ link, title }) => {
  const navigate = useNavigate();
  return (
    <div className="w-100 text-right my-3">
      <Button
        className="ml-auto"
        onClick={() => {
          navigate(link);
        }}
      >
        {title || "Tạo mới"}
      </Button>
    </div>
  );
};
