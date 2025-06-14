import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DashboardAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://video-ads-api.onrender.com/api/ads")
      .then((response) => {
        setAds(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ads:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Ads
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>Title</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Advertiser</TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  Duration (s)
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  Impressions
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>Clicks</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>{ad.advertiser}</TableCell>
                  <TableCell>{ad.duration}</TableCell>
                  <TableCell>{ad.impressions}</TableCell>
                  <TableCell>{ad.clicks}</TableCell>
                  <TableCell>
                    {new Date(ad.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default DashboardAds;