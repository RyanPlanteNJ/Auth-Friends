import React, {useContext, useState, useEffect} from 'react';
import * as yup from 'yup';
import axiosWithAuth from '../utils/axiosWithAuth';
import {FriendsContext} from '../contexts/FriendsContext';

const FriendListForm = () => {
    const{setFriends,editFriend,formState,setFormState} = useContext(
        FriendsContext
    );

    const [errors, setErrors] = useState({
        name:'',
        age:'',
        email:''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        name: yup.string().required('Friend name is required'),
        age: yup.number().required('Friend age is required'),
        email: yup.string().required('Friend email is required')
    });

    const validateChange = e => {
        yup
        .reach(formSchema,e.target.name)
        .validate(e.target.value)
        .then((valid) =>{
            setErrors({...errors,[e.target.name]:''});
        })
        .catch((err)=>setErrors({...errors, [e.target.name]: err.errors[0]}));
    };

    useEffect(()=>{
        formSchema.isValid(formState).then((valid) => {
            setIsButtonDisabled(!valid);
        });
    },[formState]);

      useEffect(() => {
          if (editFriend) {
              setFormState(editFriend);
          }
      }, [editFriend]);

    const addFriend = (friend) => {
        if (friend.id){
            axiosWithAuth()
            .post(`/friends/${friend.id}`,friend)
            .then((res)=>{
                setFriends(res.data);
            })
            .catch((err)=>console.log(err));
         } else {
             axiosWithAuth()
             .post(`/friends`, friend)
             .then((res)=>{
                 setFriends(res.data);
             })
             .catch((err)=>console.log(err));
         }
    };

    const formSubmit = e => {
        e.preventDefault();
        addFriend(formState);
        setFormState({
            name:'',
            age:'',
            email:'',
        });
    };

    const inputChange = e => {
        e.persist();
        const newFormData ={
            ...formState,
            [e.target.name]: e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return(
        <>
            <h3>Add Your Friend</h3>
            <form onSubmit={formSubmit}>
               <label htmlFor='name'>
                   Name
                   <input 
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                   />
               </label>
               <label htmlFor='age'>Age
                <input type="number"
                name="age"
                onChange={inputChange}
                value={formState.age} />
               </label>
               <label htmlFor='email'>
                    Email Address
                <input
                    type='email'
                    name='email'
                    onChange={inputChange}
                    value={formState.email}
                />
                </label>
            <button
          disabled={isButtonDisabled}
          type='submit'
        >
          Add Friend
        </button>
            </form>
        </>
       
    )

}

export default FriendListForm; 