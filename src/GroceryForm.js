import { useState } from 'react';

const GroceryForm = ({ fetchList }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const addGrocery = async function (e) {
    e.preventDefault();
    await fetch('http://localhost:3001/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
      }),
    });
    fetchList();
    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={(e) => addGrocery(e)}>
      <label>Name: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default GroceryForm;
