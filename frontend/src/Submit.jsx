import React from "react";
import {
  Box,
  CssBaseline,
  Card,
  CardContent,
  Button,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "./Sidebar";

export default function Submit({ onPageChange }) {
  const [authOpen, setAuthOpen] = React.useState(true);
  const [accessOpen, setAccessOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar onPageChange={onPageChange} currentPage="submit" />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
            p: 4,
            textAlign: "left",
          }}
        >
          <Typography variant="h6" fontWeight="bold">Upload Config File</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Supports YAML, JSON, Terraform, Kubernetes, Docker Compose
          </Typography>
          <Box
            sx={{
              mt: 3,
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 10,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Drop your config files here
            </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                borderRadius: "20px",
                "&:hover": { bgcolor: "#333" },
              }}
              onClick={() => onPageChange("results")}
            >
              Process
            </Button>
          </Box>
        </Card>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Authentication & Access Control
          </Typography>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => setAuthOpen(!authOpen)}
            >
              <Typography variant="body1" fontWeight="bold">
                User authenticated: john.doe@company.com
              </Typography>
              <IconButton size="small">
                {authOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>
            <Collapse in={authOpen}>
              <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2">
                  Role: Senior DevOps Engineer - Team: Platform Engineering
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => setAccessOpen(!accessOpen)}
            >
              <Typography variant="body1" fontWeight="bold">
                Access permissions verified
              </Typography>
              <IconButton size="small">
                {accessOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>
            <Collapse in={accessOpen}>
              <CardContent sx={{ pt: 0 }}>
                {/* You can add content for access verification here if needed */}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}