import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";

const breadcrumbNameMap = {
  "/dashboard": "Dashboard",
  "/admin-management": "Dashboard > Admin Management",
  "/counselor-management": "Dashboard > Counselor Management",
  "/manage-category": "Dashboard > Assessment Management > Manage Category",
  "/manage-question": "Dashboard > Assessment Management > Manage Question",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Map breadcrumbs to the items array for Ant Design's Breadcrumb
  const breadcrumbItems = pathSnippets.map((_, index, arr) => {
    const url = `/${arr.slice(0, index + 1).join("/")}`;
    return {
      title: index === pathSnippets.length - 1 ? (
        breadcrumbNameMap[url] || "Unknown"
      ) : (
        <Link to={url}>{breadcrumbNameMap[url] || "Unknown"}</Link>
      ),
      key: url,
    };
  });

  return (
    <Breadcrumb
      className="custom-breadcrumb"
      style={{ marginTop: 25, marginLeft: 25 }}
      items={breadcrumbItems} // Use the items prop to pass breadcrumbs
    />
  );
};

export default Breadcrumbs;
