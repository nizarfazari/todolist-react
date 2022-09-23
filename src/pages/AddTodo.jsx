import React, { useState } from "react";
import { Buttons } from "../components";
import { Form, InputGroup } from "react-bootstrap";
import { FaBook } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/constant";
import axios from "axios";

const AddTodo = (props) => {
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // kalau pakai cara local storage yang nanti di oper ke mainTODO
  // useEffect(() => {
  //   localStorage.setItem("list", JSON.stringify(data));
  // }, [data]);

  // const addTodo = (e) => {
  //   e.preventDefault();

  //   if (!inputData) {
  //   } else {
  //     const datas = {
  //       id: Math.floor(Math.random() * 10000),
  //       text: inputData,
  //       complete: false,
  //     };
  //     setData([...data, datas]);
  //     setInputData("");
  //   }
  // };

  const addTodo = (e) => {
    e.preventDefault();

    if (!inputData) {
      alert("belum measukan data");
    } else if (id) {
      const datas = {
        task: inputData,
      };
      axios
        .put(`${API_URL}/${id}`, datas)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          return err.message;
        });
    } else {
      const datas = {
        id: Math.floor(Math.random() * 10000),
        task: inputData,
        complete: false,
      };
      axios
        .post(API_URL, datas)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          return err.message;
        });
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
              <FaBook className="text-xl fill-white" />
            </InputGroup.Text>
            <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={inputData} placeholder="Input/Edit Todo" />
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
