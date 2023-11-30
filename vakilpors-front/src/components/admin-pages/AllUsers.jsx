import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import useStateRef from "react-usestateref";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Moment from "moment-jalaali";
import Table from "../Table/Table";
import "./AllUsers.css";
import { BASE_API_ROUTE } from "../../Constants";
import { convertDateToJalali } from "../Table/utils";
import { toast } from "react-toastify";
import { DateObject } from "react-multi-date-picker";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Dropdown } from "primereact/dropdown";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Shabnam",
  },
  direction: "rtl",
});

const Field = {"name": "Name",
                "userName": "UserName",
                "phoneNumber": "PhoneNumber",
                "email": "Email",
                "roleName": "RoleName"
              };

const AllUsersTable = () => {
  const { getAccessToken } = useAuth();

  const [userName, setUserName] = useState(""); // use this as `query`
  
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const usersType = [
                      { name: "کاربر عادی", code: 1 }, 
                      { name: "وکیل", code: 2 },
                      { name: "ادمین", code: 3 }
                    ];
  
  const [roleId, setRoleId] = useState(null);
  const [sortField, setSortField] = useState(null); // Sort
  const [sortOrder, setSortOrder] = useState(null); // IsAscending

  // handling pagination and sort with this state
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: sortField,
    sortOrder: sortOrder,
  });

  const handleRoleChange = (event) => {
    console.log(`The event.value is: ${event.target.value}`)
    setRoleId(event.target.value);
  };

  const getRecords = async (isSearching) => {
    const token = await getAccessToken();
    if (token) {
      const url = BASE_API_ROUTE + "User/GetAllPaged";
      try {
        if (isSearching) {
          searchHandler();
          return;
        }
        setLoading(true);
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              query: null,
              roleId: null,
              PageNumber: lazyParams.page,
              PageSize: lazyParams.rows,
              Sort: lazyParams.sortField,
              IsAscending: lazyParams.sortOrder,
            },
          })
          .then((res) => {
            let recordsInit = res.data.data;
            console.log(`The records in getRecords are ${recordsInit.results[0].name}`);
            setLoading(false);
            setRecords(recordsInit);
          })
          .catch((err) => {
            setLoading(false);
            toast.error(
              "مشکلی در دریافت اطلاعات جدول وجود دارد. لطفا دوباره تلاش کنید."
            );
          });
      } catch (error) {
        console.log("error in getting users : ", error);
      }
    }
  };

  // Load Records based on new Sort Or Pagination
  useEffect(() => {
    console.log("Load Records based on new Sort Or Pagination");
    console.log(`The records are: ${records}`)
    if (records.totalItems) {
      if (records?.totalItems !== records?.results.length)
        getRecords(isSearching);
    } else getRecords(isSearching);
  }, [lazyParams]);

  // On Pagination Click
  const onPage = (event) => {
    console.log(`------------------- IN ON PAGE HANDLER ---------------- ${event.page}`);
    setLazyParams((prevParams) => ({
      ...prevParams,
      first: event.first,
      rows: event.rows,
      page: event.page + 1,
    }));
  };
  // On Sort Change
  const onSort = (event) => {
    let newSortOrder = event.sortOrder;
    if (event.sortField === sortField) {
      newSortOrder = sortOrder === "true" ? "false" : "true";
    }
    if (newSortOrder === 1) {
      newSortOrder = "true";
    } else if (newSortOrder === -1) {
      newSortOrder = "false";
    }
    console.log(`The event sortField is: ${event.sortField}`);
    const selectedSortField = Field[event.sortField]; // Get the selected sort field from the Field array
    const pascalSortField = selectedSortField.charAt(0).toUpperCase() + selectedSortField.slice(1); // Convert the selected sort field to PascalCase
    
    setSortField(selectedSortField);
    setSortOrder(newSortOrder);
    setLazyParams((prevState) => ({
      ...prevState,
      sortField: pascalSortField, // Use the PascalCase sort field in the lazyParams state
      sortOrder: newSortOrder,
    }));
  };

  // Search For Specific Alert
  const searchHandler = async () => {
    setLoading(true);
    console.log(`---------------------------- IN SEARCH HANDLER -------------------------`);

    setIsSearching(true);

    let URL = BASE_API_ROUTE + "User/GetAllPaged";


    let params = {
      query: userName,
      PageSize: 10,
      PageNumber: lazyParams.page,
      Sort: lazyParams.sortField,
      IsAscending: sortOrder,
      roleId: roleId.code
    };
    console.log(`The params are: ${params.roleId.code}`);

    const token = await getAccessToken();
    axios({
      method: "get",
      url: URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: params,
    })
      .then((res) => {
        let recordsInit = res.data.data;
        console.log(`The records in searchHandler are : ${recordsInit}`);

        setLoading(false);
        setRecords(recordsInit);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "مشکلی در دریافت اطلاعات جدول وجود دارد. لطفا دوباره تلاش کنید."
        );
      });
  };
  // Table Refresh
  const onRefreshClick = () => {
    setLazyParams({
      first: 0,
      rows: 10,
      page: 1,
      sortField: sortField,
      sortOrder: sortOrder,
    });
    setIsSearching(false);
    getRecords(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>مدیریت کاربران</title>
        </Helmet>
        <div style={{display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              backgroundColor: '#fffbf5'}}>
          <h1
            style={{
              paddingBottom: 10,
              fontSize: 24,
              color: "#000000",
              alignSelf: "center",
              marginTop: "1rem",
              fontWeight: "bold",
            }}
          >
            مدیریت کاربران
          </h1>
          <div className="w-100">
            <Box className="all-users">
              <h4 className="search-fields-title" style={{ marginBottom: '1rem' }}>پالایش و جست‌وجو در جدول</h4>
              <Grid container spacing={1.5}>
                <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
                  <FormControl
                    variant="outlined"
                    style={{ direction: "rtl", width: "100%" }}
                  >
                    <TextField

                      type={"text"}
                      value={userName}
                      onChange={(user) => {
                        setUserName(user.target.value);
                      }}
                      label="جست‌وجو در بین کاربران"
                      placeholder="مثال: demo"
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
                <FormControl
                    variant="outlined"
                    style={{ direction: "rtl", width: "100%" }}
                  >
                  <Dropdown
                    style={{ padding: "7px" }}
                    optionLabel="name"
                    options={usersType}
                    placeholder="نقش کاربر"
                    className="w-full md:w-14rem"
                    value={roleId}
                    onChange={handleRoleChange}
                  />
                  </FormControl>
                </Grid>

                <Grid className="searchBtn" item xl={2} lg={2} md={4} sm={6} xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <Button
                      style={{ padding: "14px", marginLeft: "4px" }}
                      onClick={searchHandler}
                      variant="contained"
                      size="large"
                    >
                      جست‌وجو
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid sx={{ marginTop: 2 }} container spacing={2}>
                <Grid item xs={12}>
                  <Table
                    loading={loading}
                    records={records}
                    onPage={onPage}
                    onSort={onSort}
                    lazyParams={lazyParams}
                    onRefreshClick={onRefreshClick}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AllUsersTable;
