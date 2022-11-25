import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
/*
  * This is a component that renders a pagination bar.
  既然需要分页，那么就需要知道当前页码，总页数，以及点击页码时的回调函数
 */

//为容器添加样式
const Container = styled.div`
  margin: 1rem 0;
`;

//为上一页和下一页添加样式
const LeftBtn = styled.button`
  margin-right: 2rem;
`;
const RightBtn = styled.button`
  margin-left: 2rem;
`;
const CenterBtn = styled.button`
  margin: 0 0.5rem;
  border: none;
`;
const PageSizeSelect = styled.select`
  margin-left: 1rem;
`;
const JumpTo = styled.input`
  margin: 0 0.5rem;
  width: 3rem;
`;
function Paginate(props) {
  const { total, pageSize, currentPage, onPageChange, onPageSizeChange } =
    props;
  //总条数除以每页条数，得到总页数
  const totalPage = Math.ceil(total / pageSize);

  //根据总页数，生成一个数组，数组的长度就是总页数
  const pages = Array.from({ length: totalPage }, (v, k) => k + 1);
  //点击下一页时，当前页码加1
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };
  //点击上一页时，当前页码减1
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };
  //当页数比较多的时候，我们只显示当前页码的前后两页，其他的页码用...代替
  //比如当前页码是5，那么就显示[3,4,5,6,7]
  //如果当前页码是1，那么就显示[1,2,3,4,5]
  //如果当前页码是最后一页，那么就显示[最后一页的前4页]
  //如果总页数小于5，那么就显示所有的页码
  const renderPages = () => {
    if (totalPage <= 5) {
      return pages.map((page) => (
        <CenterBtn
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            color: page === currentPage ? "red" : "black",
          }}
        >
          {page}
        </CenterBtn>
      ));
    } else {
      if (currentPage <= 3) {
        return (
          <>
            {pages.slice(0, 5).map((page) => (
              <CenterBtn
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  color: page === currentPage ? "red" : "black",
                }}
              >
                {page}
              </CenterBtn>
            ))}
            <CenterBtn>...</CenterBtn>
          </>
        );
      } else if (currentPage >= totalPage - 2) {
        return (
          <>
            <CenterBtn>...</CenterBtn>
            {pages.slice(totalPage - 5).map((page) => (
              <CenterBtn
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  color: page === currentPage ? "red" : "black",
                }}
              >
                {page}
              </CenterBtn>
            ))}
          </>
        );
      } else {
        return (
          <>
            <CenterBtn>...</CenterBtn>
            {pages.slice(currentPage - 3, currentPage + 2).map((page) => (
              <CenterBtn
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  color: page === currentPage ? "red" : "black",
                }}
              >
                {page}
              </CenterBtn>
            ))}
            <CenterBtn>...</CenterBtn>
          </>
        );
      }
    }
  };
  return (
    <Container>
      <LeftBtn onClick={handlePrevPage}>上一页</LeftBtn>
      {renderPages()}
      <RightBtn onClick={handleNextPage}>下一页</RightBtn>
      <PageSizeSelect name="" id="" onChange={onPageSizeChange}>
        <option value="2">2条/每页</option>
        <option value="5">5条/每页</option>
        <option value="10">10条/每页</option>
      </PageSizeSelect>
      <span style={{ marginLeft: "1rem" }}>
        跳至
        <JumpTo
          onBlur={(e) => {
            const page = parseInt(e.target.value);
            if (page) {
              onPageChange(page);
            }
          }}
        />
        页
      </span>
    </Container>
  );
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default Paginate;
