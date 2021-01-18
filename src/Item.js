import styled from 'styled-components';

const GroceryItem = styled.li`
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`;

const Item = ({ item, fetchList }) => {
  const toggleComplete = async function () {
    try {
      await fetch(`http://localhost:3001/list/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isComplete: item.isComplete,
        }),
      });
      fetchList();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = async function () {
    try {
      await fetch(`http://localhost:3001/list/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
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
