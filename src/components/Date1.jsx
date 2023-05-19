import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '@/store/store';

// 해당 날짜 투두 개수 출력
export default function Date1({
  year,
  month,
  thisMonth,
  date,
  todo: todolist,
}) {
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  const id = year + '' + month + '' + date;
  const preview = todolist.filter((todo) => String(todo.order).includes(id));
  const { value } = useContext(Context);

  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${
        thisMonth === +month ? '' : `${value ? 'dark-mode--gray' : 'gray'}`
      } ${TODAY === date ? 'today' : ''} ${value ? 'dark-mode--bc' : ''}`}
    >
      <div className="date">{date}</div>
      {preview
        ? preview.map((v) => (
            <div
              key={v.order}
              className={`preview ${v.done ? 'done' : ''} ${
                value ? 'dark' : ''
              }`}
            >
              {v.title}
            </div>
          ))
        : 'test'}
    </Link>
  );
}
