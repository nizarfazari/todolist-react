import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../components";

const getLocalItems = () => {
  let arr = localStorage.getItem("list");
  if (arr) {
    return JSON.parse(arr);
  } else {
    return [];
  }
};

const MainTodo = () => {
  // const [complete, setComplete] = useState(null);
  const [data, setData] = useState(getLocalItems());
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   let arr = localStorage.getItem("list");
  //   if (arr) {
  //     let datas = JSON.parse(arr);
  //     setData(datas);
  //   }
  // }, []);

  const checkdata = (bool) => {
    const dones = data.filter((todo) => todo.complete === bool);
    console.log(dones);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const removeTodo = (id) => {
    const removeArr = data.filter((todo) => todo.id !== id);

    setData(removeArr);
  };

  const removeAll = (a) => {
    setData([]);
  };

  const completeTodo = (id) => {
    let updatedTodos = data.map((todo) => {
      if (todo.id === id) {
        //klick 1 true ke 2 false
        todo.complete = todo.complete = !todo.complete;
      }
      console.log(todo.complete);
      return todo;
    });
    setData(updatedTodos);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-3">TodoSeacrh</h1>
      <div className="container border-solid grid border-solid border-2 p-4" style={{ gridTemplateColumns: "60% 40%" }}>
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
        <div className="column-right flex items-end justify-end">
          <div className="button ">
            <Buttons nama="Add new Task" backgroundColor="#16A3B5" width="300px" onClick={() => navigate("/add-todo")} />
          </div>
        </div>
      </div>
      <div className="container px-0">
        <h2 className="my-3">TodoList</h2>
        <div className=" flex  gap-x-10 justify-between mb-5">
          <Buttons nama="All" backgroundColor="#16A3B5" width="400px" />
          <Buttons nama="Done" backgroundColor="#16A3B5" width="400px" onClick={() => checkdata(true)} />
          <Buttons nama="Todo" backgroundColor="#16A3B5" width="400px" onClick={() => checkdata(false)} />
        </div>

        {data
          ? data.map((i) => {
              return (
                <div className={`labels border-2 flex justify-between p-3 my-4 ${i.complete ? "complete" : ""} `}>
                  <div className="text">{i.text}</div>
                  <div className="icons flex">
                    <input type="checkbox" className="icon" onClick={() => completeTodo(i.id)} />
                    <MdEdit className="icon edit" />
                    <MdDelete className="icon delete" onClick={() => removeTodo(i.id)} />
                  </div>
                </div>
              );
            })
          : "Data Koosng"}

        <div className="buttons flex justify-between  gap-x-5">
          <Buttons nama="Delete done task" backgroundColor="#D93649" width="600px" />
          <Buttons nama="Delete all task" backgroundColor="#D93649" width="600px" type="submit" onClick={() => removeAll("asdas")} />
        </div>
      </div>
    </div>
  );
};

export default MainTodo;
