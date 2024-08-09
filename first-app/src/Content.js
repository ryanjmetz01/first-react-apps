import React from 'react'
import ItemList from './ItemList';

const Content = ({items, handleCheck, handleDelete}) => {
// ------------------------------------------------------------------
    /* name is like a getter, setName is setter
    'Dave' is the default state 
    use const because we do not want to change the state directly */
// ------------------------------------------------------------------
    /* const [name, setName] = useState('Dave'); 
    const [count, setCount] = useState(0); 

    const handleNameChange = () => {
        const names = ['Bob', 'Kevin', 'Dave']; 
        const int = Math.floor(Math.random() * 3); 
        setName(names[int]) 
    } */

// ------------------------------------------------------------------
    /* logs the state of the state that is passed into the function
    even if we have two count + 1 still only increments by 1 as the count 
    value will stay the same as it is the current state  */
// ------------------------------------------------------------------

/*     const handleClick = () => {
        setCount(count + 1)
        console.log(count)
    }

    const handleClick2 = () => {
        console.log(count)
    } */

// ------------------------------------------------------------------
    /* getting the target of the event (button)
    and its inner text */
// ------------------------------------------------------------------

/*     const handleClick3 = (e) => {
        console.log(e.target.innerText)
    }  */
// ------------------------------------------------------------------


// ------------------------------------------------------------------

  return (
    // no word in the tags makes it become a fragment, took the main element out to the app component
    <>
        {items.length ? (
            <ItemList
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
        ) : (
            <p style={{marginTop: '2rem'}}> Your list is empty</p>
        )}


        {/* <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change name</button> */}
{/* ------------------------------------------------------------------ */}
        {/* using an annoomous function to pass in variables*/}
{/* ------------------------------------------------------------------ */}
      {/*   <button onClick={handleClick}>Click it</button> */}
{/* ------------------------------------------------------------------ */}
        {/* passing in the event */}
{/* ------------------------------------------------------------------ */}
      {/*   <button onClick={handleClick2}>Click it</button> */}
    </>
  )
}

export default Content