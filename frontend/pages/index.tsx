import Head from 'next/head';
import Router from 'next/router';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getTodoResponse, Todo, TodoResponse } from '../lib/todos';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function Home({ todoList }: { todoList: Todo[] }) {
  const router = useRouter();

  const handleCheckbox = async (id: number) => {
    const sendingTodo: Todo = todoList.find((todo) => todo.ID === id);
    sendingTodo.Finished = !sendingTodo.Finished;
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendingTodo),
    });

    if (res.status == 200) {
      // setOpenSuccess(true);
      // Router.push('/');
    } else {
      // setOpenError(true);
    }
  };
  const handleEditButton = (id: number) => {
    router.push({
      pathname: '/edit',
      query: { id: id },
    });
  };

  const AddButtonClicked = () => {
    Router.push('/add');
  };

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
        <h2 className={utilStyles.headingLg}>TODO List</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Finished</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.map((row) => (
                <TableRow key={row.ID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.ID}
                  </TableCell>
                  <TableCell align="left">{row.Title}</TableCell>
                  <TableCell align="left">{row.Description}</TableCell>
                  <TableCell align="center">
                    {row.Finished ? (
                      <Checkbox defaultChecked onChange={() => handleCheckbox(row.ID)} />
                    ) : (
                      <Checkbox onChange={() => handleCheckbox(row.ID)} />
                    )}
                    {/* <Checkbox checked={row.Finished} onChange={() => handleCheckbox(row.ID)} /> */}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="secondary" size="small" onClick={() => handleEditButton(row.ID)}>
                      編集
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" sx={{ mx: 4, my: 1, float: 'right' }} onClick={AddButtonClicked}>
          追加
        </Button>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const todoList = await getTodoResponse();

  return { props: { todoList } };
};
