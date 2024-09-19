import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo() {
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEvent = (e) => {
        setInput(e.target.value);
    };

    const handleTask = () => {
        if (input.trim() !== "") {
            if (isEditing && editIndex !== null) {
                // If in edit mode, update the list
                const updatedList = list.map((item, i) =>
                    i === editIndex ? input : item
                );
                setList(updatedList);
                setEditIndex(null);
                setIsEditing(false);
            } else {
                setList([...list, input]);
            }
            setInput(""); // Clear the input field after adding the task
        }
    };

    const handleEdit = (index) => {
        setInput(list[index]); // Set the input field to the value of the task being edited
        setEditIndex(index); // Set the index of the task being edited
        setIsEditing(true); // Toggle to editing mode
    };

    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index); // Filter out the item at the given index
        setList(newList); // Update the list with the new array
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Todo App</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex mb-3">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={input}
                            onChange={handleEvent}
                            placeholder="Add task"
                        />
                        <button
                            className={`btn ${isEditing ? "btn-warning" : "btn-primary"} btn-sm`}
                            onClick={handleTask}
                        >
                            {isEditing ? "Update" : "Add"}
                        </button>
                    </div>
                    <ul className="list-group">
                        {list.map((item, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                {item}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(i)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(i)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Todo;
