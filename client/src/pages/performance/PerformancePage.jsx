import React from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserPerformanceStatApi } from "../../api/users/users-api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

function PerformancePage(props) {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);

  const {
    data: performanceStat,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["performance-stat"],
    queryFn: async () => {
      return await getUserPerformanceStatApi(userId);
    },
    staleTime: 5000,
    cacheTime: 500000,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
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
          loading={isLoading || !performanceStat?.data}
          getRowId={(row) => row._id}
          rows={(performanceStat?.data && performanceStat?.data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default PerformancePage;
