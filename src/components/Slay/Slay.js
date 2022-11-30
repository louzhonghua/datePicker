import React, { useState } from "react";
import PropTypes from "prop-types";
import PlayerCard from "./PlayerCard";
import FightArea from "./FightArea";
import styled from "styled-components";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

//父容器flex布局，子容器flex布局，子容器的flex布局属性为flex: 1 1 0;
//子元素以中间为对称点，两边的元素呈弧形对称分布
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Slay(props) {
  const { setNodeRef } = useDroppable({ id: "droppable" });
  const [activeId, setActiveId] = useState(null);
  //生成填充PlayerCard的数据，属性分别为name、detail、cost
  let iniCardList = [];
  const cardNum = 5;
  for (let i = 0; i < cardNum; i++) {
    iniCardList.push({
      id: i.toString(),
      name: "name" + i,
      detail: "detail" + i,
      cost: i,
    });
  }
  //获取iniCardList中的id，生成一个数组
  const iniCardIdList = iniCardList.map((item) => item.id);

  const [cardList, setCardList] = useState(iniCardList);
  const draggableMarkup = (
    <Container ref={setNodeRef}>
      {
        //遍历cardList，生成PlayerCard
        cardList.map((item) => {
          return <PlayerCard key={item.id} id={item.id} {...item} />;
        })
      }
    </Container>
  );
  const handleDragStart = ({ active }) => setActiveId(active.id);
  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(
      "🚀 ~ file: Slay.js ~ line 48 ~ handleDragEnd ~ active, over",
      active,
      over
    );
    //只需要按照交换的id，交换cardList中的元素顺序
    if (active.id !== over.id) {
      const oldIndex = cardList.findIndex((item) => item.id === active.id);
      const newIndex = cardList.findIndex((item) => item.id === over.id);
      const newCardList = [...cardList];
      //交换位于oldIndex和newIndex的元素
      [newCardList[oldIndex], newCardList[newIndex]] = [
        newCardList[newIndex],
        newCardList[oldIndex],
      ];
      setCardList(newCardList);
      console.log(
        "🚀 ~ file: Slay.js ~ line 59 ~ handleDragEnd ~ newCardList",
        newCardList
      );
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {/* <Droppable>{isDropped ? draggableMarkup : <FightArea />}</Droppable>
      {!isDropped ? draggableMarkup : null} */}
      {/* item选项为iniCardList中的id数组 */}
      <SortableContext
        id={"1"}
        items={iniCardIdList}
        strategy={rectSortingStrategy}
      >
        {draggableMarkup}
      </SortableContext>
      <DragOverlay>
        {activeId ? <PlayerCard id={activeId} dragOverlay /> : null}
      </DragOverlay>
      <FightArea />
    </DndContext>
  );
}

Slay.propTypes = {};

export default Slay;
