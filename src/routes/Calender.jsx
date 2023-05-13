import { useEffect, useState } from 'react';

import Body from '@/components/Body';
import Head from '@/components/Head';

const YMD = new Date();
const year = YMD.getFullYear();
const month = YMD.getMonth() + 1;

export default function Calender() {
  const [whatMonth, setWhatMonth] = useState(month);
  const [totalDates, setTotalDates] = useState(0);

  function generateCalender(month) {
    const prevDates = new Date(year, month - 1, 0);
    const lastDates = new Date(year, month, 0);

    let beforeDates = [];
    for (let i = 0; i < prevDates.getDay() + 1; i++) {
      beforeDates.unshift(prevDates.getDate() - i);
    }

    let nextDates = [];
    for (let i = 1; i < 7 - lastDates.getDay(); i++) {
      if (i === 0) {
        return nextDates;
      }
      nextDates.push(i);
    }

    let thisDates = [];
    thisDates = [...Array(lastDates.getDate() + 1).keys()].slice(1);

    return beforeDates.concat(thisDates, nextDates);
  }
  //console.log(generateCalender(month));
  useEffect(() => {
    console.log(generateCalender(month));
    setTotalDates(generateCalender(month));
  }, [whatMonth]);

  return (
    <div className="container">
      <Head setWhatMonth={setWhatMonth} month={month} />
      <Body totalDates={totalDates} month={month} />
    </div>
  );
}
