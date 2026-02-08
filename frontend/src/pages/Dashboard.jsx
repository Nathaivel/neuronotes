import fetch_notes from "../utils/api";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

let reviews = await fetch_notes("reviews/weekly");

function WeeklyStats() {
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
        <YAxis dataKey="reviews" />
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
