import React from 'react';
import UserData from '../types/userdata';

const Home = (props: {userData: UserData}) => {

    return (
        <div>
            {props.userData.Username ? "Welcome, " + props.userData.Username + "!" : "Not logged in"}
        </div>
    );
};

export default Home;