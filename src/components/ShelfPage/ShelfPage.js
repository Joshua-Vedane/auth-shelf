import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, Grid, Button } from '@material-ui/core';
// import {DeleteIcon} from '@material-ui/icons';

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((state) => state.shelf);
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  //display all shelf items
  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    dispatch({
      type: 'ADD_ITEM',
      payload: { description: newDescription, image_url: newImage },
    });
    setNewDescription('');
    setNewImage('');
  };

  const handleDelete = () => {
    console.log('clicked handleDelete');
    dispatch ({type: 'DELETE_ITEM', payload: {item_id: shelfItem.id}})
  }

  return (
    <>
      <div className="addShelfItem">
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            ></input>
          </label>
          Image URL
          <label htmlFor="itemImage">
            <input
              type="text"
              id="itemImage"
              value={newImage}
              onChange={(event) => setNewImage(event.target.value)}
            ></input>
          </label>
          <input type="submit"></input>
        </form>
      </div>
      <Box p={3} display="flex" justifyContent="center" flexWrap="wrap">
        {shelf.map((shelfItem) => {
          return (
            <Box m={2} key={shelfItem.id}>
              <Paper elevation={4}>
                <Box width={300} height={300} p={3}>
                  <Grid container direction="column" align="center" spacing={3}>
                    <Grid item>
                      <Typography variant="h5">
                        {shelfItem.description}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img src={shelfItem.image_url} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      // startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                     Delete
                    </Button>
                  </Grid>
                </Box>

              </Paper>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default ShelfPage;
