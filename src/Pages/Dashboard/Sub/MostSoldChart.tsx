// components/MostSoldChart.tsx
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);


interface MostSoldChartProps {
  view:any;
  setView:any
  data:any;
}

const TabToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  button {
    margin-left: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
    color: #a1a5b7;
    font-weight: 500;
    &.active {
      background: #0057ff;
      color: white;
    }
  }
`;

const MostSoldChart: React.FC<MostSoldChartProps> = ({
  view,
  setView,
  data,
}) => {
 

  const totalTasks = data?.reduce((sum : any, item : any) => sum + item.value, 0);

  const chartData = {
    labels: data?.map((item : any) => item.label),
    datasets: [
      {
        data: data?.map((item : any) => item.value),
        backgroundColor: data?.map((item : any) => item.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <MainContainer>
      <div className="d-flex justify-content-between">
        <div>
          <h5>Top Billed Services</h5>
          {/* <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>More than 1000 new records</p> */}
        </div>
        <TabToggle>
          <div>
            <button
              className={view === "Month" ? "active" : ""}
              onClick={() => setView("Month")}
            >
              Month
            </button>
          </div>
          <div>
            <button
              className={view === "Week" ? "active" : ""}
              onClick={() => setView("Week")}
            >
              Week
            </button>
          </div>
        </TabToggle>
      </div>
      <ChartContainer>
        <div style={{ width: "55%" }}>
          <Doughnut
            data={chartData}
            options={{ cutout: "70%", plugins: { legend: { display: false } } }}
          />
          <TaskDiv>
            <span>{totalTasks} </span>
            <br /> Total Jobs
          </TaskDiv>
        </div>
        <ListContainer>
          {data?.map((item : any, index : number) => (
            <StyledList key={index}>
              <div className="d-flex">
                <Indicator style={{ backgroundColor: item.color }}></Indicator>
                <span>{item.label}</span>
              </div>
              <span style={{ marginLeft: "auto" }}>{item.value}</span>
            </StyledList>
          ))}
        </ListContainer>
      </ChartContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  height:100%;
`;
const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top:10px;
   height:100%;
`;
const TaskDiv = styled.div`
  position: relative;
  top: -180px;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: #a3a3ae;
  span {
    font-size: 45px;
    font-weight: 900;
    color: #3f4254;
  }
`;

const ListContainer = styled.ul`
  margin-left: 2rem;
  list-style: none;
  padding: 1rem;
  width: 45%;
`;
const StyledList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  justify-content: space-between;
`;
const Indicator = styled.li`
  width: 20px;
  height: 5px;
  margin-right: 8px;
  border-radius: 20px;
  margin-top: 5px;
`;
export default MostSoldChart;
