import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const API_URL = "https://team-task-manager-production-0f6b.up.railway.app";

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: {
          Authorization: token
        }
      });

      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setTasks([]);
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      setTasks([]);
    }
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/tasks`,
        {
          title,
          description,
          project: "69fef9abf5759c4da72b6fab"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Task Created");

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {
      alert("Error creating task");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <button
        onClick={logoutUser}
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button
          onClick={createTask}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Create Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;