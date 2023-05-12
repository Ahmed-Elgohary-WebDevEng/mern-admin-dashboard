import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/users/users-api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // get the user from global store
  const { userId } = useSelector((state) => state.global);

  const {
    isLoading,
    data: admin,
    error,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      return await getUserById(userId);
    },
  });

  /**
   * JSX Code
   */
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={admin?.data || {}}
        isNonMobile={isNonMobile}
        drawerWidth={"250px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={admin?.data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
