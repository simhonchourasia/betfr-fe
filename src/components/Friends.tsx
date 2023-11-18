import React from 'react';

import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import UserData from '../types/userdata';


// TODO: lazy loading for large friend lists
const Friends = (props: {userData: UserData}) => {
    const friendColumns = ["Name", "Friend Balance", "Create Bet +"];
    const friendData = props.userData.friends.map((username) => {
        return [username, "+4", "n"];
    });

    return (
        <div style={{width: "100%"}}>
            <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                    title={"My Friends"}
                    data={friendData}
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
    );
};

export default Friends;