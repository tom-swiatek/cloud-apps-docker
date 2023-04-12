import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Filter = () => {
  const [titleFilter, setTitleFilter] = useState({});

  const fetchTitle = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/titles/${id}`);
    return setTitleFilter(response.data);
  };

  return (
    <div>
      <Box m={10} mt={0} mb={0}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <TextField
                    value={titleFilter.id || ""}
                    onChange={(e) =>
                      setTitleFilter({ ...titleFilter, id: e.target.value })
                    }
                    id="standard-basic"
                    label="Filter by ID"
                    variant="standard"
                    focused
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => fetchTitle(titleFilter.id)}
                    variant="outlined"
                  >
                    Filter
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <b>{titleFilter.title}</b>
                </TableCell>
                <TableCell>
                  <b>{titleFilter.type}</b>
                </TableCell>
                <TableCell>
                  <b>{titleFilter.description}</b>
                </TableCell>
                <TableCell>
                  <b>{titleFilter.release_year}</b>
                </TableCell>
                <TableCell>
                  <b>{titleFilter.runtime}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Filter;
