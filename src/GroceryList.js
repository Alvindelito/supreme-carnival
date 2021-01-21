import { useState, useEffect } from 'react';
import GroceryForm from './GroceryForm';
import Item from './Item';
import axios from 'axios';

const GroceryList = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get('/list');
      setGroceryList(await response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
    setLoading(false);
  }, []);

  return (
    <div>
      <GroceryForm fetchList={fetchList} />
      <ul>
        {loading ? (
          <h3>loading</h3>
        ) : (
          groceryList.map((item, index) => (
            <Item key={index} item={item} fetchList={fetchList} />
          ))
        )}
      </ul>
    </div>
  );
};

export default GroceryList;
