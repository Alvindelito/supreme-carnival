import { useEffect, useState } from 'react';
import GroceryList from './GroceryList';
import GroceryForm from './GroceryForm';

import axios from 'axios';

function App() {
  const [groceries, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get('/list');
      setGroceryList(await response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async function (complete, id) {
    try {
      await axios.put(`/list/${id}`, {
        isComplete: complete,
      });
      fetchList();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = async function (id) {
    try {
      await axios.delete(`/list/${id}`);
      fetchList();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchList();
    setLoading(false);
  }, []);

  return (
    <div>
      <h1>Grocery List</h1>
      <GroceryForm fetchList={fetchList} />
      {loading ? (
        <h3>loading</h3>
      ) : (
        <GroceryList
          groceries={groceries}
          fetchList={fetchList}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
}

export default App;
