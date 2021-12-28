export interface IChatMessageModel {
  /**
   * user's wxid
   */
  from_user: string;
  to_user: string;
  time: number;
  content: string;
  content_type: number;
}
