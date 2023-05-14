import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// 해당 날짜 투두 개수 출력
export default function Date({ year, month, date }) {
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  const id = year + '' + month + '' + date;
  return (
    <Link to={`/todo/${id}`}>
      {<div>{date}</div>}
      <div></div>
    </Link>
  );
}
