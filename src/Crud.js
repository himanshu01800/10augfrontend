import React, { useState, useEffect } from "react";
import axios from "axios";

const CRUD = () => {
  // Separate states for each input field
  const [name, setName] = useState("");
  const [numberOfTeacher, setNumberOfTeacher] = useState("");
  const [monitorName, setMonitorName] = useState("");
  const [numberOfStudent, setNumberOfStudent] = useState("");
  const [standeredList, setStanderedList] = useState([]);
  const [editId, setEditId] = useState(null); // For tracking the entity being edited

  // Fetch all Standered entities from the backend
  const fetchStandered = () => {
    axios.get("http://localhost:8080/standered")
      .then(response => setStanderedList(response.data))
      .catch(error => console.error("There was an error fetching the standered list!", error));
  };

  // Handle form submission for creating/updating an entity
  const handleSubmit = (e) => {
    e.preventDefault();

    const standered = {
      id: editId,  // Include the editId in the body if it's an update
      name,
      numberOfTeacher,
      monitorName,
      numberOfStudent,
    };

    if (editId) {
      // Update existing standered, passing id in the body
      axios.put("http://localhost:8080/standered", standered)
        .then(() => {
          fetchStandered();
          resetForm();
        })
        .catch(error => console.error("There was an error updating the standered!", error));
    } else {
      // Create new standered
      axios.post("http://localhost:8080/standered", standered)
        .then(() => {
          fetchStandered();
          resetForm();
        })
        .catch(error => console.error("There was an error creating the standered!", error));
    }
  };

  // Edit an entity
  const handleEdit = (standered) => {
    setEditId(standered.id);
    setName(standered.name);
    setNumberOfTeacher(standered.numberOfTeacher);
    setMonitorName(standered.monitorName);
    setNumberOfStudent(standered.numberOfStudent);
  };

  // Delete an entity
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/standered/${id}`)
      .then(() => fetchStandered())
      .catch(error => console.error("There was an error deleting the standered!", error));
  };

  // Reset the form fields
  const resetForm = () => {
    setEditId(null);
    setName("");
    setNumberOfTeacher("");
    setMonitorName("");
    setNumberOfStudent("");
  };

  // Fetch entities when the component mounts
  useEffect(() => {
    fetchStandered();
  }, []);

  return (
    <div>
      <h2>Standered Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={numberOfTeacher}
          onChange={(e) => setNumberOfTeacher(e.target.value)}
          placeholder="Number of Teachers"
          required
        />
        <input
          type="text"
          value={monitorName}
          onChange={(e) => setMonitorName(e.target.value)}
          placeholder="Monitor Name"
          required
        />
        <input
          type="number"
          value={numberOfStudent}
          onChange={(e) => setNumberOfStudent(e.target.value)}
          placeholder="Number of Students"
          required
        />
        <button type="submit">
          {editId ? "Update Standered" : "Create Standered"}
        </button>
      </form>

      <h3>Standered List</h3>
      <ul>
        {standeredList.map((standered) => (
          <li key={standered.id}>
            {standered.name} - {standered.numberOfTeacher} Teachers, {standered.monitorName}, {standered.numberOfStudent} Students
            <button onClick={() => handleEdit(standered)}>Edit</button>
            <button onClick={() => handleDelete(standered.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUD;
