const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

//本地模拟promise请求
const getTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("run");
      resolve({
        total: data.length,
        data,
      });
    }, 1000);
  });
};

export { getTableData, columns, data };
