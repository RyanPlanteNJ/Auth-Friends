import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import {FriendsContext} from '../contexts/FriendsContext';
import FriendListForm from './FriendListForm';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [editFriend,setEditFriend] = useState({});
    const [formState, setFormState] = useState({
        name: '',
        age:'',
        email: ''
    });

   useEffect(() =>{
        axiosWithAuth()
        .get("/friends")
        .then((res)=>{
            setFriends(res.data);
        })
        .catch((err)=>console.error(err.message));
    },[]);

     const deleteFriend = (id) => {
       axiosWithAuth()
         .delete(`/friends/${id}`)
         .then((res) => {
           setFriends(res.data);
           setFormState({
             name: "",
             age: "",
             email: "",
           });
         })
         .catch((err) => console.log(err));
     };

   
    return (
       <FriendsContext.Provider
        value={{
            setFriends,
            editFriend,
            setEditFriend,
            formState,
            setFormState
        }}
         >
        <h2>Friend's List</h2>
        <div className="friendCard">
            {friends.map((friend)=>{
                return(
                    <div className='card' key={friend.id}>
                        <div className='header'>{friend.name}</div>
                        <div className='details'>
                            <p>Age: {friend.age}</p>
                            <p>Email: {friend.email}</p>
                        </div>
                        <button onClick={()=>setEditFriend(friend)}>
                            Edit Your Friend
                        </button>
                        <button onClick={()=>deleteFriend(friend.id)}>
                            Delete Your Friend    
                        </button>
                    </div>
                )
            })}
        </div>
        <FriendListForm />
       </FriendsContext.Provider>
       )
    }


export default FriendsList;