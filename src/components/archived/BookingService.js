import React, {useState} from 'react';
import ListComponentWithActions from './ListComponentWithActions';
import DetailsComponent from './DetailsComponent ';


const BookingService = () => {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleActionClick = (item) => {
    // Perform action with selected item
    console.log(`Action taken on ${item.name}`);
  };

  const items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' }
  ];

  return (
    <div>
      <ListComponentWithActions  items={items} onItemClick={handleItemClick} onActionClick={handleActionClick} />
    </div>
  );
};

export default BookingService