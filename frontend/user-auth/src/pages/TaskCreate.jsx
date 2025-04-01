import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { API_BASE_URL } from "../services/auth";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export function TaskCreate({ refreshTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // React Router navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${API_BASE_URL}/tasks/tasks/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ title, description, status }),
            });

            const data = await response.json();
            console.log("Response Data:", data);

            if (response.ok) {
                setMessage("Task created successfully!");
                setTitle("");
                setDescription("");
                setStatus("pending"); // Reset to default

                refreshTasks?.(); // Refresh tasks if function exists

                setTimeout(() => {
                    setMessage("");
                    navigate("/"); // Redirect to home page
                }, 100); // Redirect after 1 second
            } else {
                setMessage(data.detail || "Failed to create task");
            }
        } catch (error) {
            console.error("Task Creation Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="card shadow-sm border-0 p-4 mb-4">
            <h2 className="card-title text-center mb-3">Create New Task</h2>
            {message && <p className="text-danger text-center">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div className="d-flex gap-3">
                        <label className="form-check-label">
                            <input
                                type="radio"
                                value="pending"
                                checked={status === "pending"}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-check-input"
                            /> Pending
                        </label>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                value="completed"
                                checked={status === "completed"}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-check-input"
                            /> Completed
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!title.trim() || !description.trim()}
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}
