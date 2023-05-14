import { useRef } from 'react';
import { deleteApi } from '@/api/api';

export default function TodoItem({ todo, id, created, updated, done }) {
  const check = useRef(false);
  async function removeTodo() {
    const res = await deleteApi(id);
    console.log(res);
  }
  return (
    <div>
      <input
        type="checkbox"
        value={check}
        onChange={() => {
          !check;
          done(!check);
        }}
      />
      <div className="time">
        <span>{created}</span>
        <span>{updated}</span>
      </div>
      <div className="todo">{todo}</div>
      <div className="btnGroup">
        <button>edit</button>
        <button onClick={removeTodo}>delete</button>
      </div>
    </div>
  );
}
