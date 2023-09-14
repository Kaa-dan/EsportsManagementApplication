import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useBlockFanMutation } from "../../../application/slice/admin/listApiSlice";
// import Customers from "./customers-page";
import { Box } from "@mui/material";
import { useGetFansMutation } from "../../../application/slice/admin/listApiSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomerManage = () => {
  const [data, setData] = useState([]);
  const [reload,setReload]= useState(true)
  const [blockFan] = useBlockFanMutation();
  const [getUsers] = useGetFansMutation();
  const getData = async () => {
    const responce = await getUsers();
    setData(responce.data.data);
    console.log(responce.data.data);
  };
  useEffect(() => {
    getData();
  }, [reload]);
  const blockHandler = async (email) => {
    try {
      setReload(!reload)
      const responce = await blockFan({ email });
      console.log(responce);
    } catch (error) {}
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      {/* <Customers data={data} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align="right">User name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={row._id}>
                {/* {console.log(row)} */}
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.block ? (
                    <Button
                      onClick={() => {
                        blockHandler(row.email);
                      }}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        blockHandler(row.email);
                      }}
                    >
                      Block
                    </Button>
                  )}
                </StyledTableCell>

                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerManage;
