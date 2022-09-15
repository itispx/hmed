import React from "react";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { selectSchedule } from "../../../redux-store/redux-slices/ui-slice";

import DayBubble from "../DayBubble";

interface Props {
  index: number;
}

const RenderDays: React.FC<Props> = ({ index }) => {
  const isSelected = useAppSelector(
    (state) => state.ui.selectedSchedule === index
  );

  const dispatch = useAppDispatch();

  function selectBubble(): void {
    dispatch(selectSchedule({ index }));
  }

  return (
    <DayBubble
      index={index}
      isSelected={isSelected}
      selectBubble={selectBubble}
      height={0}
      fontSize={0}
    />
  );
};

export default RenderDays;
