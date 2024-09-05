import { Layout} from "antd";
import { useState } from "react";

import Logo from "../layouts/Logo";
import MenuList from "../layouts/MenuList";

const { Sider} = Layout;


const Sidebar = () => {
  const [collapsed] = useState(false);
  return (
    <Sider
    collapsed={collapsed}
    collapsible
    trigger={null}
    className="sidebar"
    width={280}
  >
    <Logo />
    <MenuList />
  </Sider>
  )
}

export default Sidebar