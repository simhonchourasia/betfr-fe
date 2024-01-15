export type BetData = {
    "ID": string,
    "CreatorName": string,
    "ReceiverName": string,
    "OverallStatus": number,
    "Outcome": number,
    "CreatorAmount": number,
    "ReceiverAmount": number,
    "NumShares": number,
    "CreatorOutcome": number,
    "ReceiverOutcome": number,
    "Title": string,
    "Description": string,
    "CreatedTime": string,
    "ExpiryTime": string,
    "NumStakesFilled": number,
    "CreatorStakedUnfilled": number,
    "ReceiverStakedUnfilled": number
};

// BetStatus
export const BetStatus = {
    INVALID_BET: 0,
    PENDING_BET: 1,
    DECLINED_BET: 2,
    ONGOING_BET: 3,
    RESOLVED_BET: 4,
    CONFLICTED_BET: 5
};
