import React from 'react';

const Home = (props: {name: string}) => {

    return (
        <div>
            {props.name ? "Welcome, " + props.name + "!" : "Not logged in"}
        </div>
    );
};

export default Home;