import Title from "antd/lib/typography/Title";
import { useNavigate } from "react-router-dom";

export const MyTitle = () => {
  const navigate = useNavigate();
  return (
    <div className="logo">
      <Title
        level={2}
        ellipsis
        style={{
          margin: "1rem auto",

          background: " linear-gradient(to right, #ee9ca7, #ffdde1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        onClick={() =>
          navigate("/", {
            replace: true,
          })
        }
        className="cursor-pointer"
      >
        ZStudio
      </Title>
    </div>
  );
};
