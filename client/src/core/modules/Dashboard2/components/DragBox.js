import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import Board from './Board';

const DragBox = ({ item, _i }) => {
  const [isDisabled, setDisableState] = useState(false);

  return (
    <Draggable isDragDisabled={isDisabled} key={item._id} draggableId={item._id} index={_i}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Board isDisabled={isDisabled} setDisableState={setDisableState} chartData={item} />
        </div>
      )}
    </Draggable>
  );
};

export default DragBox;
