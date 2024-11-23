'use client';

import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('@/app/components/TodoApp'), {
  ssr: false,
});

const page = () => {
  return <TodoApp />;
};
export default page;
