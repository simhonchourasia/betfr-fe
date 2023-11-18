import React from 'react';
import MUIDataTable from 'mui-datatables';

import UserData from '../types/userdata';

const Bets = (props: {userData: UserData}) => {
    const betColumns = ["Name", "Bet summary", "Odds"];
    const betData = props.userData.ongoingbets.map((betid) => {
        return [betid, "wah", "bah"];
    });

    return (
        <div>
            <MUIDataTable
                title={"Ongoing Bets"}
                data={betData}
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