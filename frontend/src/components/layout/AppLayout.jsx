import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { App, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const sidebarItems = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "Users",
  },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, whiteSpace: "nowrap" }}>
            MERN App
          </span>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["/"]}
              style={{ height: "100%", borderInlineEnd: 0 }}
              items={sidebarItems}
              onClick={({ key }) => navigate(key)}
            />
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </App>
  );
};

export default AppLayout;
