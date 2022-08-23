import { Card } from "antd";
import { CSSProperties, FC, ReactNode } from "react";

export const MyCard: FC<{
  children?: ReactNode;
  title: string;
  className?: string;
  extra?: ReactNode;
  bodyStyle?: CSSProperties;
}> = ({ children, title, className, bodyStyle, extra }) => {
  return (
    <Card
      title={title}
      headStyle={{
        background: "#f7fafc",
        fontSize: "1.2rem",
        textAlign: "left",
        fontWeight: "bold",
      }}
      bodyStyle={bodyStyle}
      className={className}
      extra={extra}
    >
      {children}
    </Card>
  );
};
