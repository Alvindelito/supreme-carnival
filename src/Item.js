import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  complete: {
    textDecoration: 'line-through',
  },
  incomplete: {
    textDecoration: 'none',
  },
});

const Item = ({ item, fetchList }) => {
  const classes = useStyles();

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
    <li
      onClick={() => toggleComplete()}
      className={item.isComplete ? classes.complete : classes.incomplete}
    >
      {item.name} {item.quantity}
      <button onClick={() => deleteItem()}>Delete</button>
    </li>
  );
};

export default Item;
