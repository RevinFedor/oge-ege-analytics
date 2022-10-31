import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import CircleChart from "./CircleChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const balls = {
  0: 320,
  2: 32,
  4: 139,
  6: 387,
  8: 37,
  10: 95,
  12: 126,
  14: 236,
  16: 37,
  18: 191,
  20: 358,
  22: 137,
  24: 284,
  26: 101,
  30: 310,
  32: 33,
  34: 118,
  36: 381,
  38: 184,
  40: 99,
  42: 354,
  44: 179,
  46: 60,
  48: 122,
  50: 49,
  52: 193,
  54: 322,
  56: 144,
  58: 312,
  60: 256,
  62: 249,
  64: 98,
  66: 179,
  68: 377,
  70: 321,
  72: 365,
  74: 275,
  76: 370,
  78: 105,
  80: 60,
  82: 44,
  84: 102,
  86: 359,
  88: 387,
  90: 84,
  92: 197,
  94: 80,
  96: 182,
  98: 302,
  100: 188,
};



export function Diagrams() {
  const select = useSelector((state) => state.items?.subject); // получение БД для диаграммы
  const item = useSelector((state) => state.items.selectItems); // текущий предмет

  // показывать ли диаграмму
  let divNone;

  // вертикальная, горизонтальная диаграмма и проценты
  let labels = Object.keys(balls);
  let dataTable = Object.values(balls);
  let chartPercent = { item2: 1, item3: 2, item4: 3, item5: 4 };

  if (select?.message && select?.message.length >= 0) {
    labels = Object.keys(select.message[0]);
    dataTable = Object.values(select.message[0]);

  

    // сумма всех чисел для диаграммы
    const counter = (arr) => {
      let array = arr.reduce((previousValue, el, i, array) => {
        previousValue += el;
        return previousValue;
      });
      return array;
    };

    
    // высчитывание процента
    const itemsSum = counter(dataTable) / 100;

    const itemsTwo = Math.round(
      counter(
        labels.filter((el) => el <= 30).map((el) => select.message[0][el])
      ) / itemsSum
    );
    const itemsThree = Math.round(
      counter(
        labels
          .filter((el) => el >= 30 && el <= 58)
          .map((el) => select.message[0][el])
      ) / itemsSum
    );
    const itemsFour = Math.round(
      counter(
        labels
          .filter((el) => el >= 58 && el < 80)
          .map((el) => select.message[0][el])
      ) / itemsSum
    );
    const itemsFive = Math.round(
      counter(
        labels
          .filter((el) => el   >= 80)
          .map((el) => select.message[0][el])
      ) / itemsSum
    );
    chartPercent = {
      item2: itemsTwo,
      item3: itemsThree,
      item4: itemsFour,
      item5: itemsFive,
    };

    divNone = false;
  } else {
    divNone = false;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: item,
        font: { size: 30 },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "ЕГЭ",
        data: dataTable,
        backgroundColor: "#f45520",
      },
    ],
  };

  return (
    <div className={`diargams ${divNone ? "none" : ""}`}>
      {/* <CircleChart chartPercent={chartPercent} /> */}
      <div className="diargams__graphic">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
