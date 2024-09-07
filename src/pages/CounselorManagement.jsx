import { Layout, theme } from "antd";
const {  Content } = Layout;

const CounselorManagement = () => {

    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  

  return (
    <>

        {/* Content */}
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({
                length: 100,
              })
            }
          </div>
        </Content>
        {/* End Content */}

  </>
  )
}

export default CounselorManagement