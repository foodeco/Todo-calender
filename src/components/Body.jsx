import styles from './Body.module.scss';
import Date1 from './Date1';
import { getApi } from '@/api/api';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Body({ totalDates, year, month }) {
  const firstDate = Array.isArray(totalDates) ? totalDates.indexOf(1) : '';
  const lastDate = Array.isArray(totalDates) ? totalDates.indexOf(1, 7) : '';
  console.log(firstDate, lastDate);
  console.log(year, month);
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getApi(); // array
      setTodo(res);
      console.log(res);
    })();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {totalDates
          ? totalDates.map((date, idx) => {
              if (idx < firstDate) {
                console.log(todo);
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month - 1}
                    thisMonth={month}
                    date={date}
                    todo={todo}
                  />
                );
              } else if (idx >= lastDate) {
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month + 1}
                    thisMonth={month}
                    date={date}
                    todo={todo}
                  />
                );
              }
              return (
                <Date1
                  key={idx}
                  year={year}
                  month={month}
                  thisMonth={month}
                  date={date}
                  todo={todo}
                />
              );
            })
          : ''}
      </div>
    </>
  );
}
