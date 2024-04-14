import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "../../services/hooks";
import { SearchFormValues } from "../../utils/types";
import { searchFormSchema } from "../../validations/search-validations";
import { filters } from "../../utils/constants";
import { SEARCH_DELAY_MS } from "../../utils/constants";

import styles from "./search-form.module.css";

const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.movies.request);
  const timerIdRef = useRef<number>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentType, setCurrentType] = useState<{
    value: string;
    label: string;
  }>(filters[0]);
  const { control, register, watch, getFieldState, resetField } =
    useForm<SearchFormValues>({
      defaultValues: {
        keyword: "",
        searchType: "name",
      },
      resolver: yupResolver(searchFormSchema),
    });

  const { searchType, keyword } = watch();

  useEffect(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = undefined;
    }

    if (!getFieldState("keyword").invalid && getFieldState("keyword").isDirty) {
      const id = window.setTimeout(() => {
        let newSearchParams = new URLSearchParams(searchParams.toString());

        if (searchType === "year") {
          if (searchParams.get("year")) {
            newSearchParams.append("year", keyword);
          } else {
            newSearchParams.set("year", keyword);
          }
        } else {
          newSearchParams = new URLSearchParams();

          newSearchParams.set("search", keyword);
        }

        newSearchParams.set("page", "1");
        setSearchParams(newSearchParams);

        resetField("keyword", {
          keepDirty: false,
          keepTouched: false,
          defaultValue: "",
        });
      }, SEARCH_DELAY_MS);
      timerIdRef.current = id;
    }
  }, [dispatch, getFieldState, resetField, keyword, searchType]);

  return (
    <form className={styles.form} noValidate>
      <fieldset className={styles.fieldset}>
        <div className={styles.searchInputContainer}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            className={styles.searchInput}
            id="keyword"
            label={currentType.label}
            variant="standard"
            disabled={isLoading}
            placeholder={
              searchType === "year" ? "Например, 1970 или 1980-1999" : ""
            }
            {...register("keyword")}
          />
        </div>

        <Controller
          control={control}
          name="searchType"
          render={({ field }) => (
            <TextField
              className={styles.dropdownInput}
              id="searchType"
              select
              disabled={isLoading}
              label="Выберите тип поиска"
              variant="filled"
              {...field}
              onChange={(e) => {
                console.log(e.target.value);
                setCurrentType(
                  filters.find((filter) => filter.value === e.target.value) || {
                    label: "",
                    value: "",
                  }
                );
                field.onChange(e);
              }}
            >
              {filters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </fieldset>
    </form>
  );
};

export default SearchForm;
