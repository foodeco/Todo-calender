import { useState, useEffect } from 'react';
import { postApi, getApi, deleteApi } from '../api/api';

export default function Todo() {
  const [todo, setTodo] = useState('');

  useEffect(() => {
    (async () => {
      //await postApi();
      const ids = await getApi();
      console.log(ids);
      //deleteApi(ids[0].id);
    })();
  }, []);
  /*(async () => {
    const id = await getApi();
    console.log('id ', id);
    deleteApi(id);
  })();*/
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
          console.log(todo);
        }}
        value={todo}
      />
    </>
  );
}
