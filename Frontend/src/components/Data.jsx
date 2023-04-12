import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";

import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";


const BASE_URL = "http://127.0.0.1:8000";

const Data = (fetchOnClick) => {

  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/titles_top`);
      setTitles(response.data);
    } catch (error) {
      console.error("Error fetching titles", error);
    }
  };

  const deleteTitle = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/titles/${id}`);
      await fetchTitles();
    } catch (error) {
      console.error("Error deleting title", error);
    }
  };

  const editTitle = async () => {
    try {
      await axios.put(`${BASE_URL}/titles/`, title);
      await fetchTitles();
      handleClose();
    } catch (error) {
      console.error("Error editing title", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Box m={10} mt={0}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Release Year</TableCell>
                <TableCell>Runtime</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
              {titles.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.release_year}</TableCell>
                  <TableCell>{row.runtime}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteTitle(row.id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setTitle(row);
                      }}
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <Grid>
            <Grid>
              <TextField
                value={title.title || ""}
                onChange={(e) =>
                  setTitle({ ...title, title: e.target.value })
                }
                id="standard-basic"
                label="Title"
                variant="standard"
                focused
                margin="dense"
                style={{ width: 500 }}
              />
            </Grid>
            <Grid>
              <TextField
                value={title.type || ""}
                onChange={(e) =>
                  setTitle({ ...title, type: e.target.value })
                }
                id="standard-basic"
                label="Type"
                variant="standard"
                focused
                margin="dense"
              />
            </Grid>
            <Grid>
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
                margin="dense"
              />
            </Grid>
            <Grid>
              <TextField
                value={title.release_year || ""}
                onChange={(e) =>
                  setTitle({ ...title, release_year: e.target.value })
                }
                id="standard-basic"
                label="Release Year"
                variant="standard"
                focused
                margin="dense"
              />
            </Grid>
            <Grid>
              <TextField
                value={title.runtime || ""}
                onChange={(e) =>
                  setTitle({ ...title, runtime: e.target.value })
                }
                id="standard-basic"
                label="Runtime"
                variant="standard"
                focused
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            editTitle();
            setOpen(false);
          }}
            variant="outlined"
            startIcon={<EditIcon />}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Data