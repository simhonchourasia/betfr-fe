type UserData = {
    username: string;
    email: string;
    // note that friend arrays use friend usernames
    outgoingfriendreqs: Array<string>;
    incomingfriendreqs: Array<string>;
    friends: Array<string>;
    // note that bets use bet ids
    incomingbetreqs: Array<string>;
    outgoingbetreqs: Array<string>;
    resolvedbets: Array<string>;
    conflictedbets: Array<string>;
    ongoingbets: Array<string>;
    // TODO: fix this if necessary (pretty sure these use ids)
    resolvedstakes: Array<string>;
    ongoingstakes: Array<string>;

    balances: { [friendUsername: string]: number };
    totalbalance: number;
};

export const defaultUserData: UserData = {
    username: "",
    email: "",
    outgoingfriendreqs: [],
    incomingfriendreqs: [],
    friends: [],
    incomingbetreqs: [],
    outgoingbetreqs: [],
    resolvedbets: [],
    resolvedstakes: [],
    ongoingstakes: [],
    balances: {},
    totalbalance: 0,
    conflictedbets: [],
    ongoingbets: []
};

export default UserData;