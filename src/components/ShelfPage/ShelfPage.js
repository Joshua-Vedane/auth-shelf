import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, Grid } from '@material-ui/core';

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((state) => state.shelf);

  //display all shelf items
  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, []);

  return (
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
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}

export default ShelfPage;
