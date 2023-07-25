import React from "react";
import { Box, Label, Select, Options } from "./styled";
const SelectCp = ({ value, onChange, text, categories }) => {
  return (
    <Box>
      <Label>{text}</Label>
      <Select value={value} onChange={onChange}>
        <Options value="" selected hidden>
          Selecionar a categoria
        </Options>
        {categories?.length > 0 &&
          categories.map((c, index) => (
            <React.Fragment key={index}>
              <Options key={index} value={c._id}>
                {c.name.toUpperCase()}
              </Options>
            </React.Fragment>
          ))}
      </Select>
    </Box>
  );
};

export default SelectCp;
