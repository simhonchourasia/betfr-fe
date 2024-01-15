type FriendRelationship = {
    "ID": string;
    "InitiatorName": string;
    "ReceiverName": string;
    "Balance": number;
    "FriendStatus": number;
};

type FriendData = {
    "Username": string;
    "Balance": number;
};

export const defaultUserData: FriendData = {
    "Username": "",
    "Balance": 0,
};

export const FriendshipStatus = {
    NOT_CONNECTED: 0,
    PENDING: 1,
    FRIENDS: 2
};

export default FriendData;
export type { FriendRelationship };
