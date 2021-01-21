import Item from './Item';

const GroceryList = ({ groceries, fetchList, toggleComplete, deleteItem }) => {
  return (
    <ul>
      {groceries.map((item, index) => (
        <Item
          key={index}
          item={item}
          fetchList={fetchList}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
};

export default GroceryList;
