import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodo from "./pages/AddTodo";
import MainTodo from "./pages/MainTodo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTodo />}></Route>
          <Route path="/add-todo" element={<AddTodo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
