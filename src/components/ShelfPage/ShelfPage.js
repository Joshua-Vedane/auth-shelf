import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();

  const [newDescription, setNewDescription] =useState('');
  const [newImage, setNewImage] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    dispatch({type: 'ADD_ITEM', payload: {description: newDescription, image_url: newImage }})
    setNewDescription('');
    setNewImage('');
  }
  
  return (
    <>
    <div className="addShelfItem">
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">
          Description
          <input
          type="text"
          id = "description"
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          >
          </input>
        </label>
        Image URL
        <label htmlFor="itemImage">
          <input
          type="text"
          id = "itemImage"
          value={newImage}
          onChange={(event) => setNewImage(event.target.value)}
          >
          </input>
        </label>
        <input type="submit"></input>
      </form>

    </div>


    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    </div>
    </>
  );
}

export default ShelfPage;
