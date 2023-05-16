import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const people = props.people;
  const person = people.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(person);
  const [isEditing, setisEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    if (person) {
      setEditForm(person);
      setIsLoading(false); // Set isLoading to false when person is available
    }
  }, [person]);

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm, person._id);
    navigate("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    navigate("/");
  };

  const handleEdit = () => {
    setisEditing((prevState) => !prevState);
  };

  const loaded = () => {
    return (
      <>
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img className="avatar-image" src={person.image} alt={person.name} />
        <button onClick={handleEdit}>{isEditing ? "Cancel Edit" : "Edit"}</button>
        <button onClick={removePerson}>Delete</button>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="person">
      {isLoading ? loading() : loaded()} {/* Display loading or loaded content based on isLoading */}

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
          <input type="submit" value="Update Person" />
        </form>
      )}
    </div>
  );
};

export default Show;
