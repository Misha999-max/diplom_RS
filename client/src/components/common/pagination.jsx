import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";

const TablePaginationDemo = ({ tasks, handleSliceTasks }) => {
  const [value, setvalue] = useState();
  const handleChangePage = (value) => {
    setvalue(value);
  };
  return (
    <Container>
      <Pagination
        count={Math.ceil(tasks.length / 4)}
        onChange={handleChangePage}
        onClick={(event) => handleSliceTasks(event.target.textContent)}
      />
    </Container>
  );
};

export default TablePaginationDemo;
