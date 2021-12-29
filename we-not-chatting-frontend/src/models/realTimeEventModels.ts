export interface IRealTimeEventBaseModel {
  code: number;
  msg_type: "friend_request" | "chat_message" | "delete_friend" | "update_profile";
}

export interface IFriendRequestEventModel extends IRealTimeEventBaseModel {
  msg_type: "friend_request";
  from_id: string;
  to_id: string;
  msg: string;
}
