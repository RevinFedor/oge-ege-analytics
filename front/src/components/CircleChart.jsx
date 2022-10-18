import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

const CircleChart = (props) => {
  const precent = props.chartPercent;
  const pieChartData = {
    labels: ["2", "3", "4", "5"],

    datasets: [
      {
        data: [precent.item2, precent.item3, precent.item4, precent.item5],
        label: "Infected People",
        backgroundColor: ["#F45520", "#F38704", "#165BAA", "#16BFD6"],
        hoverBackgroundColor: ["#FA8057", "#F9A641", "#4A8BD4", "#4DD7EB"],
      },
    ],
  };
  const pieChart = (
    <Pie
      type="pie"
      width={130}
      height={50}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 3 Months",
          fontSize: 15,
        },
        legend: {
          display: true,
          position: "top",
        },
      }}
      data={pieChartData}
    />
  );

  return (
    <div className="diargams__circle">
      {pieChart}
      <h1 className="diargams__title">Отчет</h1>
      <Link to='/ballsystem' className="diargams__btn">Бальная система</Link>
    </div>
  );
};

export default CircleChart;
