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

export const getTodoResponse = async (): Promise<Todo[]> => {
  const res = await fetch('http://backend:8080/todo');
  const data: TodoResponse = await res.json();

  const dataList: Todo[] = [];

  Object.keys(data).map((key) => {
    dataList.push(data[key]);
  });

  return dataList;
};
