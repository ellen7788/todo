import { Box, Button, Checkbox, Paper, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import { getOneTodoResponse, Todo } from '../lib/todos';
import Snackbar from '@mui/material/Snackbar';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export default function Edit({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState(todo.Title);
  const [description, setDescription] = useState(todo.Description);
  const [finished, setFinished] = useState(todo.Finished);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleFinishedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinished(event.target.checked);
  };
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  const SaveButtonClicked = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const sendingTodo: Todo = { ID: todo.ID, Title: title, Description: description, Finished: finished };
    // const res = await fetch('/api/insert', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(sendingTodo),
    // });

    // if (res.status == 200) {
    //   setOpenSuccess(true);
    //   Router.push('/');
    // } else {
    //   setOpenError(true);
    // }
  };
  const DeleteButtonClicked = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ID: todo.ID }),
    });

    if (res.status == 200) {
      setOpenSuccess(true);
      Router.push('/');
    } else {
      setOpenError(true);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Adding New ToDo</title>
      </Head>
      <Box>
        <Box fontSize={24}>Title</Box>
        <Box sx={{ width: '95%', mx: 'auto', my: 1 }}>
          <TextField id="title" variant="standard" sx={{ width: '100%' }} value={title} onChange={handleTitleChange} />
        </Box>
        <Box fontSize={24}>Description</Box>
        <Box sx={{ width: '95%', mx: 'auto', my: 1 }}>
          <TextField
            id="description"
            variant="standard"
            multiline
            sx={{ width: '100%' }}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box fontSize={24}>Finished</Box>
        <Checkbox checked={finished} onChange={handleFinishedChange} />
      </Box>
      <Button variant="contained" sx={{ mx: 4, my: 1, float: 'right' }} onClick={SaveButtonClicked}>
        保存
      </Button>
      <Button variant="contained" color="error" sx={{ my: 1, float: 'right' }} onClick={DeleteButtonClicked}>
        削除
      </Button>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose} message={'Success'} />
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose} message={'Error'} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const id = Number(context.query.id);
  const todo = await getOneTodoResponse(id);

  return { props: { todo } };
};
