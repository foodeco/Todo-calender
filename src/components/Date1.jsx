import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../store/store';

// 해당 날짜 투두 개수 출력
export default function Date1({ year, month, thisMonth, date }) {
  //const MONTH = new Date().getMonth() + 1;
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  const id = year + '' + month + '' + date;
  const { value } = useContext(Context);
  console.log(value);
  console.log(id);
  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${thisMonth === +month ? '' : 'gray'} ${
        TODAY === date ? 'today' : ''
      }`}
    >
      {<div className="date">{date}</div>}
      <div>
        {value.map((v) => {
          if (v.order / 10 === +id) {
            return <div key={v.id}>{v.title}</div>;
          }
        })}
      </div>
    </Link>
  );
}
