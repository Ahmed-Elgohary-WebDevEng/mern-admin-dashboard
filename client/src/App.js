import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Layout from "pages/layout/Layout";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { themeSettings } from "theme";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductsPage from "./pages/products/ProductsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import GeographyPage from "./pages/geography/GeographyPage";
import OverviewPage from "./pages/overview/OverviewPage";
import DailyPage from "./pages/daily/DailyPage";
import MonthlyPage from "./pages/monthly/MonthlyPage";
import BreakDownPage from "./pages/breakdown/BreakDownPage";
import AdminPage from "./pages/admin/AdminPage";
import PerformancePage from "./pages/performance/PerformancePage";

function App() {
  // grab mode setting from React redux using useSelector()
  const { mode } = useSelector((state) => state.global);
  // set user theme using memo to change theme colors
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/dashboard"} replace={true} />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/customers",
          element: <CustomersPage />,
        },
        {
          path: "/transactions",
          element: <TransactionsPage />,
        },
        {
          path: "/geography",
          element: <GeographyPage />,
        },
        {
          path: "/overview",
          element: <OverviewPage />,
        },
        {
          path: "/daily",
          element: <DailyPage />,
        },
        {
          path: "/monthly",
          element: <MonthlyPage />,
        },
        {
          path: "/breakdown",
          element: <BreakDownPage />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/performance",
          element: <PerformancePage />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
