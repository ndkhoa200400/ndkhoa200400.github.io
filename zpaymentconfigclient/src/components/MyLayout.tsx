import { Layout, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { MyFooter } from "./MyFooter";
import { MyHeader } from "./MyHeader";
const { Sider, Content } = Layout;

export const MyLayout: FC<{
  defaultSelectedKeys: string[];
  selectedKeys: string[];
  onSelect: (select: any) => void;
  menuOptions: ItemType[];
}> = ({ defaultSelectedKeys, selectedKeys, onSelect, menuOptions }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MyHeader />

      <Layout className="site-layout">
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={defaultSelectedKeys}
            selectedKeys={selectedKeys}
            mode="inline"
            onClick={onSelect}
            items={menuOptions}
            // itemIcon={menuOptions}
          ></Menu>
        </Sider>
        <Content
          style={{
            marginLeft: collapsed ? "116px" : "216px",
            marginRight: "16px",
            marginTop: " 72px",
            marginBottom: " 72px",
            transition: "ease 0.2s",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <MyFooter />
    </Layout>
  );
};
