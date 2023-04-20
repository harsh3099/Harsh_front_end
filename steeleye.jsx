import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ index, selected, onClick, text }) => {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <li
      style={{ backgroundColor: selected ? 'green' : 'white' }}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const List = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleItemClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const listItems = useMemo(() => {
    return items.map((item, index) => (
      <ListItem
        key={index}
        onClick={handleItemClick}
        text={item.text}
        index={index}
        selected={selectedIndex === index}
      />
    ));
  }, [handleItemClick, items, selectedIndex]);

  return <ul>{listItems}</ul>;
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;