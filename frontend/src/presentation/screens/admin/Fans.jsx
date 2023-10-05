import {
  useBlockFanMutation,
  useGetFansMutation,
} from "../../../application/slice/admin/adminApiSlice";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Container,
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Pagination from "../../components/user/dashboard/Pagination";
const columns = [
 
  { id: "avatar", label: "Avatar", minWidth: 100 },
  {
    id: "name",
    label: "Username",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "restrict",
    label: "Restrict",
  },
];

const Fans = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterFans, setFilterFans] = useState("all");
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);

  const [blockFanApi, { isLoading: blockLoading }] = useBlockFanMutation();
  const [getUsersApi, { isLoading }] = useGetFansMutation();

  const getData = async () => {

    const responce = await getUsersApi({ query, filterFans, page });
    console.log(responce);
    setData(responce.data.data);
    // }
  };

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const blockHandler = async (email) => {
    try {
      const responce = await blockFanApi({ email });
      getData();
      console.log(responce);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [filterFans, page,query]);

  return (
    <>
      <Container
        sx={{
          position: "relative",
          backgroundColor: "rgba(51, 14, 98, 0.4)",
          padding: "40px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // height: lg ? (md ? (sm ? "120%" : "130%") : "140%") : "140%",
          height: "310%",
        }}
      >
        <Container>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <TextField
                variant="outlined"
                value={query}
                label="Search"
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1 }} // Adjust the width of the TextField
              />
              {/* <Button
                variant="contained"
                color="primary"
                onClick={getData}
                style={{ height: "56px" }}
              >
                Search
              </Button> */}
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                {console.log(filterFans)}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterFans}
                  label="Age"
                  onChange={(e) => setFilterFans(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="blocked">Blocked</MenuItem>
                  <MenuItem value="notBlocked">Non-Blocked</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {isLoading ? (
                  <LinearProgress />
                ) : (
                  <>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentData.map((user, index) => {
                        return (
                          <TableRow key={index}>
                          
                            <TableCell>
                              <Avatar
                                alt="profile avatar"
                                src={user.profilePhoto}
                              />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {blockLoading ? (
                                <CircularProgress size={20} />
                              ) : (
                                <Button
                                  sx={{
                                    backgroundColor: "#6e43a3",
                                    color: "#ffffff",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    "&:hover": {
                                      backgroundColor: "#330e62",
                                    },
                                  }}
                                  onClick={() => {
                                    blockHandler(user.email);
                                  }}
                                >
                                  {user?.block ? "Unblock" : "Block"}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Container>
        <Box  sx={{ position: "absolute", mt: 70 }}>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data.length / rowsPerPage)}
            onPageChange={onPageChange}
          />
        </Box>
      </Container>
    </>
  );
};

export default Fans;
