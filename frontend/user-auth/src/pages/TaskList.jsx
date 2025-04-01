import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { API_BASE_URL } from "../services/auth";

export function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // React Router navigation

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                setMessage("You need to log in first.");
                return;
            }
            const response = await fetch(`${API_BASE_URL}/tasks/tasks/`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${accessToken}` },
            });

            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                setMessage(data.detail || "Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Task Fetch Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${API_BASE_URL}/tasks/tasks/${taskId}/delete/`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${accessToken}` },
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== taskId));
                setMessage("Task deleted successfully.");
            } else {
                setMessage("Failed to delete task.");
            }
        } catch (error) {
            console.error("Task Delete Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md">
            {/* Header with Create Task Button */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">Task List</h2>
                <button 
                    onClick={() => navigate("/taskcreate")} 
                    className="btn btn-success"
                >
                    + Create Task
                </button>
            </div>

            {message && <p className="text-red-500">{message}</p>}

            {/* Task List Table */}
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <tr key={task.id} className="border hover:bg-gray-100">
                                <td className="border p-2">{task.title}</td>
                                <td className="border p-2">{task.description}</td>
                                <td className="border p-2">{task.status}</td>
                                <td className="border p-2 flex gap-2">
                                    <button 
                                        onClick={() => navigate(`/edit-task/${task.id}`)} // Navigate to edit page
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(task.id)} 
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border p-2 text-center text-gray-500">
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
