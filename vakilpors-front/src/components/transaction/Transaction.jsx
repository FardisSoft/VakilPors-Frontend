import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import "../../css/premium-page.css";
import { BASE_API_ROUTE } from "../../Constants";
import { Link, useNavigate } from "react-router-dom";
import Moment from "moment-jalaali";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

const theme = createTheme({
  typography: {
    fontFamily: "Shabnam",
  },
  direction: "rtl",
});

const columns = [
  { id: "amount", label: "مبلغ", minWidth: 100 },
  { id: "date", label: "تاریخ خریداری شده", minWidth: 250 },
  { id: "description", label: "توضیحات", minWidth: 100 },
];

const Transaction = () => {
  let pagesize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [pagenum, setpagenum] = useState(1);
  const navigate = useNavigate();
  const { refUserRole, getAccessToken } = useAuth();
  const [gettransactions, settransactions] = useState([]);
  const [totalpage, settotalpage] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);

    const token = await getAccessToken();
    if (token) {
      const tokenData = jwt(token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      try {
        const premiumdetail = await axios.get(
          BASE_API_ROUTE +
            `Wallet/GetTransactions?PageNumber=${pagenum}&PageSize=${pagesize}`,
          {
            headers: headers,
          }
        );
        settransactions(premiumdetail.data.results);
        console.log(premiumdetail.data.totalPages);
        settotalpage(premiumdetail.data.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.log("error in getting Transactions : ", err);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (refUserRole.current && refUserRole.current !== "User") {
      navigate("*");
    }
    fetchData();
  }, [pagenum]);
  
  const handlePagination = (e, p) => {
    setpagenum(p);
    console.log(p);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="report-box shadow-sm mt-3 bg-white" id="history">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <TableContainer
                component={Paper}
                style={{ fontFamily: "shabnam" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="right"
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gettransactions.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align="right">
                            {row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{display:"flex", justifyContent:"center"}}>
                <Pagination
                  count={totalpage}
                  style={{
                    marginTop: "1rem",
                    padding: "10px 80px",
                  }}
                  page={pagenum}
                  variant="outlined"
                  color="primary"
                  onChange={handlePagination}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Transaction;
