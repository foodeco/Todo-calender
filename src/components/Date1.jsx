import { Link } from 'react-router-dom';

// 해당 날짜 투두 개수 출력
export default function Date1({
  year,
  month,
  thisMonth,
  date,
  todo: todolist,
}) {
  //const MONTH = new Date().getMonth() + 1;
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  const id = year + '' + month + '' + date;
  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${thisMonth === +month ? '' : 'gray'} ${
        TODAY === date ? 'today' : ''
      }`}
    >
      <div className="date">{date}</div>
      {todolist.map((todo) => {
        if (String(todo.order).includes(id)) {
          return (
            <div
              key={todo.order}
              className={`preview ${todo.done ? 'done' : ''}`}
            >
              {todo.title}
            </div>
          );
        }
      })}
    </Link>
  );
}
