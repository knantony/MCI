import React from "react";
import {
  Box,
  CssBaseline,
  Card,
  Typography,
  Button,
} from "@mui/material";
import Sidebar from "./Sidebar"; // Assuming the Sidebar component is in the same directory

// Reusable component for a recommendation card
const RecommendationCard = ({ title, codeSnippet, rationale }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        p: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              "&:hover": { bgcolor: "#333" },
              mr: 1,
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              borderRadius: "20px",
              "&:hover": { borderColor: "#333" },
            }}
          >
            Reject
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            bgcolor: "#f5f5f5",
            p: 2,
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {codeSnippet}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Rationale: {rationale}
      </Typography>
    </Card>
  );
};

export default function Recommendation({ onPageChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar onPageChange={onPageChange} currentPage="recommendation" />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Configuration Recommendations
        </Typography>

        <RecommendationCard
          title="Security Enhancement"
          codeSnippet={`# Current configuration (PROBLEMATIC) securityContext: privileged: true # Recommended fix securityContext: privileged: false
runAsNonRoot:true runAsUser: 1000 capabilities: drop: - ALL add: - NET_BIND_SERVICE`}
          rationale="Privileged containers have unrestricted access to the host system, creating security vulnerabilities. This fix maintains functionality while following security best practices."
        />

        <RecommendationCard
          title="Performance Optimization"
          codeSnippet={`Add resource limits and requests for better scheduling
resources: requests: cpu: "100m" memory: "128Mi" limits: cpu: "500m" memory: "512Mi"`}
          rationale="Based on historical usage patterns, these limits will ensure optimal resource allocation and prevent resource starvation in your cluster."
        />
      </Box>
    </Box>
  );
}