import React from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Collapse,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "./Sidebar";

function ValidationCard({ title, children, defaultExpanded = false }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
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
          bgcolor: "#fafafa",
          borderBottom: "1px solid #eee",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <IconButton size="small">
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
}

export default function Results({ onPageChange }) {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar onPageChange={onPageChange} currentPage="results" />
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Configuration Validation Results
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="validation tabs">
            <Tab label="Syntax Check" />
            <Tab label="Schema Validation" />
            <Tab label="Policy Compliance" />
            <Tab label="Security Scan" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box>
            <ValidationCard title="Syntax Check - All files parsed successfull" defaultExpanded={true}>
              <Typography variant="body2" color="text.secondary">
                YAML syntax is valid • No structural issues detected
              </Typography>
            </ValidationCard>
            <ValidationCard title="Resource Limits - Missing CPU limits">
              <Typography variant="body2" color="text.secondary">
                Container `frontend` doesn't specify CPU limits • May cause resource contention
              </Typography>
              <Typography variant="body2" sx={{ bgcolor: "#eee", p: 1, mt: 1, borderRadius: "4px", whiteSpace: "pre-wrap" }}>
                resources: limits: memory: "512Mi" # cpu: "500m" # {"<"}-- Add this line
              </Typography>
            </ValidationCard>
            <ValidationCard title="Security Policy - Privileged container detected">
              <Typography variant="body2" color="text.secondary">
                Container running with `privileged: true` • Violates company security policy
              </Typography>
              <Typography variant="body2" sx={{ bgcolor: "#eee", p: 1, mt: 1, borderRadius: "4px", whiteSpace: "pre-wrap" }}>
                securityContext: privileged: true # {"<"}-- Remove or set to `false` `runAsUser: 1000` # {"<"}-- Add non-root user
              </Typography>
            </ValidationCard>
          </Box>
        )}
      </Box>
    </Box>
  );
}