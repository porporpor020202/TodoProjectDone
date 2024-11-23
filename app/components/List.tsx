'use client';

import { DraggableStateSnapshot } from '@hello-pangea/dnd';
import { DraggableProvided } from '@hello-pangea/dnd';
import { useState } from 'react';

import { Todo } from '@/app/types/todo';

const List = ({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
}: {
  id: number;
  title: string;
  completed: boolean;
  todoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const handleClick = (id: number) => {
    const newTodoData = todoData.filter((data: Todo) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleCompleteChange = (id: number) => {
    const newTodoData = todoData.map((data: Todo) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = () => {
    const newTodoData = todoData.map((data: Todo) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="my-1 flex w-full items-center justify-between rounded border bg-gray-100 px-4 py-1 text-gray-600">
        <form onSubmit={handleSubmit}>
          <input
            className="mr-4 w-full appearance-none px-3 py-2 text-gray-500"
            value={editedTitle}
            onChange={handleEditChange}
            autoFocus
          />
        </form>
        <div className="flex items-center">
          <button className="px-4 py-2" onClick={handleSubmit} type="submit">
            save
          </button>
          <button className="px-4 py-2" onClick={() => handleClick(id)}>
            x
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} my-2 flex w-full items-center justify-between rounded border px-4 py-1 text-gray-600`}
      >
        <div>
          <input
            type="checkbox"
            onChange={() => handleCompleteChange(id)}
            defaultChecked={completed}
          />
          <span className={completed ? 'line-through' : undefined}>
            {title}
          </span>
        </div>
        <div className="flex items-center">
          <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
            edit
          </button>
          <button className="px-4 py-2" onClick={() => handleClick(id)}>
            x
          </button>
        </div>
      </div>
    );
  }
};
export default List;
