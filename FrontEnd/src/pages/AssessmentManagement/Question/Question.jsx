import { Layout, theme, Table, Spin, Modal, Input, Form, Button, Select, Typography } from "antd";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuestions, updateQuestion, deleteQuestion } from "../../../api/questionService";
import { getCategories } from "../../../api/categoryService";
import AddQuestion from "./AddQuestion";
import moment from "moment";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Content } = Layout;
const { Option } = Select;

const Question = () => {
  const queryClient = useQueryClient();
  const [sortedInfo, setSortedInfo] = useState({});
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Edit Question Mutation
  const { mutate: editQuestionMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedQuestion) => updateQuestion(selectedQuestion.id, updatedQuestion),
    onSuccess: () => {
      Swal.fire("Success!", "Question updated successfully.", "success");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update the question.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

 // Handle delete with confirmation
 const handleDelete = (id, questionText) => {
  Swal.fire({
    title: `Are you sure you want to delete the question "${questionText}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteQuestionMutation(id);
    }
  });
};

  // Mutation to delete question
  const { mutate: deleteQuestionMutation } = useMutation({
    mutationFn: (id) => deleteQuestion(id),
    onSuccess: () => {
      Swal.fire("Deleted!", "Question has been deleted.", "success");
      queryClient.invalidateQueries(["questions"]); // Refresh categories after deletion
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to delete the question.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });



  // Fetch questions
  const {
    data: questions,
    isFetching: isFetchingQuestions,
    error: questionsError,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  // Fetch categories to map categoryId to categoryName
  const {
    data: categories,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Generate filter options based on categories
  useEffect(() => {
    if (categories) {
      const filters = categories.map((category) => ({
        text: category.categoryName,
        value: category.id,
      }));
      setCategoryFilters(filters);
    }
  }, [categories]);

  // Handle loading state
  const isLoading = isFetchingQuestions || isFetchingCategories;

  // Handle error for questions and categories
  if (questionsError || categoriesError) {
    return <div className="error">Error: Error fetching data</div>;
  }

  // Create a map of categoryId to categoryName
  const categoryMap = categories?.reduce((map, category) => {
    map[category.id] = category.categoryName;
    return map;
  }, {});

  // Format questions data to replace categoryId with categoryName
  const formattedQuestions = questions?.map((question) => ({
    ...question,
    categoryName: categoryMap?.[question.categoryId] || "Unknown Category",
  }));

  // Handle edit button click
  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setQuestionText(question.questionText);
    setCategoryId(question.categoryId);
    setIsModalOpen(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = (values) => {
    if (selectedQuestion) {
      const updatedQuestion = {
        questionText: values.questionText,
        categoryId: values.categoryId,
      };
      editQuestionMutation(updatedQuestion);
    }
  };

  // Define table columns with dynamic filters
  const columns = [
    {
      title: "Question",
      width: 250,
      dataIndex: "questionText",
      key: "questionText",
      sorter: (a, b) => a.questionText.localeCompare(b.questionText),
      sortOrder: sortedInfo.columnKey === "questionText" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => (
        <Typography.Text style={{ whiteSpace: "normal" }}>{text}</Typography.Text>
      ),
    },
    {
      title: "Category",
      width: 100,
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      sortOrder: sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
      ellipsis: true,
      filters: categoryFilters,
      onFilter: (value, record) => record.categoryId === value,

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
      render: (_, question) => (
        <div style={{ textAlign: "center" }}>
          <a onClick={() => handleEdit(question)} style={{ marginRight: "8px", color: "blue", fontSize: 18 }}>
            <EditFilled />
          </a>
          <a
            style={{ marginRight: "8px", color: "red" , fontSize: 18 }}
            onClick={() => handleDelete(question.id, question.questionText)}
          >
            <DeleteFilled />
          </a>
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading} size="large" tip="Loading... ">
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <AddQuestion />
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1>Question List</h1>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={formattedQuestions}
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

        {/* Edit Question Modal */}
        <Modal
          title="Edit Question"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            initialValues={{
              questionText,
              categoryId,
            }}
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Question Text"
              name="questionText"
              rules={[{ required: true, message: "Please enter the question text" }]}
            >
              <Input value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                value={categoryId}
                onChange={(value) => setCategoryId(value)}
              >
                {categories?.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Update Question
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      
    </Spin>
  );
};

export default Question;
