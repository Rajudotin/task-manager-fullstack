import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/tasks/${editingId}`, { title, description });
    setEditingId(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="danger" onClick={logout}>
          Logout
        </button>
      </div>

      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="task-form"
      >
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="primary" type="submit">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(task)}
              >
                Update
              </button>
              <button
                className="danger"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;