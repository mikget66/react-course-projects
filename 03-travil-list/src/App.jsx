import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";

function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function App() {
  const [items, setItems] =useState([])

  function handleAdd (item){
    const newItem = { ...item, id: generateUniqueId() };
    setItems((prevItems) => [...prevItems, newItem]);
    console.log(item)
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    )

    if(confirmed)setItems([]);
  }
  function toggle (id){
    setItems((items) =>
      items.map((item) =>
      item.id === id ? {...item, packed :!item.packed}:item
    )
    )
  }
  return (
    <div className="app">
      <Logo/>
      <Form
        items={items}
        handleAdd={handleAdd}
      />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        toggle={toggle}
        handleClear={handleClear}
      />
      <Stats
        items={items}
      />
    </div>
  );
}

export default App;