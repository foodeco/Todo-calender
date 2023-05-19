import { useContext } from 'react';
import Context from '@/store/store';

export default function TheFooter() {
  const { value } = useContext(Context);
  return <footer className={value ? 'dark-mode--bc' : ''}>footer line</footer>;
}
