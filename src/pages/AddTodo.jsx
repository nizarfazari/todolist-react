import React, { useEffect, useState } from "react";
import { Buttons } from "../components";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const AddTodo = (props) => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(data));
  }, [data]);

  const addTodo = (e) => {
    e.preventDefault();

    if (!inputData) {
    } else {
      const datas = {
        id: Math.floor(Math.random() * 10000),
        text: inputData,
        complete: false,
      };
      setData([...data, datas]);
      setInputData("");
    }
  };

  const change = (e) => {
    setInputData(e.target.value);
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-3 text-center">TodoInput</h1>
      <div className="container border-solid grid border-solid border-2 p-4">
        <Form onSubmit={addTodo}>
          <InputGroup className="mb-3" onChange={(e) => change(e)}>
            <InputGroup.Text id="inputGroup-sizing-default" style={{ backgroundColor: "#16A3B5" }}>
              <FaSearch className="text-xl fill-white" />
            </InputGroup.Text>
            <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={inputData} />
          </InputGroup>
          <div className="d-grid">
            <Buttons nama="Submit" backgroundColor="#16A3B5" />
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddTodo;
