import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Buttons from "../Button/Buttons";

const TodoForm = (props) => {
  const [data, setData] = useState("");

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: data,
    });
    setData("");
  };
  return (
    <div className="column-left">
      <InputGroup className="mb-3" onChange={(e) => handleChange(e)}>
        <InputGroup.Text id="inputGroup-sizing-default" style={{ backgroundColor: "#16A3B5" }}>
          <FaSearch className="text-xl fill-white" />
        </InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
      </InputGroup>
      <div className="d-grid">
        <Buttons nama="Search" backgroundColor="#16A3B5" />
      </div>
    </div>
  );
};

export default TodoForm;
