import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch, fetchData, selectItems } from "../features/itemSlice";

export const Select = () => {
  // Выбор по селектору
  const [mynicipal, setselectMun] = useState("");
  const [schools, setselectShool] = useState("");
  const [year, setselectYear] = useState("");
  const [item, setselectItem] = useState("");

  const select = useSelector((state) => state.items.select);
  const error = useSelector((state) => state.items.subject?.error);

  const dispatch = useDispatch();

  const hundler = () => {
    const data = { mynicipal, schools, year, item };

    dispatch(selectItems(data));
    dispatch(fetchData(data));
  };

  // получение списка муниципалитетов и школ
  useEffect(() => {
    dispatch(fetch());
  }, []);

  const years = [2019, 2020, 2021, 2022];
  const studies = [
    "Русский язык",
    "Математика профильная",
    "ИКТ",
    "Английский язык",
    "Физика",
    "Химия",
    "Биология",
    "История",
    "Обществознание",
    "Литература",
    "География",
    "Немецкий язык",
  ];

  return (
    <>
      <div className="select__errors">{error}</div>
      <div className={`select `}>
        <div className="select__wrapper">
          <select onChange={(e) => setselectMun(e.target.value)}>
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
        <div className="select__wrapper">
          <select onChange={(e) => setselectItem(e.target.value)}>
            <option>Предметы</option>
            {studies.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>{" "}
        </div>
        <button onClick={hundler}>Найти</button>
      </div>
    </>
  );
};
