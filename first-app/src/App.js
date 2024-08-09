import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItems from './AddItems';
import SearchItems from './SearchItems';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'; 

  /* 
    moved the const and the next two functions from content.js 
    to demonstrate prop drilling as we want to use them in both 
    content and in footer
  */ 
  // || [] solves the filer on empty list error
  // --------------------------------------------------------------------------------
            // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  // ----------------------------------------------------------------------------------
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState('');   
  const [search, setSearch] = useState(''); 
  const [fetchError, setFetchError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  // at load time (after comma, empty brackets means only at load time), 
  // load thge shopping list from local storage
  // never set items inside use Effect
  // good way to load it in if using API, better way for local storage
  // ---------------------------------------------------------------
      // useEffect(() => {
      //   setItems(JSON.parse(localStorage.getItem('shoppinglist')))
      // }, [])
  // --------------------------------------------------------------

  // will run at load time and whenever items state is updated 
  // will make the app for effcient 
  // --------------------------------------------------------------
              // useEffect(() => {
                // save to local storage
              //   localStorage.setItem('shoppinglist', JSON.stringify(items));
              // }, [items])
  // -------------------------------------------------------------------

  useEffect(() => {

    // using async won't block other code from running 
    // returns a 'promise' that code will resolve at some point 
    // reading the items from the API
    const fetchItems = async () => {
      try {
        // try to get a response from the API
        const response = await fetch(API_URL);
        // use html error codes to check if our feth was ok
        if (!response.ok) throw Error('Did not receieve expected data'); 
        // we get one so convert to json
        const listItems = await response.json(); 
        // set listItems to the response
        setItems(listItems); 
        setFetchError(null); 
      } catch (err) {
        // this will not catch the error have to use state
              // console.log(err.stack); 
        setFetchError(err.message); 
      }
      // once this async block is done 
      // set that loading is done
      finally {
        setIsLoading(false); 
      }
    }
    
    // fetchItems does not return a value so 
    // this is not required 
    // if it does return a value feels like we would need this
    // ----------------------------------------------------
          // (async () => await fetchItems())()
    // -----------------------------------------------------

    // use to simulate API taking a longer time to 
    // load in data (waiting two seconds)
    // this is normally bad 
    setTimeout(() => {
      fetchItems()
    }, 2000)

    

  }, [])

  const addItem =  async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; 
    const myNewItem = { id, checked: false, item }; 
    const listItems = [...items, myNewItem]; 
    setItems(listItems); 

    // post means updating or creating data on the server 
    // headers gives additional information that is sent with the request 
    // content-type tells the server that json data is being sent
    // body contains the actually data that is being sent 
    // stringify converts data into a string, data must be a string in order to be sent 
    const postOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions); 
    if (result) setFetchError(result); 
  }


  const handleCheck = async (id) => {
  // ------------------------------------------------------------------
      // `` are used to allow for elements to be directly used in a string
      /*  check if item id is the same as id that is clicked 
          and change the checked field in item if so*/
  // ------------------------------------------------------------------
    const listItems = items.map((item) => item.id === id ? { ...item, checked : !item.checked} : item); 
    setItems(listItems);  
  // ------------------------------------------------------------------

    // do not need to chnage checked property in this block as we did it above 
    const myItem = listItems.filter((item) => item.id === id); 
    // PATCH is the method that is used for updates 
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      // change the checked field to whatever we set it to above (filter creaets an array)
      body: JSON.stringify({ checked: myItem[0].checked })
    }

    // have to use a differnt url for patch 
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    // will only have a non-null result if we throw an error 
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id); 
    setItems(listItems); 


    const deleteOptions = { method: 'DELETE' };
    const reqURL = `${API_URL}/${id}`; 
    const result = await apiRequest(reqURL, deleteOptions); 
    // will only have a non-null result if we throw an error 
    if (result) setFetchError(result); 
  } 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(!newItem) return; 
    addItem(newItem); 
    setNewItem(''); 
    console.log('submited')
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItems 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}/>
      <SearchItems 
        search={search}
        setSearch={setSearch}/>
      <main>
        {isLoading && <p>Loading Items... </p>}
        {fetchError && <p style={{color: 'red'}} > {`Error: ${fetchError}`}</p>}

       {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}/> }
      </main>
      <Footer 
        length ={items.length}
      />
    </div>
  );
}

export default App;
