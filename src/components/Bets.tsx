import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import UserData from '../types/userdata';
import { BetData, BetStatus } from '../types/betdata';

import config from "../config.json"


const formatDate = (timestamp: string) => {
    const futureDate = new Date(timestamp);

    // Format the date in a human-readable way without the timezone
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    
    return futureDate.toLocaleDateString('en-US', options);
};

const Bets = (props: {userData: UserData}) => {
    const betColumns = [
        "User",
        "Bet title",
        "Win : Lose",
        "Expiry",
        "Stakes for you",
        "Stakes against you",
    ];
    const [betList, setBetList] = useState<Array<Array<String>>>([]);

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
                const endpoint = config.domainName + "/bets/userbets";
                const resp = await fetch(endpoint, {
                    // Hack because fetch API doesn't let you put body in GET request
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        username: props.userData.Username,
                        "desiredstatus": BetStatus.ONGOING_BET,
                    })
                });
                    
                const content: Array<BetData> = await resp.json();
                console.log("got bets: ", content);
                let betsForTable: Array<Array<string>> = [];
                content.forEach(bet => {
                    const isCurrUserCreator = props.userData.Username == bet.CreatorName;
                    
                    const friendName = isCurrUserCreator ? bet.ReceiverName : bet.CreatorName;
                    console.log("got bet for friend ", friendName);
                    const oddsStr = isCurrUserCreator ? `${bet.CreatorAmount} : ${bet.ReceiverAmount}` : `${bet.ReceiverAmount} : ${bet.CreatorAmount}`;
                    const stakesForMe = bet.NumStakesFilled + (isCurrUserCreator ? bet.CreatorStakedUnfilled : bet.ReceiverStakedUnfilled);
                    const stakesAgainstMe = bet.NumStakesFilled + (isCurrUserCreator ? bet.ReceiverStakedUnfilled : bet.CreatorStakedUnfilled);

                    betsForTable.push(
                        [
                            friendName,
                            bet.Title,
                            oddsStr,
                            formatDate(bet.ExpiryTime),
                            stakesForMe.toString(),
                            stakesAgainstMe.toString(),
                        ]
                    );
                });
                console.log("got bets for table: ", betsForTable);
                setBetList(betsForTable);
            }
        )()
    }, []);

    return (
        <div>
            <MUIDataTable
                title={"Ongoing Bets"}
                data={betList}
                columns={betColumns}
                options={{
                    filter: false,
                    download: false,
                    print: false,
                    selectableRowsHeader: false,
                    viewColumns: false,
                    responsive: 'simple',
                    textLabels: {body: {noMatch: 'No bets found...'}}
                }}
            />
        </div>
    );
};

export default Bets;