import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../services/auth";

export function TaskUpdate() {
    const { taskId } = useParams(); // Get task ID from URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTaskDetails();
    }, []);

    const fetchTaskDetails = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${API_BASE_URL}/tasks/tasks/${taskId}/`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${accessToken}` },
            });

            const data = await response.json();
            if (response.ok) {
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            } else {
                setMessage(data.detail || "Failed to load task details.");
            }
        } catch (error) {
            console.error("Task Fetch Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${API_BASE_URL}/tasks/tasks/${taskId}/update/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ title, description, status }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Task updated successfully!");
                navigate("/"); // Redirect to task list
            } else {
                setMessage(data.detail || "Failed to update task.");
            }
        } catch (error) {
            console.error("Task Update Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto border rounded bg-white shadow-md">
            <h2 className="text-lg font-bold mb-3">Edit Task</h2>
            {message && <p className="text-red-500">{message}</p>}

            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Update Task
                </button>
            </form>
        </div>
    );
}
