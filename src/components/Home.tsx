import React from 'react';
import UserData from '../types/userdata';

const Home = (props: {userData: UserData}) => {

    return (
        <div>
            {props.userData.username ? "Welcome, " + props.userData.username + "!" : "Not logged in"}
        </div>
    );
};

export default Home;