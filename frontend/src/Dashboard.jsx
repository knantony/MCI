import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "./Sidebar";

// Custom component for the collapsible Recent Activity cards
function RecentActivityCard({ title, content, status }) {
  const [open, setOpen] = useState(false);
  const getIcon = () => (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />);

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          cursor: "pointer",
          bgcolor: status === "success" ? "#e8f5e9" : status === "warning" ? "#fffde7" : status === "error" ? "#ffebee" : "#fff",
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <IconButton size="small">
          {getIcon()}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const data = [
  { name: "Config Errors", value: 40 },
  { name: "Security Issues", value: 20 },
  { name: "Performance Issues", value: 15 },
  { name: "Best Practice Warnings", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard({ onPageChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar onPageChange={onPageChange} currentPage="dashboard" />
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", textAlign: "left" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Configs validated</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>247</Typography>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", textAlign: "left" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Active Drift Alerts</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>12</Typography>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Issue Distribution</Typography>
                <Box sx={{ width: "100%", height: 180, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box textAlign="center" mt={2}>
                  <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", textAlign: "left" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Recommendations</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>89</Typography>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", textAlign: "left" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Critical Issues prevented</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>3</Typography>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", textAlign: "left" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">System Uptime</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>99.7%</Typography>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>Learn More</Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Activity</Typography>
          <RecentActivityCard
            title="kubernetes/frontend-deployment.yaml validated successfully"
            content="All security policies passed • 2 minutes ago"
            status="success"
          />
          <RecentActivityCard
            title="docker-compose.prod.yml needs attention"
            content="Resource limits recommendation available • 5 minutes ago"
            status="warning"
          />
          <RecentActivityCard
            title="terraform/infrastructure.tf validation failed"
            content="Security group rules conflict detected • 8 minutes ago"
            status="error"
          />
          <RecentActivityCard
            title="kubernetes/frontend-deployment.yaml validated successfully"
            content="All security policies passed • 10 minutes ago"
            status="success"
          />
        </Box>
      </Box>
    </Box>
  );
}