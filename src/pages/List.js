import React, { useEffect } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../redux/feature/usersSlice";
export default function List() {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Action",
      render: (item) => (
        <>
          <div className="flex gap-1 text-center justify-center">
            <button
              onClick={() => handleDelete(item.id)}
              className="hover:opacity-75 transition-opacity"
            >
              <Trash2 color="#ff0000" size={16} />
            </button>
          </div>
        </>
      ),
      key: "action",
      width: 90,
    },
  ];
  const dispatch = useDispatch();
  const { usersList, currentPage, perPage, lastPage } = useSelector((state) => state.usersSlice);
  // console.log(usersList,currentPage,perPage);
 

  useEffect(() => {
    if(usersList.length===0){
      dispatch(getUserList({ page: 1, perPage: 10 }));
    }
    }, [dispatch,usersList.length]);
  
    const handlePageChange = (event, newPage) => {
      dispatch(getUserList({ page: newPage, perPage }));
    };
  
    const handleRowsPerPageChange = (newPerPage) => {
      dispatch(getUserList({ page: 1, perPage: newPerPage }));
    };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      //   setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log(id);
      dispatch(deleteUser({ page: 1, perPage: 10 ,id:id}));
    }
  };
  
  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              List
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="flex justify-end mb-3 p-2">
              <Link
                to="/Stepperform"
                className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
              >
                Add
              </Link>
            </div>
            {/* <Table cols={columns} data={usersList} handleRowsPerPageChange={handleRowsPerPageChange}/> */}
            <Table
              cols={columns}
              data={usersList}
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
