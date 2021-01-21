import styled from 'styled-components';

const GroceryItem = styled.li`
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`;

const Item = ({ item, fetchList, toggleComplete, deleteItem }) => {
  return (
    <GroceryItem
      complete={item.isComplete}
      onClick={() => toggleComplete(item.isComplete, item._id)}
    >
      {item.name} {item.quantity}
      <button onClick={() => deleteItem(item._id)}>Delete</button>
    </GroceryItem>
  );
};

export default Item;
