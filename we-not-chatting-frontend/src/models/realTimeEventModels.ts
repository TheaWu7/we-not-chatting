export interface IRealTimeEventBaseModel {
  code: number;
  msg_type:
    | "friend_request"
    | "friend_request_accepted"
    | "chat_message"
    | "delete_friend"
    | "update_profile";
}

export interface IFriendRequestEventModel extends IRealTimeEventBaseModel {
  msg_type: "friend_request";
  request_id: string;
  from_id: string;
  to_id: string;
  time: number;
  msg: string;
}

export interface IFriendRequestAcceptedEventModel extends IRealTimeEventBaseModel {
  msg_type: "friend_request_accepted";
  from_id: string;
  to_id: string;
  request_id: string;
}
