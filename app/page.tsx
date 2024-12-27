import Dashboard from 'dashboard/page';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  );
}
