import Head from 'next/head';
import Dashboard from './dashboard/page';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main className="my-10 mx-4 flex flex-col flex-grow">
        <Dashboard />
      </main>
    </>
  );
}
