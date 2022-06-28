import { backendBaseUrl } from '../components/url';

export type TodoResponse = {
  id: {
    data: Todo;
  };
};

export type Todo = {
  ID: number;
  Title: string;
  Description: string;
  Finished: boolean;
};

type Id = {
  ID: number;
};

export const getTodoResponse = async (): Promise<Todo[]> => {
  const res = await fetch(backendBaseUrl + '/todo');
  const data: TodoResponse = await res.json();

  const dataList: Todo[] = [];

  Object.keys(data).map((key) => {
    dataList.push(data[key]);
  });

  return dataList;
};

export const getOneTodoResponse = async (id: number): Promise<Todo> => {
  const body: Id = { ID: id };

  const res = await fetch(backendBaseUrl + '/oneTodo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data: Todo = await res.json();

  return data;
};
