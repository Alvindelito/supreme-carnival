import styled from 'styled-components';
import axios from 'axios';

const GroceryItem = styled.li`
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`;

const Item = ({ item, fetchList }) => {
  const toggleComplete = async function () {
    try {
      await axios.put(`http://localhost:3001/list/${item._id}`, {
        isComplete: item.isComplete,
      });
      fetchList();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = async function () {
    try {
      await axios.delete(`http://localhost:3001/list/${item._id}`);
      fetchList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GroceryItem complete={item.isComplete} onClick={() => toggleComplete()}>
      {item.name} {item.quantity}
      <button onClick={() => deleteItem()}>Delete</button>
    </GroceryItem>
  );
};

export default Item;
