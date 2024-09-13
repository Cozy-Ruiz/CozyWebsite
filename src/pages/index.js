import React from 'react';

import Header from '@components/Header';
import Welcome from '@containers/Welcome';
import stylesGlobal from '@styles/StylesGlobal.module.scss';

export default function Home() {
  return (
    <>
      <section className={stylesGlobal['main-container']}>
        <Header />
        <Welcome />
      </section>
    </>
  )
}
