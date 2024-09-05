import { Layout, theme, Card, Col, Row } from "antd";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/questionService";
import { getCategories } from "../api/categoryService";
import { Column } from "@ant-design/charts";
import {
  UserOutlined,
  TeamOutlined,
  TagOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const Dashboard = () => {
  // const [ setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Fetch total number of questions
  const {
    data: questions,
    isFetching: isFetchingQuestions,
    error: questionsError,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  // Fetch total number of categories
  const {
    data: categories,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (questionsError || categoriesError) {
    return <div className="error">Error: Error fetching data</div>;
  }

  const totalQuestions = questions?.length || 0;
  const totalCategories = categories?.length || 0;

  // Data for the chart
  const chartData = [
    { type: "Total Categories", value: totalCategories },
    { type: "Total Questions", value: totalQuestions },
  ];

  // Chart configuration
  const config = {
    data: chartData,
    xField: "type",
    yField: "value",
    colorField: "type",
    label: {
      position: "middle",
    },
    height: 300, // Set chart height here
    width: 300, // Set chart width here
  };

  return (
    <>
          <Row
            style={{ textAlign: "center", justifyContent: "space-evenly" }}
            gutter={28}
          >
            <Col span={5}>
              <Card
                style={{
                  fontSize: "15px",
                  backgroundColor: "#00796b",
                  color: "yellow",
                  boxShadow:
                    "3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "0",
                }}
                bordered={false}
                cover={
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UserOutlined
                      style={{ fontSize: "40px", color: "yellow" }}
                    />
                  </div>
                }
              >
                <div>
                  <h4 style={{ margin: 0, color: "yellow"}}>Total Admin</h4>
                  <p>10</p>
                </div>
              </Card>
            </Col>

            <Col span={5}>
              <Card
                style={{
                  fontSize: "15px",
                  backgroundColor: "#00796b",
                  color: "yellow",
                  boxShadow:
                    "3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "0",

                }}
                bordered={false}
                cover={
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TeamOutlined
                      style={{ fontSize: "40px", color: "yellow" }}
                    />
                  </div>
                }
              >
                <div>
                  <h4 style={{ margin: 0 }}>Total Counselor</h4>
                  <p>2</p>
                </div>
              </Card>
            </Col>

            <Col span={5}>
              <Card
                style={{
                  fontSize: "15px",
                  backgroundColor: "#00796b",
                  color: "yellow",
                  boxShadow:
                    "3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "0",

                }}
                bordered={false}
                cover={
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TagOutlined
                      style={{ fontSize: "40px", color: "yellow" }}
                    />
                  </div>
                }
              >
                <div>
                  <h4 style={{ margin: 0 }}>Total Category</h4>
                  <p>{isFetchingCategories ? "Loading..." : totalCategories}</p>
                </div>
              </Card>
            </Col>

            <Col span={5}>
              <Card
                style={{
                  fontSize: "15px",
                  backgroundColor: "#00796b",
                  color: "yellow",
                  boxShadow:
                    "3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "0",

                }}
                bordered={false}
                cover={
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <QuestionCircleOutlined
                      style={{ fontSize: "40px", color: "yellow" }}
                    />
                  </div>
                }
              >
                <div>
                  <h4 style={{ margin: 0 }}>Total Questions</h4>
                  <p>{isFetchingQuestions ? "Loading..." : totalQuestions}</p>
                </div>
              </Card>
            </Col>
          </Row>
          {/* End Card */}

          {/* Content */}
          <Content
            style={{
              margin: "20px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              style={{
                width: "40%",
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                // borderRadius: borderRadiusLG,
                boxShadow:
                "3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Column {...config} />
            </div>
          </Content>

    </>
  );
};

export default Dashboard;
