import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { lessonList } from "./lesson";
console.log("🚀 ~ file: LessonTable.js:5 ~ lessonList", lessonList);

//表格数据项为周一到周五
const columns = [
  {
    title: "周一",
    dataIndex: "monday",
    key: "monday",
  },
  {
    title: "周二",
    dataIndex: "tuesday",
    key: "tuesday",
  },
  {
    title: "周三",
    dataIndex: "wednesday",
    key: "wednesday",
  },
  {
    title: "周四",
    dataIndex: "thursday",
    key: "thursday",
  },
  {
    title: "周五",
    dataIndex: "friday",
    key: "friday",
  },
];

//将二维数组lessonList中的行和列对调
const newLessonList = lessonList[0].map((col, i) =>
  lessonList.map((row) => row[i])
);
console.log("🚀 ~ file: LessonTable.js:38 ~ newLessonList", newLessonList);

//对lessonList进行处理，使其符合表格数据项的格式
const _newLessonList = [];
newLessonList.forEach((item, index) => {
  //周一到周五的数组
  const week = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const temp = {};
  //   const newItem = item.map((_item, _index) => {
  //     temp["key"] = `${index}-${_index}`;
  //     temp[week[_index]] = _item;
  //     return temp;
  //   });
  //   console.log("🚀 ~ file: LessonTable.js:53 ~ newItem ~ newItem", newItem);
  //   _newLessonList.push(...newItem);
  const len = item.length;
  for (let i = 0; i < len; i++) {
    temp["key"] = `${index}-${i}`;
    temp[week[i]] = item[i];
  }
  _newLessonList.push(temp);
});

function LessonTable(props) {
  return (
    <div>
      <Table columns={columns} dataSource={_newLessonList} pagination={false} />
    </div>
  );
}

LessonTable.propTypes = {};

export default LessonTable;
