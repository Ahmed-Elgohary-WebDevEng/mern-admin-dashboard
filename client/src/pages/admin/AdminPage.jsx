import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminsUsers } from "../../api/users/users-api";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

function AdminPage(props) {
  const theme = useTheme();
  const {
    data: admins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      return await getAdminsUsers();
    },
    staleTime: 3000,
    cacheTime: 500000,
  });

  if (!admins?.data || isLoading) return <h3>Loading...</h3>;

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
  /**
   * JSX Code
   */
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
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
          loading={isLoading || !admins?.data}
          getRowId={(row) => row._id}
          rows={admins?.data || []}
          columns={columns}
          // slots={{
          //   columnMenu: CustomColumnMenu
          // }}
          // components={{
          //   ColumnMenu: CustomColumnMenu,
          // }}
        />
      </Box>
    </Box>
  );
}

export default AdminPage;
