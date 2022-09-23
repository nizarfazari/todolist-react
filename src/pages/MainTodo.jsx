import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../components";
import { API_URL } from "../utils/constant";

const MainTodo = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempData] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  //kalau pakek local storage yang nanti di masukan ke dalam state
  // useEffect(() => {
  //   let arr = localStorage.getItem("list");
  //   if (arr) {
  //     let datas = JSON.parse(arr);
  //     setData(datas);
  //   }
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const datas = await axios.get(`${API_URL}`);
      setData(datas.data);
      setTempData(datas.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkdata = (bool) => {
    const dones = tempdata.filter((todo) => todo.complete === bool);
    setData(dones);
  };

  const filterSearch = async (e) => {
    setInput(e.target.value);
    const a = tempdata.filter((e) => {
      if (input === "") {
        return e;
      } else if (e.task.toLowerCase().includes(input.toLowerCase())) {
        return e;
      }
    });
    setData(a);
  };

  const removeTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then((res) => {
      getData();
    });
    //kalo pakek state dengan cara di bawah ini
    // const removeArr = data.filter((todo) => todo.id !== id);
  };

  const removeAll = (a) => {
    if (a === true) {
      return data
        .filter((a) => a.complete === true)
        .map((i) => {
          return axios
            .delete(`${API_URL}/${i.id}`)
            .then((res) => {
              getData();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      //kalo pakek state dengan cara di bawah ini
      // setData(hasil);
    } else {
      return data.map((i) => {
        return axios.delete(`${API_URL}/${i.id}`).then((res) => {
          getData();
        });
      });
      //kalo pakek state dengan cara di bawah ini
      // setData([]);
    }
  };

  const completeTodo = (id) => {
    data.map((todo) => {
      if (todo.id === id) {
        //klick 1 true ke 2 false
        todo.complete = todo.complete = !todo.complete;
        axios
          .put(`${API_URL}/${id}`, todo)
          .then((res) => {
            getData();
          })
          .catch((err) => {
            return err.message;
          });
      }
      console.log(todo);
      // return todo;
    });
    //kalo pakek state dengan cara di bawah ini
    // setData(updatedTodos);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-3">TodoSeacrh</h1>
      <div className="container border-solid grid border-solid border-2 p-4" style={{ gridTemplateColumns: "60% 40%" }}>
        <div className="column-left">
          <InputGroup className="mb-3" onChange={(e) => filterSearch(e)}>
            <InputGroup.Text id="inputGroup-sizing-default" style={{ backgroundColor: "#16A3B5" }}>
              <FaSearch className="text-xl fill-white" />
            </InputGroup.Text>
            <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={input} placeholder="Search Todo" />
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
          <Buttons nama="All" backgroundColor="#16A3B5" width="400px" onClick={() => setData(tempdata)} />
          <Buttons nama="Done" backgroundColor="#16A3B5" width="400px" onClick={() => checkdata(true)} />
          <Buttons nama="Todo" backgroundColor="#16A3B5" width="400px" onClick={() => checkdata(false)} />
        </div>

        {data
          ? data.map((i) => {
              return (
                <div className={`labels border-2 flex justify-between p-3 my-4 ${i.complete ? "complete" : ""} `} key={i.id}>
                  <div className="text">{i.task}</div>
                  <div className="icons flex">
                    {console.log(i.complete)}
                    {i.complete ? <input type="checkbox" checked className="icon checkbox" onClick={(e) => completeTodo(i.id)} /> : <input type="checkbox" className="icon checkbox" onClick={(e) => completeTodo(i.id)} />}
                    <MdEdit className="icon edit" onClick={() => navigate(`/edit-todo/${i.id}`)} />
                    <MdDelete className="icon delete" onClick={() => removeTodo(i.id)} />
                  </div>
                </div>
              );
            })
          : "Data Koosng"}

        <div className="buttons flex justify-between  gap-x-5">
          <Buttons nama="Delete done task" backgroundColor="#D93649" width="600px" onClick={() => removeAll(true)} />
          <Buttons nama="Delete all task" backgroundColor="#D93649" width="600px" type="submit" onClick={() => removeAll()} />
        </div>
      </div>
    </div>
  );
};

export default MainTodo;
