import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const drawerWidth = 200;
const sidebarItems = ["Dashboard", "Submit", "Recommendation", "Operations"];
const operationsSubItems = ["Deployment", "Drift Monitor", "Reports"];

export default function Sidebar({ onPageChange, currentPage }) {
  const [operationsOpen, setOperationsOpen] = useState(false);

  const handleOperationsClick = () => {
    setOperationsOpen(!operationsOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #eee",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          MCI
        </Typography>
      </Box>
      <List>
        {sidebarItems.map((text) => (
          <React.Fragment key={text}>
            <ListItem
              disablePadding
              sx={{ mb: 1, px: 2, cursor: "pointer" }}
              onClick={
                text === "Operations"
                  ? handleOperationsClick
                  : () => onPageChange(text.toLowerCase())
              }
            >
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    bgcolor: currentPage === text.toLowerCase() ? "black" : "transparent",
                    color: currentPage === text.toLowerCase() ? "white" : "black",
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    fontWeight: currentPage === text.toLowerCase() ? "bold" : "normal",
                    "&:hover": {
                      bgcolor: currentPage === text.toLowerCase() ? "black" : "#f0f0f0",
                    },
                  },
                }}
              />
              {text === "Operations" &&
                (operationsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
            </ListItem>
            {text === "Operations" && (
              <Collapse in={operationsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {operationsSubItems.map((subText) => (
                    <ListItem
                      key={subText}
                      disablePadding
                      sx={{ pl: 4, mb: 1, cursor: "pointer" }}
                      onClick={() => onPageChange(subText.toLowerCase().replace(/\s/g, ''))}
                    >
                      <ListItemText
                        primary={subText}
                        primaryTypographyProps={{
                          sx: {
                            color: "black",
                            "&:hover": {
                              color: "#333",
                            },
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}