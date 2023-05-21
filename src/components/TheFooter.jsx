import { useContext } from 'react';
import Context from '@/store/store';
import styles from '@/styles/TheFooter.module.scss';

export default function TheFooter() {
  const { value } = useContext(Context);
  const info = {
    github: 'https://github.com/foodeco',
    email: 'tjehddnr997@gmail.com',
  };
  return (
    <footer className={value ? 'dark-mode--bc' : ''}>
      <div>
        <a
          href={info.github}
          target="_blank"
          rel="noopenr noreferrer"
          id="github"
          className={`btn ${styles.github}`}
        />
        <a
          href={`mailto:${info.email}`}
          id="email"
          className={`btn ${styles.email}`}
        />
      </div>
    </footer>
  );
}
