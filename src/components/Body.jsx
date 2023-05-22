import styles from './Body.module.scss';
import Date1 from './Date1';
import { getApi } from '@/api/api';
import { useEffect, useState } from 'react';

export default function Body({ totalDates, year, month }) {
  const firstDate = Array.isArray(totalDates) ? totalDates.indexOf(1) : '';
  const lastDate = Array.isArray(totalDates) ? totalDates.indexOf(1, 8) : '';
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getApi(); // array
      setTodo(res);
    })();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {totalDates
          ? totalDates.map((date, idx) => {
              if (idx < firstDate) {
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month - 1}
                    thisMonth={month}
                    date={date}
                    todos={todo}
                  />
                );
              } else if (lastDate > 0 && idx >= lastDate) {
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month + 1}
                    thisMonth={month}
                    date={date}
                    todos={todo}
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
                  todos={todo}
                />
              );
            })
          : ''}
      </div>
    </>
  );
}
