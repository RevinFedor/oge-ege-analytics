import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ballsNull } from "../store/balls";
import { dataAllYearsTwo } from "../store/allYearsTwo";

export const Tables = () => {
  // баллы с хранилища
  let ballsStore = useSelector((state) => state.items.balls?.data?.message);

  // вид таблицы
  let ballsForm = useSelector((state) => state.items.balls?.form);

  // проверка на загрузку данных
  let ballsActual;
  let ballsActualFullYear = dataAllYearsTwo.message;
  if (ballsStore && ballsForm === "allYears") {
    ballsActualFullYear = ballsStore;
    console.log("1");
  }
  if (ballsStore && ballsForm === "balls") {
    ballsActual = ballsStore;
    console.log("2");
  }
  if (ballsForm === "allYears") {
    ballsActual = ballsNull;
    console.log("3");
  }

  // высчитавание общей суммы каждого объекта и процент
  let ballsPrecent = ballsActual.map((el) => {
    let subject = String(Object.keys(el));
    let arrayCurrent = Object.values(Object.values(el)[0]);
    // массив со всеми числами
    let sum = arrayCurrent.reduce((acc, number) => acc + number, 0);
    let arrayTotal = arrayCurrent.map(
      (el) => String(Math.round((el * 100) / sum)) + "%"
    );
    return { [subject]: arrayTotal };
  });

  // переключатель показывающий бальную и обычную систему
  const [toogle, setToogle] = useState("Count");

  let balls;
  const onCountHundler = () => {
    setToogle("Count");
  };
  const onBallsHundler = () => {
    setToogle("Balls");
  };
  if (toogle === "Count") {
    balls = ballsActual;
  } else if (toogle === "Balls") {
    balls = ballsPrecent;
  }

  // таблица по одному году
  const singleYear = balls.map((item) => {
    // предметы и баллы
    let subject = Object.keys(item);
    let balles = Object.values(Object.values(item)[0]);

    return (

        <tr>
          <td>{subject}</td>
          {balles.map((el) => (
            <td>
              {toogle === "Count" ? (
                <div>{el}</div>
              ) : (
                <>
                  <div className="tabel-active" style={{ width: el }}></div>
                  <div>{el}</div>
                </>
              )}
            </td>
          ))}
        </tr>
    
    );
  });

  // таблица все года
  const lebgthYear = Object.keys(ballsActualFullYear);
  const lenghtSub = Object.values(ballsActualFullYear);
  const fullYear = lebgthYear.map((item, i, array) => {
    // выводит год и 7 объектов и название предмета и баллами

    return lenghtSub.map((el, i2) => {
      // все числа
      const filterPrecent = Object.values(el[i]).filter(
        (el) => typeof el === "number"
      );
      // вывод всех предметы
      const arraySubject = Object.values(el[i]).filter(
        (el) => typeof el === "string"
      );

      let sumArrayCount = filterPrecent.reduce(
        (acc, number) => acc + number,
        0
      );
      let precentArray = filterPrecent.map(
        (el) => String(Math.round((el * 100) / sumArrayCount)) + "%"
      );

      return (
          <tr>
            <td>{lebgthYear[i2]}</td>
            {arraySubject.map((el) => {
              return <td className="subject">{el}</td>;
            })}
            {toogle === "Count"
              ? filterPrecent.map((el) => {
                  return <td className="subject">{el}</td>;
                })
              : precentArray.map((el) => {
                  return (
                    <>
                      <td className="subject">
                        <div
                          className="tabel-active"
                          style={{ width: el }}
                        ></div>
                        <div>{el}</div>
                      </td>
                    </>
                  );
                })}
          </tr>
      );
    });
  });

  return (
    <div>
      <div className="tabel__buttons">
        <button
          onClick={onCountHundler}
          disabled={toogle === "Count" ? true : false}
        >
          Числа
        </button>
        <button
          onClick={onBallsHundler}
          disabled={toogle === "Balls" ? true : false}
        >
          Проценты
        </button>
      </div>

      <div className="tabel">
        <table className="content-table">
          <thead>
            <tr>
              {ballsForm === "allYears" ? <th>Года</th> : ""}
              <th>Предметы</th>
              <th className="table-color-1">0-9</th>
              <th className="table-color-1">10-19</th>
              <th className="table-color-1">20-29</th>
              <th className="table-color-2">30-39</th>
              <th className="table-color-2">40-49</th>
              <th className="table-color-2">50-59</th>
              <th className="table-color-3">60-69</th>
              <th className="table-color-3">70-79</th>
              <th className="table-color-3">80-89</th>
              <th className="table-color-4">90-99</th>
              <th className="table-color-4">100</th>
            </tr>
          </thead>
          {ballsForm === "allYears" ? (
            <tbody className="even-toogle">{fullYear}</tbody>
          ) : (
            <tbody>{singleYear}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};
