import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend (){
    setShowAddFriend((show)=> !show)
  }
  function handleAddFriend(friend){
    setFriends((friends)=>[...friends, friend])
    setShowAddFriend(false)
  }
  function handleSelection (friend){
    // setSelectedFriend(friend)
    setSelectedFriend((currentSelected) =>
     currentSelected?.id === friend.id ? null : friend
    )
    setShowAddFriend(false)
  }
  function handleSplitBill (value){
    setFriends(friends => friends.map(friend =>friend.id === selectedFriend.id ?{...friend, balance: friend.balance+value}: friend))
    setSelectedFriend(null)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          onSelection={handleSelection} 
          selectedFriend={selectedFriend}
        />

        {showAddFriend &&<FormAddFriend handleAddFriend={handleAddFriend}/>}
        <Button onClick={handleShowAddFriend}>{showAddFriend?"close": "Add fiend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill key={selectedFriend.id} friend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  );
}

function Button({ children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FriendsList({friends, onSelection, selectedFriend}) {
  return (
    <u>
      {friends.map((friend) => (
        <Friend 
          key={friend.id} 
          friend={friend} 
          onSelection={onSelection}
           selectedFriend={selectedFriend}
        />
      ))}
    </u>
  )
}

function Friend({ friend, onSelection, selectedFriend}) {

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected && "selected"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <button className="button" onClick={() => onSelection(friend)}>{isSelected?"close":"select"}</button>
    </li>
  )
}

function FormAddFriend({handleAddFriend}) {
  const id = crypto.randomUUID()
  const [newFriend, setNewFriend] = useState({name :"" , image: `https://i.pravatar.cc/48?=${id}`, balance: 0, id: id})
  function handleSubmit (e){
    e.preventDefault();

    if(!newFriend.name || !newFriend.image) return;
    
    handleAddFriend(newFriend)

    setNewFriend({name :"" , image: `https://i.pravatar.cc/48?=${id}`, balance: 0, id: id})
  }

  return (
    <form action="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend name</label>
      <input type="text" name="" value={newFriend.name} onChange={e=>setNewFriend({...newFriend, name:e.target.value})}/>

      <label>🎴 Image URL</label>
      <input type="text" name="" id=""value={newFriend.image} onChange={e=>setNewFriend({...newFriend, image:e.target.value})}/>

      <Button>Add</Button>
    </form>
  )
}
function FormSplitBill({friend, onSplitBill}) {
  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const paidByFriend = bill ? bill - paidByUser : 0
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleSubmit(e){
    e.preventDefault()

    if(!bill || !paidByUser) return

    onSplitBill(whoIsPaying === "user"? paidByFriend : -paidByUser)
  }

  return (
  <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bil with {friend.name}</h2>

    <label>💰 Bill value</label>
    <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>

    <label>🧍‍♂️ Your expense</label>
    <input 
      type="text"
      value={paidByUser} 
      onChange={(e)=>setPaidByUser(
        Number(e.target.value)> bill ? paidByUser : Number(e.target.value)
      )}
    />

    <label>👭 {friend.name}'s expence</label>
    <input type="text" value={paidByFriend} disabled/>

    <label>🤑Who is paying the bill</label>
    <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{friend.name}</option>
    </select>

    <Button>Split bill</Button>
  </form>
  )
}
