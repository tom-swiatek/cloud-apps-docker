import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useState, useEffect } from "react";
import axios from "axios";

import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = "http://127.0.0.1:8000";

const InputsAndStats = () => {
  const [title, setTitle] = useState({});
  const [stats1, setStats1] = useState({});
  const [stats2, setStats2] = useState({});
  const [stats3, setStats3] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${BASE_URL}/stats/`);
      const stats = await response.json();

      const data1 = {
        labels: Object.keys(stats.movies_genres),
        datasets: [
          {
            label: "# of Votes",
            data: Object.values(stats.movies_genres),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };
      setStats1(data1);

      const data2 = {
        datasets: [
          {
            label: "Sales of the week",
            data: stats.avg_runtime_by_year,
            backgroundColor: "aqua",
            borderColor: "black",
            pointBorderColor: "aqua",
          },
        ],
      };
      setStats2(data2);

      const data3 = {
        datasets: [
          {
            label: "Sales of the week",
            data: stats.count_title_by_rel_year,
            backgroundColor: "aqua",
            borderColor: "black",
            pointBorderColor: "aqua",
          },
        ],
      };
      setStats3(data3);
    };

    fetchStats();
  }, []);

  const createTitle = async () => {
    await axios.post(`${BASE_URL}/titles`, title);
    setTitle({
      id: 0,
      title: "",
      type: "",
      description: "",
      runtime: 0,
      release_year: 0,
    });
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Movie/Show",
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Avg lenght in min by year",
      },
    },
  };
  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of movies/show added by year",
      },
    },
  };

  return (
    <div>
      <Box m={10} mt={0} mb={0}>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Stats
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="max-width 500px">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Pie data={stats1} options={options1}></Pie>
              </Grid>
              <Grid item xs={8}>
                <Grid item xs={6}>
                  <Line data={stats2} options={options2}></Line>
                </Grid>
                <Grid item xs={6}>
                  <Line data={stats3} options={options3}></Line>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Dialog>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <TextField
                    value={title.title || ""}
                    onChange={(e) =>
                      setTitle({ ...title, title: e.target.value })
                    }
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    focused
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={title.type || ""}
                    onChange={(e) =>
                      setTitle({ ...title, type: e.target.value })
                    }
                    id="standard-basic"
                    label="Type"
                    variant="standard"
                    focused
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={title.description || ""}
                    onChange={(e) =>
                      setTitle({ ...title, description: e.target.value })
                    }
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                    focused
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={title.release_year || ""}
                    onChange={(e) =>
                      setTitle({ ...title, release_year: e.target.value })
                    }
                    id="standard-basic"
                    label="Release Year"
                    variant="standard"
                    focused
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={title.runtime || ""}
                    onChange={(e) =>
                      setTitle({ ...title, runtime: e.target.value })
                    }
                    id="standard-basic"
                    label="Runtime"
                    variant="standard"
                    focused
                  />
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => createTitle()}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={handleClickOpen}
                    variant="outlined"
                    endIcon={<QueryStatsIcon />}
                  >
                    Stats
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default InputsAndStats;
