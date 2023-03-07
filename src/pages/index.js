/* // por el momento no se usan 
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
*/

import Header from '../components/Header';
import Welcome from '@containers/Welcome';

export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
    </>
  );
}
