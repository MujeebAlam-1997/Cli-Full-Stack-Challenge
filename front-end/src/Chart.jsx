import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

  function getRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }
  
  // Generate and log 5 random colors
  for (let i = 0; i < 5; i++) {
    const randomColor = getRandomColor();
    console.log(randomColor);
  }
const Chart = ({data}) => {
    const columns=Object.keys(data[0]);
    const colors=columns.map(col=>getRandomColor())
    return (
        <LineChart
      width={1000}
      height={600}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date"   minTickGap={30} allowDuplicatedCategory={false} hide={true}  />
      <YAxis dataKey="Price" type="number"  domain={['dataMin', 'dataMax']} hide={true}/>
      <Tooltip />
      <Legend />
    {
    columns.map((col,idx)=>
    <Line key={col} type="monotone" dataKey={col} stroke={colors[idx]} dot={false}/>)}

    {/* <Line type="monotone" dataKey="High" stroke="#82ca9d" dot={false}/>
    <Line type="monotone" dataKey="Low" stroke="#ffc658" dot={false}/>
    <Line type="monotone" dataKey="Vol." stroke="#ff7300" dot={false}/>
    <Line type="monotone" dataKey="Change %" stroke="#0088FE" dot={false}/>  */}
    </LineChart>
    );
}

export default Chart;
