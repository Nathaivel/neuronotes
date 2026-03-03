import { useEffect, useState } from "react";
import fetch_notes from "../utils/api";

import {
  AreaChart, Area,
  CartesianGrid, XAxis, YAxis,
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#c1f6ff", "#6ee7ff", "#3b82f6", "#1e40af"];

function get_total_weekly_reviews(weekly){
  let total = 0;
  for (let day of weekly){
    total += day.reviews;
  }
  return total
}

function notes_this_week(notes){
  let total = 0;
  return total
}

export default function Dashboard() {

  const [weeklyData, setWeeklyData] = useState([
    { name: "Monday", reviews: 0 },
    { name: "Tuesday", reviews: 0 },
    { name: "Wednesday", reviews: 0 },
    { name: "Thursday", reviews: 0 },
    { name: "Friday", reviews: 0 },
    { name: "Saturday", reviews: 0 },
    { name: "Sunday", reviews: 0 },
  ]);

  const [stats,setStats] = useState({"total_notes": 0,"notes_this_week": 0,"total_words": 0})
  const [pieData,setPieData] = useState([])

  useEffect(() => {
    fetch_notes("reviews/weekly").then((data) => {
      if (data) {
        setWeeklyData(data);
      }
    });

     fetch_notes("stats/").then((data) => {
      if (data) {
        setStats(data);
      }
    });

    fetch_notes("reviews/pernote").then((data) => {
      if (data) {
        setPieData(data);
      }
    });


    
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-sub">Your weekly overview</p>
        </div>
        <div className="dashboard-sub">Mar 03 – Mar 10</div>
      </div>

      {/* KPI Cards (unchanged) */}
      <div className="kpi-grid">
        <KpiCard label="Total Notes" value={stats.total_notes} change="+12%" />
        <KpiCard label="Notes This Week" value={stats.notes_this_week} change="+3%" />
        <KpiCard label="Words Written" value={stats.total_words} change="+8%" />
        <KpiCard label="Reviews Done" value={get_total_weekly_reviews(weeklyData)} change="+1%" />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        
        {/* Weekly Reviews Card — NOW FUNCTIONAL */}
        <div className="chart-card">
          <h2>Reviews This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c1f6ff" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#c1f6ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <XAxis dataKey="name" stroke="#6b9db3" />
              <YAxis stroke="#6b9db3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="reviews"
                stroke="#c1f6ff"
                strokeWidth={3}
                fill="url(#colorReviews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Pie Static For Now */}
        <div className="chart-card">
          <h2>Time Spent per Note</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="review_count"
                label
              >
                {[0,1,2,3].map((i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
      <style>
        {`
            .dashboard-container {
              padding: 2rem 3rem;
            }

            .dashboard-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
            }

            .dashboard-title {
              font-size: 2rem;
              font-weight: 700;
              color: #e8fbff;
            }

            .dashboard-sub {
              color: rgba(200,240,255,0.5);
              font-size: 0.9rem;
            }

            /* KPI GRID */
            .kpi-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 1.5rem;
              margin-bottom: 2.5rem;
            }

            .kpi-card {
              background: linear-gradient(145deg, #0f2233, #0b1a29);
              border-radius: 16px;
              padding: 1.5rem;
              box-shadow:
                0 10px 30px rgba(0,0,0,0.6),
                0 0 0 1px rgba(120,170,200,0.08);
              transition: 0.2s ease;
            }

            .kpi-card:hover {
              transform: translateY(-4px);
            }

            .kpi-value {
              font-size: 2rem;
              font-weight: 700;
              color: #c1f6ff;
            }

            .kpi-label {
              margin-top: 0.5rem;
              color: rgba(200,240,255,0.6);
            }

            .kpi-change {
              margin-top: 0.4rem;
              font-size: 0.85rem;
              color: #6ee7ff;
            }

            /* Charts */
            .charts-grid {
              display: grid;
              grid-template-columns: 2fr 1fr;
              gap: 2rem;
            }

            .chart-card {
              background: linear-gradient(145deg, #0f2233, #0b1a29);
              border-radius: 16px;
              padding: 1.5rem;
              box-shadow:
                0 10px 30px rgba(0,0,0,0.6),
                0 0 0 1px rgba(120,170,200,0.08);
            }

            .chart-card h2 {
              margin-bottom: 1rem;
              color: #e8fbff;
            }
        `}
      </style>
    </div>
  );
}

function KpiCard({ label, value, change }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-change">{change} this week</div>
    </div>
  );
}
