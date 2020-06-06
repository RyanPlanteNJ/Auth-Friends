import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friends: []
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
        .get("/friends")
        .then(res=>{
            this.setState({
                friends: res.data.friends
            })
        })
        .catch(err=>console.error(err.message));
    }


    render(){
        const friends = this.friends;
    return(
        <div>
            {friends.map(friend=>(
                <div>
                  <h2>Name: ${friend.name}</h2>
                  <p>Age: ${friend.age}</p>
                  <p>Email: ${friend.email}</p>
                </div>
            ))}
        </div>
        )
    }
}


export default FriendsList;