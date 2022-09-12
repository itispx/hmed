import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectSchedule } from "../../../redux-store/redux-slices/ui-slice";

import DayBubble from "../DayBubble";

const RenderDays = ({ index }) => {
  const isSelected = useSelector(
    (state) => state.ui.selectedSchedule === index
  );

  const dispatch = useDispatch();

  function selectBubble() {
    dispatch(selectSchedule({ index }));
  }

  return (
    <DayBubble
      index={index}
      isSelected={isSelected}
      selectBubble={selectBubble}
    />
  );
};

export default RenderDays;
