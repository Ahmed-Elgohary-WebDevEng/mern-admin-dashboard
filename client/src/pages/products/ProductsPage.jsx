import React from "react";
import Header from "../../components/Header";
import { Box, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ProductsApi from "../../api/products/products-api";
import ProductCard from "../../components/ProductCard";

function ProductsPage(props) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await ProductsApi.getAllProducts();
    },
    staleTime: 5000,
    cacheTime: 300000,
  });
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  /**
   * JSX Code
   */
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"Products"} subtitle={"See your list of products"} />
      {/* Show Products data */}
      {products?.data || !isLoading ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {products?.data?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ProductsPage;
