import Head from 'next/head';
import React from 'react';

const Header = ({title}:{title:React.ReactNode}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default Header