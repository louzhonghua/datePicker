//给出课程名称、每周授课节数、主科还是副科，以及主科必须排上午、不排最后一节、同一天一门课只讲一节等等规则，写一个程序，自动按规则排课，输出课程表。
const lesson = [
  {
    name: "语文",
    time: 6,
    isMain: true,
  },
  {
    name: "数学",
    time: 6,
    isMain: true,
  },
  {
    name: "英语",
    time: 6,
    isMain: true,
  },
  {
    name: "物理",
    time: 4,
    isMain: false,
    isMorning: true,
  },
  {
    name: "化学",
    time: 4,
    isMain: false,
  },
  {
    name: "生物",
    time: 4,
    isMain: false,
  },
  {
    name: "历史",
    time: 4,
    isMain: false,
  },
  {
    name: "地理",
    time: 4,
    isMain: false,
  },
  {
    name: "政治",
    time: 2,
    isMain: false,
  },
];
//初始化5*8的二维数组
const lessonList = new Array(5).fill(0).map(() => new Array(8).fill(0));

const main = lesson.filter((item) => item.isMain);
const sub = lesson.filter((item) => !item.isMain);
//按照主科必须排在上午、同一天一门课只讲一节的规则，排主科
main.forEach((item) => {
  let time = item.time;
  while (time > 0) {
    let day = Math.floor(Math.random() * 5);
    let lesson = Math.floor(Math.random() * 4);
    if (lessonList[day][lesson] === 0) {
      lessonList[day][lesson] = item.name;
      time--;
    }
  }
});
//剩余的时间，随机排课
lessonList.forEach((lesson) => {
  lesson.forEach((item, index) => {
    if (item === 0) {
      let lessonIndex = Math.floor(Math.random() * sub.length);
      lesson[index] = sub[lessonIndex].name;
    }
  });
});

export { lessonList };
