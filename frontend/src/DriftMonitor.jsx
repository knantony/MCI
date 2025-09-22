import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "./Sidebar";

// Reusable component for the Drift Detected card
function DriftCard({ expected, actual }) {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        p: 3,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Configuration Drift Detected
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2 minutes ago
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Service 'api-gateway' configuration differs from desired state
      </Typography>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            Expected
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", mt: 1 }}>
            {expected}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            Actual
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", mt: 1 }}>
            {actual}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 1 }}>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            bgcolor: "black",
            color: "white",
            borderRadius: "20px",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Auto Remediate
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            bgcolor: "black",
            color: "white",
            borderRadius: "20px",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Suppress Alert
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            bgcolor: "black",
            color: "white",
            borderRadius: "20px",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          View in Kubernetes
        </Button>
      </Box>
    </Card>
  );
}

// Reusable component for In-Sync and other status cards
function StatusCard({ title, subtitle, details, statusColor }) {
  const [open, setOpen] = useState(false);

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
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography variant="body1" fontWeight="bold">
          {title}
          <Box component="span" sx={{ ml: 1, color: statusColor, fontWeight: "normal" }}>
            - {subtitle}
          </Box>
        </Typography>
        <IconButton size="small">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2">{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default function DriftMonitor({ onPageChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar onPageChange={onPageChange} currentPage="driftmonitor" />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Drift Detection & Monitoring
        </Typography>

        <DriftCard
          expected={`replicas: 3\nimage: api-gateway:v2.1.0`}
          actual={`replicas: 2\nimage: api-gateway:v2.0.5`}
        />

        <StatusCard
          title="frontend-service"
          subtitle="In Sync"
          details="Configuration matches desired state • Last checked: 30 seconds ago"
          statusColor="#4CAF50" // Green color
        />
        <StatusCard
          title="database-config"
          subtitle="In Sync"
          details="No drift detected • Auto-scaling within normal parameters"
          statusColor="#4CAF50" // Green color
        />
        <StatusCard
          title="redis-cache"
          subtitle="Manual Override Active"
          details="Temporarily scaled up for high traffic • Override expires in 2 hours"
          statusColor="#FFC107" // Amber color
        />
      </Box>
    </Box>
  );
}