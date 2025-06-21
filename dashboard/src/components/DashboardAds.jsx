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
  Button,
  Modal,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function DashboardAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAd, setNewAd] = useState({
    title: "",
    advertiser: "",
    duration: 30,
    videoUrl: "",
  });

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = () => {
    setLoading(true);
    axios
      .get("https://video-ads-api.onrender.com/api/ads")
      .then((res) => {
        setAds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ads:", err);
        setLoading(false);
      });
  };

  const handleAdd = () => {
    axios
      .post("https://video-ads-api.onrender.com/api/ads", newAd)
      .then(() => {
        setModalOpen(false);
        setNewAd({ title: "", advertiser: "", duration: 30, videoUrl: "" });
        fetchAds();
      })
      .catch((err) => console.error("Add failed:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://video-ads-api.onrender.com/api/ads/${id}`)
      .then(() => fetchAds())
      .catch((err) => console.error("Delete failed:", err));
  };

  const sortedAds = [...ads].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">My Ads</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Add New Ad
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "background.paper" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Advertiser</TableCell>
                  <TableCell align="center">Duration (s)</TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() => toggleSort("impressions")}
                  >
                    Impressions{" "}
                    {sortBy === "impressions"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() => toggleSort("clicks")}
                  >
                    Clicks{" "}
                    {sortBy === "clicks"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </TableCell>
                  <TableCell align="center">Created</TableCell>
                  <TableCell align="center">Video</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAds.map((ad) => (
                  <TableRow key={ad._id}>
                    <TableCell align="center">{ad.title}</TableCell>
                    <TableCell align="center">{ad.advertiser}</TableCell>
                    <TableCell align="center">{ad.duration}</TableCell>
                    <TableCell align="center">{ad.impressions}</TableCell>
                    <TableCell align="center">{ad.clicks}</TableCell>
                    <TableCell align="center">
                      {new Date(ad.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="info"
                        onClick={() => window.open(ad.videoUrl, "_blank")}
                        disabled={!ad.videoUrl}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(ad._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal for Adding Ad */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <DialogTitle>Add New Ad</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newAd.title}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
              />
              <TextField
                label="Advertiser"
                fullWidth
                margin="dense"
                value={newAd.advertiser}
                onChange={(e) =>
                  setNewAd({ ...newAd, advertiser: e.target.value })
                }
              />
              <TextField
                label="Duration"
                type="number"
                fullWidth
                margin="dense"
                value={newAd.duration}
                onChange={(e) =>
                  setNewAd({ ...newAd, duration: parseInt(e.target.value) })
                }
              />
              <TextField
                label="Video URL"
                fullWidth
                margin="dense"
                value={newAd.videoUrl}
                onChange={(e) =>
                  setNewAd({ ...newAd, videoUrl: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} variant="contained">
                Add
              </Button>
            </DialogActions>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default DashboardAds;
