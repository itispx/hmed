import React from "react";

import useAppSelector from "../../../hooks/useAppSelector";

import { selectedScheduleDay } from "../../../actions/uiActions";

import DayBubble from "../DayBubble";

interface Props {
  index: number;
}

const RenderDay: React.FC<Props> = ({ index }) => {
  const isSelected = useAppSelector((state) => state.ui.selectedScheduleDay === index);

  function selectBubble(): void {
    selectedScheduleDay(index);
  }

  return <DayBubble index={index} isSelected={isSelected} selectBubble={selectBubble} />;
};

export default RenderDay;
