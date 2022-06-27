import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getTodoResponse, Todo, TodoResponse } from '../lib/todos';

export default function Home({ todoList }: { todoList: Todo[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {todoList.map((todo) => {
            return (
              <>
                <div>{todo.ID}</div>
                <div>{todo.Title}</div>
                <div>{todo.Description}</div>
                <div>{todo.Finished ? 'Finished!' : "Don't Finish"}</div>
              </>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const todoList = await getTodoResponse();

  return { props: { todoList } };
};
