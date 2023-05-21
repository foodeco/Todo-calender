import { useEffect, useState, useCallback, useContext } from 'react';
import Body from '@/components/Body';
import Head from '@/components/Head';
import generateCalendar from '@/common/calendar';
import Context from '@/store/store';

export default function Calendar() {
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);
  const [totalDates, setTotalDates] = useState(0);
  const body = document.body;
  const { value } = useContext(Context);
  useEffect(() => {
    body.style.backgroundColor = value
      ? 'rgba(0, 0, 0, 0.96)'
      : 'rgba(255, 253, 244, 0.96)';
  }, [value]);
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
