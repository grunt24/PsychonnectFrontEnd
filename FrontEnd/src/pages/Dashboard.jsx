import { Layout, theme, Card, Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/questionService";
import { getCategories } from "../api/categoryService";
import { getLogs } from "../api/logService";
import { Column } from "@ant-design/charts";

import {
  UserOutlined,
  TeamOutlined,
  TagOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const Dashboard = () => {
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

  // Fetch logs data
  const {
    data: logs,
    isFetching: isFetchingLogs,
    error: logsError,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
  });

  if (questionsError || categoriesError || logsError) {
    return <div className="error">Error: Error fetching data</div>;
  }

  const totalQuestions = questions?.length || 0;
  const totalCategories = categories?.length || 0;

  // Data for the chart
  const chartData = [
    { type: "Total Categories", value: totalCategories },
    { type: "Total Questions", value: totalQuestions },
  ];

  // Chart configuration for the main chart
  const config = {
    data: chartData,
    xField: "type",
    yField: "value",
    colorField: "type",
    label: {
      position: "middle",
    },
    height: 350,
    width: 300,
  };

  return (
    <>
      <Row
        style={{ textAlign: "center", justifyContent: "center" }}
        gutter={[16, 16]} // Adjust spacing between columns
      >
        {/* Existing cards */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              fontSize: "13px",
              backgroundColor: "rgb(0, 121, 107)",
              color: "yellow",
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
                <UserOutlined style={{ fontSize: "40px", color: "yellow" }} />
              </div>
            }
          >
            <div>
              <h4 style={{ margin: 0, color: "yellow" }}>Total Admin</h4>
              <p>10</p>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              fontSize: "13px",
              backgroundColor: "rgb(0, 121, 107)",
              color: "yellow",
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
                <TeamOutlined style={{ fontSize: "40px", color: "yellow" }} />
              </div>
            }
          >
            <div>
              <h4 style={{ margin: 0 }}>Total Counselor</h4>
              <p>2</p>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              fontSize: "13px",
              backgroundColor: "rgb(0, 121, 107)",
              color: "yellow",
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
                <TagOutlined style={{ fontSize: "40px", color: "yellow" }} />
              </div>
            }
          >
            <div>
              <h4 style={{ margin: 0 }}>Total Category</h4>
              <p>{isFetchingCategories ? "Loading..." : totalCategories}</p>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              fontSize: "13px",
              backgroundColor: "#00796b",
              color: "yellow",
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

      {/* Content */}
      <Content
        style={{
          marginTop: "20px",
          overflow: "initial",
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Chart */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              style={{
                width: "100%",
                background: colorBgContainer,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
              }}
            >
              <Column {...config} />
            </div>
          </Col>

          {/* Logs Card */}
          <Col xs={24} sm={24} md={12} lg={12} >
            <Card
              style={{
                fontSize: "13px",
                backgroundColor: colorBgContainer,
                color: "#333",
                // border: "1px solid #ccc", // Make border more visible
                overflowY: "auto",
                maxHeight: "358px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
              title="Logs"
            >
              {isFetchingLogs ? (
                <p>Loading logs...</p>
              ) : (
                logs?.map((log, index) => (
                  <Card
                    key={index}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      
                    }}
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
                          style={{ fontSize: "30px", marginLeft: "40px" }}
                        />
                      </div>
                    }
                  >
                    <div>
                      <strong>{log.userName}</strong>: {log.description}
                      <br />
                      <span style={{ fontSize: "12px", color: "#888" }}>
                        {log.createdAt}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Dashboard;
