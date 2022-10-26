import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetch,
  fetchBalls,
  fetchBallsYears,
  fetchData,
  selectItems,
  uodateForm,
} from "../features/itemSlice";

export const SelectTable = () => {
  // Выбор по селектору
  const [mynicipal, setselectMun] = useState("");
  const [schools, setselectShool] = useState("");
  const [year, setselectYear] = useState("");

  // School
  const select = useSelector((state) => state.items.select);

  const ballsError = useSelector((state) => state.items.balls?.error);

  const dispatch = useDispatch();

  // получение списка муниципалитетов и школ
  useEffect(() => {
    dispatch(fetch());
  }, []);

  // отправка select
  const hundler = () => {
    // в зависимости от года
    if (year === "Все года") {
      dispatch(fetchBallsYears({ mynicipal, schools }));
      console.log({ mynicipal, schools });
      return;
    }

    const data = { mynicipal, schools, year };
    dispatch(fetchBalls(data));
  };

  const years = [2019, 2020, 2021, 2022, 2022, 2023, 2024, 2025, "Все года"];

  return (
    <>
      <div className="select__errors">{ballsError}</div>
      <div className={`select `}>
        <div className="select__wrapper">
          <select
            className="select__items"
            onChange={(e) => setselectMun(e.target.value)}
          >
            <option>Муниципалитет</option>
            <option>Оренбург</option>
          </select>
        </div>
        <div className="select__wrapper">
          <select onChange={(e) => setselectShool(e.target.value)}>
            <option>Образовательное учреждение</option>
            {select?.message?.map((el) => {
              return <option key={el.schools}>{el.schools}</option>;
            })}
          </select>
        </div>
        <div className="select__wrapper">
          <select onChange={(e) => setselectYear(e.target.value)}>
            <option>Год</option>
            {years.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </div>
        <button className="select__button" onClick={hundler}>
          Показать отчет
        </button>
      </div>
    </>
  );
};
