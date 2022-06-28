import { Box, Button, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import { Todo } from '../lib/todos';
import Snackbar from '@mui/material/Snackbar';

export default function Add() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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
  const AddButtonClicked = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const sendingTodo: Todo = { ID: 0, Title: title, Description: description, Finished: false };
    const res = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendingTodo),
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
      <Box fontSize={24}>Title</Box>
      <Box sx={{ width: '95%', mx: 'auto', my: 1 }}>
        <TextField id="title" variant="standard" sx={{ width: '100%' }} onChange={handleTitleChange} />
      </Box>
      <Box fontSize={24}>Description</Box>
      <Box sx={{ width: '95%', mx: 'auto', my: 1 }}>
        <TextField
          id="description"
          variant="standard"
          multiline
          sx={{ width: '100%' }}
          onChange={handleDescriptionChange}
        />
      </Box>
      <Button variant="contained" sx={{ mx: 4, my: 1, float: 'right' }} onClick={AddButtonClicked}>
        追加
      </Button>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose} message={'Success'} />
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose} message={'Error'} />
    </Layout>
  );
}
