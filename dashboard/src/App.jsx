import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardAds from "./components/DashboardAds";
import DashboardStats from "./components/DashboardStats";
import TopBar from "./components/TopBar";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, MenuItem, Menu } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <TopBar />
        <Box sx={{ p: 4, mb: 8 }}>
          <Routes>
            <Route path="/ads" element={<DashboardAds />} />
            <Route path="/stats" element={<DashboardStats />} />
            <Route path="/" element={<DashboardAds />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;