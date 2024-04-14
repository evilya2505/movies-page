import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { FiltersFormValues, InitialValues } from "../../utils/types";

import styles from "./filter.module.css";

interface IFilterProps {
  id: "ageRating" | "country" | "genre";
  label: string;
  items: InitialValues[];
  register: UseFormRegister<FiltersFormValues>;
  disabled: boolean;
}

const Filter: React.FC<IFilterProps> = ({
  id,
  label,
  items,
  register,
  disabled,
}: IFilterProps) => {
  return (
    <FormControl className={styles.formControl}>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <Select
        {...register(id)}
        labelId={`label-${id}`}
        id={id}
        label={label}
        disabled={disabled}
        defaultValue={"none"}
      >
        <MenuItem value={items[0].slug}>
          <em>{label}</em>
        </MenuItem>
        {items.map((item, index) => {
          if (index !== 0) {
            return (
              <MenuItem key={index} value={item.slug}>
                {item.name}
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default Filter;
