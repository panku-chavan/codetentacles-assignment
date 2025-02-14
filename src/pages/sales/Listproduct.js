import React, { useEffect } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducstList,
  reseteProductState,
} from "../../redux/feature/productSlice";
export default function Product() {
  const dispatch = useDispatch();
  const { productList, currentPage, perPage, lastPage } = useSelector(
    (state) => state.productSlice
  );
  // console.log(productList);

  useEffect(() => {
    if(productList.length===0){

      dispatch(getProducstList({ page: 1, perPage: 10 }));
    }
    dispatch(reseteProductState());
  }, [dispatch,productList.length]);

  const handlePageChange = (event, newPage) => {
    dispatch(getProducstList({ page: newPage, perPage }));
  };

  const handleRowsPerPageChange = (newPerPage) => {
    dispatch(getProducstList({ page: 1, perPage: newPerPage }));
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (item) => (
        <>
          <div className="m-auto flex justify-center">
            <img
              src={item?.image}
              alt="productimg"
              width="50px"
              height="50px"
              className="rounded"
            />
          </div>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              Product
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="flex justify-end mb-3 p-2">
              <Link
                to="/Add-product"
                className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
              >
                Add Product
              </Link>
            </div>
            <Table
              cols={columns}
              data={productList}
              totalPages={lastPage}
              page={currentPage}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={perPage}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
