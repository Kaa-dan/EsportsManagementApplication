import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  useBlockFanMutation,
  useGetFansMutation,
  useFilterFansMutation,
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
} from "@mui/material";
const columns = [
  { id: "no", label: "No", minWidth: 170 },
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterFans, setFilterFans] = useState("");
  const [data, setData] = useState([]);
  const [blockFanApi, { isLoading: blockLoading }] = useBlockFanMutation();
  const [filterFansApi, { isLoading: fansFilterLoading }] =
    useFilterFansMutation();
  const [getUsersApi, { isLoading }] = useGetFansMutation();

  const getData = async () => {
    const responce = await getUsersApi();
    console.log(responce);
    setData(responce.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const blockHandler = async (email) => {
    try {
      const responce = await blockFanApi({ email });
      getData();
      console.log(responce);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handler for filtering
  const filterFansHandler = async (e) => {
    try {
      console.log(e.target.value);
      if (e.target.value === "all") {
        console.log(true);
        setFilterFans(e.target.value);
        getData();
      } else {
        const responce = await filterFansApi({ filter: e.target.value });
        setFilterFans(e.target.value);
        console.log(responce);
        setData(responce.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {isLoading || fansFilterLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Horizontally center
            alignItems: "center", // Vertically center
            height: "100vh", // Set the height of the container to the viewport height
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterFans}
                label="Age"
                onChange={filterFansHandler}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="notBlocked">Non-Blocked</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
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
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[15]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default Fans;
