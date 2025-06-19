import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function DashboardStats() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://video-ads-api.onrender.com/api/ads")
      .then((res) => {
        setAds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading ads:", err);
        setLoading(false);
      });
  }, []);

  
  const barData = {
    labels: ads.map((ad) => ad.title),
    datasets: [
      {
        label: "Impressions",
        data: ads.map((ad) => ad.impressions),
        backgroundColor: "#42a5f5",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  const lineData = {
    labels: ads.map((ad) =>
      new Date(ad.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Clicks",
        data: ads.map((ad) => ad.clicks),
        fill: false,
        borderColor: "#66bb6a",
        tension: 0.2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return (
    <Box sx={{ml: "120px", px: 2, py: 4, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Statistics Overview
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "background.paper", p: 2, width: "100%" }}>
              <CardContent sx={{ height: 360 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Impressions per Ad
                </Typography>
                <Bar data={barData} options={barOptions} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "background.paper", p: 2, width: "100%" }}>
              <CardContent sx={{ height: 360 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Clicks Over Time
                </Typography>
                <Line data={lineData} options={lineOptions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default DashboardStats;