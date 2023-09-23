

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetFansMutation } from "../../../application/slice/admin/adminApiSlice";
import { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
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

  const [data, setData] = useState([]);
  // const [reload,setReload]= useState(true)
  // const [blockFan] = useBlockFanMutation();
  const [getUsers] = useGetFansMutation();
  const getData = async () => {
    const responce = await getUsers();
    console.log(responce);
    setData(responce.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  // const blockHandler = async (email) => {
  //   try {
  //     setReload(!reload)
  //     const responce = await blockFan({ email });
  //     console.log(responce);
  //   } catch (error) {}
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                      <Avatar alt="profile avatar" src={user.profilePhoto} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button>Block</Button>
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
  );
};

export default Fans;
