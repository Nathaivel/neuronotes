import fetch_notes from "../utils/api";
import { useState, useEffect } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

let reviews = await fetch_notes("reviews/weekly");

function WeeklyStats() {
  let [reviews, setReviews] = useState([
    { name: "Monday", reviews: 0 },
    { name: "Tuesday", reviews: 0 },
    { name: "Wednesday", reviews: 0 },
    { name: "Thursday", reviews: 0 },
    { name: "Friday", reviews: 0 },
    { name: "Saturday", reviews: 0 },
    { name: "Sunday", reviews: 0 },
  ]);
  useEffect(() => {
    fetch_notes("reviews/weekly").then((e) => setReviews(e));
  }, []);

  return (
    <>
      <h1 className="text-xl font-black">Reviews this week</h1>
      <LineChart
        style={{ width: "75%", height: "30%" }}
        responsive
        data={reviews}
      >
        <CartesianGrid stroke="#ebfeff" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis scale={"sequential"} dataKey="reviews" />
        <Line
          type="linear"
          dataKey="reviews"
          stroke="#c1f6ff"
          strokeWidth={2}
        />
      </LineChart>
    </>
  );
}

export default function Dashboard() {
  return (
    <>
      <WeeklyStats />
    </>
  );
}
