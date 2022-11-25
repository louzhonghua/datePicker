import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paginate from "./Paginate";
import { getTableData, columns } from "./mock";
import { Table } from "antd";

function PaginatePage(props) {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const iniPage = 1;
  const [currentPage, setCurrentPage] = useState(iniPage);
  const iniSize = 2;
  const [pageSize, setPageSize] = useState(iniSize);
  //获取当前页码的数据
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  //如果当前页码的数据为空，那么就把当前页码设置为1
  useEffect(() => {
    if (currentData.length === 0) {
      setCurrentPage(1);
    }
  }, [currentData]);
  //获取table数据
  const getData = async () => {
    const { total, data } = await getTableData();
    setTotal(total);
    setData(data);
  };
  const onPageSizeChange = (e) => {
    setPageSize(e.target.value);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={currentData} pagination={false} />
      <Paginate
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}

PaginatePage.propTypes = {};

export default PaginatePage;
