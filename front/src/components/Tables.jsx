import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ballsNull } from "../store/balls";

export const Tables = () => {
  let ballsStore = useSelector((state) => state.items.balls?.data?.message);


  // проверка на загрузку данных
  let ballsActual;
  if (ballsStore) {
    ballsActual = ballsStore;
  } else {
    ballsActual = ballsNull;
  }


  // высчитавание общей суммы каждого объекта и процент
  let ballsPrecent = ballsActual.map((el) => {
    let subject = String(Object.keys(el));
    let arrayCurrent = Object.values(Object.values(el)[0]);
    let sum = arrayCurrent.reduce((acc, number) => acc + number, 0);
    let arrayTotal = arrayCurrent.map(
      (el) => String(Math.round((el * 100) / sum)) + "%"
    );
    return { [subject]: arrayTotal };
  });

  // переключатель показывающий бальную и обычную систему
  const [toogle1, setToogle1] = useState(true);
  const [toogle2, setToogle2] = useState(false);
  let balls;
  const onClickHundler = () => {
    setToogle1(true);
    setToogle2(false);
  };
  const onDisabledHundler = () => {
    setToogle1(false);
    setToogle2(true);
  };
  if (toogle1) {
    balls = ballsActual;
  } else {
    balls = ballsPrecent;
  }

  return (
    <div className="">
      <div className="tabel__buttons">
        <button onClick={onClickHundler} disabled={toogle1}>
          Числа
        </button>
        <button onClick={onDisabledHundler} disabled={toogle2}>
          Проценты
        </button>
      </div>

      <div className="tabel">
        <table className="content-table">
          <thead>
            <tr>
              <th>Предметы</th>
              <th>0-9</th>
              <th>10-19</th>
              <th>20-29</th>
              <th>30-39</th>
              <th>40-49</th>
              <th>50-59</th>
              <th>60-69</th>
              <th>70-79</th>
              <th>80-89</th>
              <th>90-99</th>
              <th>100</th>
            </tr>
          </thead>
          {balls.map((item) => {
            // предметы и баллы
            let subject = Object.keys(item);
            let balles = Object.values(Object.values(item)[0]);

            return (
              <tbody>
                <tr>
                  <td>{subject}</td>
                  {balles.map((el) => (
                    <td>
                      {toogle1 ? (
                        <div>{el}</div>
                      ) : (
                        <>
                          <div
                            className="tabel-active"
                            style={{ width: el }}
                          ></div>
                          <div>{el}</div>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
