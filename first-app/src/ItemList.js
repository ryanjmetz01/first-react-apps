import React from 'react'
import LineItem from './LineItem'

const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
        {items.map((item) => (
           <LineItem 
                // each item needs to have its own key
                key={item.id}
                item={item}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
                ))}
            </ul>
  )
}

export default ItemList