import { Layout, theme, Table, Spin, Modal, Input, Form, Button, Typography } from "antd";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPoints, updatePoints, deletePoints } from "../../../api/pointService";
import AddPoint from "./AddPoint";
import moment from "moment";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Content } = Layout;

const Point = () => {
  const queryClient = useQueryClient();
  const [sortedInfo, setSortedInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const [form] = Form.useForm(); // Create a form instance

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Edit Point Mutation
  const { mutate: editPointMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedPoint) => updatePoints(updatedPoint.id, updatedPoint),
    onSuccess: () => {
      Swal.fire("Success!", "Point updated successfully.", "success");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["points"]);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update the point.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  // Handle delete with confirmation
  const handleDelete = (id, description) => {
    Swal.fire({
      title: `Are you sure you want to delete the point "${description}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePointMutation(id);
      }
    });
  };

  // Mutation to delete point
  const { mutate: deletePointMutation } = useMutation({
    mutationFn: (id) => deletePoints(id),
    onSuccess: () => {
      Swal.fire("Deleted!", "Point has been deleted.", "success");
      queryClient.invalidateQueries(["points"]);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to delete the point.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  // Fetch points
  const {
    data: points,
    isFetching: isFetchingPoints,
    error: pointsError,
  } = useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });

  // Handle loading state
  const isLoading = isFetchingPoints;

  // Handle error for points
  if (pointsError) {
    return <div className="error">Error: Error fetching data</div>;
  }

  // Handle edit button click
  const handleEdit = (point) => {
    setSelectedPoint(point);
    form.setFieldsValue({
      description: point.description,
      point: point.point,
    });
    setIsModalOpen(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = (values) => {
    if (selectedPoint) {
      const updatedPoint = {
        id: selectedPoint.id, // Ensure you include the ID for the update request
        description: values.description,
        point: values.point,
      };
      editPointMutation(updatedPoint);
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Description",
      width: 250,
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortOrder: sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => (
        <Typography.Text style={{ whiteSpace: "normal" }}>{text}</Typography.Text>
      ),
    },
    {
      title: "Points",
      width: 100,
      dataIndex: "point",
      key: "point",
      sorter: (a, b) => a.point - b.point,
      sortOrder: sortedInfo.columnKey === "point" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Created At",
      width: 100,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Updated At",
      width: 100,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === "updatedAt" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      width: 100,
      key: "action",
      render: (_, point) => (
        <div style={{ textAlign: "center" }}>
          <a onClick={() => handleEdit(point)} style={{ marginRight: "8px", color: "blue", fontSize: 18 }}>
            <EditFilled />
          </a>
          <a
            style={{ marginRight: "8px", color: "red" , fontSize: 18 }}
            onClick={() => handleDelete(point.id, point.description)}
          >
            <DeleteFilled />
          </a>
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading} size="large" tip="Loading...">
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <AddPoint />
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1>Point List</h1>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={points}
              onChange={handleChange}
              rowKey="id"
              bordered
              scroll={{
                x: "max-content",
                y: 300,
              }}
            />
          </div>
        </div>

        {/* Edit Point Modal */}
        <Modal
          title="Edit Point"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form} // Bind form instance to Form component
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Points"
              name="point"
              rules={[{ required: true, message: "Please enter the points" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Update Point
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Spin>
  );
};

export default Point;
