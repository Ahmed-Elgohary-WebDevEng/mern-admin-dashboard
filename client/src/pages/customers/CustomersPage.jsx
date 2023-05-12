import React from "react";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import CustomerApi from "../../api/customers/customer-api";
import { Box, TableCell, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function CustomersPage(props) {
  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return await CustomerApi.getAllCustomers();
    },
    staleTime: 5000,
    cacheTime: 300000,
  });
  const theme = useTheme();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];


  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"Customers"} subtitle={"view all customers data"} />
      {/* Show all customers data*/}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !customers?.data}
          getRowId={(row) => row._id}
          rows={customers?.data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default CustomersPage;
