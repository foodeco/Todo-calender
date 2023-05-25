import { useEffect, useState, useCallback } from 'react';
import Body from '@/components/Body';
import Head from '@/components/Head';
import generateCalendar from '@/common/calendar';

export default function Calendar() {
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);
  const [totalDates, setTotalDates] = useState([]);
  const makeCalendar = useCallback(
    (month) => {
      setTotalDates(generateCalendar(month));
    },
    [whatMonth]
  );
  useEffect(() => {
    if (!whatMonth) {
      setWhatYear(whatYear - 1);
      setWhatMonth(12);
    } else if (whatMonth > 12) {
      setWhatYear(whatYear + 1);
      setWhatMonth(1);
    }
    makeCalendar(whatMonth);
  }, [whatMonth]);

  return (
    <div className="container">
      <Head setWhatMonth={setWhatMonth} year={whatYear} month={whatMonth} />
      <Body totalDates={totalDates} year={whatYear} month={whatMonth} />
    </div>
  );
}
