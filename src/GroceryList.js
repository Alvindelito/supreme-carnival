import { useState, useEffect } from 'react';
import GroceryForm from './GroceryForm';
import Item from './Item';

const GroceryList = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const response = await fetch('http://localhost:3001/list');
    const groceries = await response.json();
    setGroceryList(await groceries);
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
