'use client';

import { useState } from 'react';

import Form from '@/app/components/Form';
import Lists from '@/app/components/Lists';
import { Todo } from '@/app/types/todo';

const firstTodo = [
  { id: 1, title: '할 일 1', completed: false },
  { id: 2, title: '할 일 2', completed: false },
  { id: 3, title: '할 일 3', completed: true },
];

export default function TodoApp() {
  const [todoData, setTodoData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem('todoData') || '[]');
    return savedData.length > 0 ? savedData : firstTodo;
  });

  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev: Todo[]) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

    setValue('');
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
      <div className="m-4 w-full max-w-lg rounded bg-white p-6 shadow md:w-3/4">
        <div className="mb-3 flex justify-between">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
