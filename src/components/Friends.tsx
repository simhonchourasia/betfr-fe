import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';


import FriendData, { FriendRelationship } from '../types/frienddata';
import UserData from '../types/userdata';

import config from "../config.json"



// TODO: lazy loading for large friend lists
const Friends = (props: {userData: UserData}) => {
    // Contains subarrays of [username, balance]
    const [friendList, setFriendList] = useState<Array<Array<String>>>([]);
    console.log("in friends component, i have current user %s", props.userData.Username);

    // Redirect to login page if not logged in
    const navigate = useNavigate();
    useEffect(() => {
        if (props.userData.Username === "") {
            navigate('/login');
        }
    });

    useEffect(() => {
        (
            async () => {
                const endpoint = config.domainName + "/friends/all";
                const resp = await fetch(endpoint, {
                    // Hack because fetch API doesn't let you put body in GET request
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({username: props.userData.Username})
                });
                    
                const content: Array<FriendRelationship> = await resp.json();
                let friends: Array<Array<string>> = [];
                content.forEach(relationship => {
                    const friendName = (props.userData.Username == relationship.InitiatorName) ?
                        relationship.ReceiverName : relationship.InitiatorName;
                    const friendData: FriendData = {
                        "Username": friendName,
                        "Balance": relationship.Balance
                    };
                    friends.push([friendName, relationship.Balance.toString()]);
                });
                setFriendList(friends);
            }
        )()
    }, []);

    // TODO: make this actually create a bet
    const handleCreateBet = (rowIndex: number) => {
        console.log("should make bet for friend", friendList[rowIndex][0]);
    };

    // TODO: put friend avatar here
    const friendColumns = [
        "Name",
        "Friend Balance",
        {
            name: "",
            options: {
              customBodyRender: (_value: any, tableMeta: any, _updateValue: any) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreateBet(tableMeta.rowIndex)}>
                  Create Bet +
                </Button>
              ),
            },
        },
    ];
    console.log("friend list: ", friendList);

    return (
        <div style={{width: "100%"}}>
            <div>
                <Button>
                    Send Friend Requests
                </Button>
            </div>
            <div>
            <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                    title={"My Friends"}
                    data={friendList}
                    columns={friendColumns}
                    options={{
                        filter: false,
                        download: false,
                        print: false,
                        selectableRowsHeader: false,
                        viewColumns: false,
                        responsive: 'simple',
                        textLabels: {body: {noMatch: 'No friends found...'}}
                    }}
                />
            </ThemeProvider>
            </div>
        </div>
    );
};

export default Friends;
