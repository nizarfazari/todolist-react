import React from "react";
import { Button } from "react-bootstrap";
import "./buttons.css";

const Buttons = ({ nama, width, backgroundColor, onClick, type }) => {
  return (
    <Button size="lg" style={{ width, backgroundColor }} onClick={onClick} type={type}>
      {nama}
    </Button>
  );
};

export default Buttons;
