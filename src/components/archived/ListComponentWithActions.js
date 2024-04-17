import React from 'react';

const ListComponentWithActions  = ({ items, onItemClick, onActionClick }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span onClick={() => onItemClick(item)}>{item.name}</span>
          <button onClick={() => onActionClick(item)}>Take Action</button>
        </li>
      ))}
    </ul>
  );
};

export default ListComponentWithActions ;