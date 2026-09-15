import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

//#region src/generated/web/v1/tiktok-schema.d.ts
declare const protobufPackage = "TikTok";
declare enum ControlAction {
  CONTROL_ACTION_FALLBACK_UNKNOWN = 0,
  CONTROL_ACTION_STREAM_PAUSED = 1,
  CONTROL_ACTION_STREAM_UNPAUSED = 2,
  CONTROL_ACTION_STREAM_ENDED = 3,
  CONTROL_ACTION_STREAM_SUSPENDED = 4,
  UNRECOGNIZED = -1
}
/** Data structure from im/fetch/ response */
interface WebcastResponse {
  messages: Message[];
  cursor: string;
  fetchInterval: number;
  serverTimestamp: string;
  internalExt: string;
  /** ws (1) or polling (2) */
  fetchType: number;
  wsParams: WebsocketParam[];
  heartbeatDuration: number;
  needAck: boolean;
  wsUrl: string;
}
interface Message {
  type: string;
  binary: Uint8Array;
}
interface WebsocketParam {
  name: string;
  value: string;
}
/** Message types depending on Message.tyoe */
interface WebcastControlMessage {
  action: ControlAction;
}
/** Statistics like viewer count */
interface WebcastRoomUserSeqMessage {
  topViewers: TopUser[];
  viewerCount: number;
}
interface TopUser {
  coinCount: string;
  user: User | undefined;
}
interface ImageModel {
  mUrls: string[];
  mUri: string;
  height: number;
  width: number;
  avgColor: string;
  imageType: number;
  schema: string;
  content: ImageModel_Content | undefined;
  isAnimated: boolean;
}
interface ImageModel_Content {
  name: string;
  fontColor: string;
  level: string;
}
interface WebcastChatMessage {
  event: WebcastMessageEvent | undefined;
  user: User | undefined;
  comment: string;
  visibleToSender: boolean;
  background: ImageModel | undefined;
  fullScreenTextColor: string;
  backgroundImageV2: ImageModel | undefined;
  giftImage: ImageModel | undefined;
  inputType: number;
  atUser: User | undefined;
  emotes: WebcastSubEmote[];
  contentLanguage: string;
  quickChatScene: number;
  communityflaggedStatus: number;
  commentQualityScores: WebcastChatMessage_CommentQualityScore[];
  userIdentity: WebcastChatMessage_UserIdentity | undefined;
  commentTag: WebcastChatMessage_CommentTag[];
  screenTime: string;
  signature: string;
  signatureVersion: string;
  ecStreamerKey: string;
}
declare enum WebcastChatMessage_CommentTag {
  COMMENT_TAG_NORMAL = 0,
  COMMENT_TAG_CANDIDATE = 1,
  COMMENT_TAG_OVERAGE = 2,
  UNRECOGNIZED = -1
}
interface WebcastChatMessage_UserIdentity {
  isGiftGiverOfAnchor: boolean;
  isSubscriberOfAnchor: boolean;
  isMutualFollowingWithAnchor: boolean;
  isFollowerOfAnchor: boolean;
  isModeratorOfAnchor: boolean;
  isAnchor: boolean;
}
interface WebcastChatMessage_CommentQualityScore {
  version: string;
  score: string;
}
interface EmoteUploadInfo {
  userId: string;
  emoteUploadSource?: EmoteUploadInfo_UserEmoteUploadSource | undefined;
  userInfo: User | undefined;
  userIdStr: string;
}
declare enum EmoteUploadInfo_UserEmoteUploadSource {
  USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_ANCHOR = 0,
  USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_SUBSCRIBER = 1,
  USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_MODERATOR = 2,
  UNRECOGNIZED = -1
}
/** Chat Emotes (Subscriber) */
interface WebcastEmoteChatMessage {
  user: User | undefined;
  emote: EmoteDetails | undefined;
}
interface WebcastSubEmote {
  /** starting at 0, you insert the emote itself into the comment at that place */
  placeInComment: number;
  emote: EmoteDetails | undefined;
}
interface WebcastMemberMessage {
  event: WebcastMessageEvent | undefined;
  user: User | undefined;
  actionId: number;
}
interface WebcastGiftMessage {
  event: WebcastMessageEvent | undefined;
  giftId: number;
  repeatCount: number;
  user: User | undefined;
  repeatEnd: number;
  groupId: string;
  giftDetails: WebcastGiftMessageGiftDetails | undefined;
  monitorExtra: string;
  giftExtra: WebcastGiftMessageGiftExtra | undefined;
}
interface WebcastGiftMessageGiftDetails {
  giftImage: WebcastGiftMessageGiftImage | undefined;
  giftName: string;
  describe: string;
  giftType: number;
  diamondCount: number;
}
/** Taken from https://github.com/Davincible/gotiktoklive/blob/da4630622bc586629a53faae64e8c53509af29de/proto/tiktok.proto#L57 */
interface WebcastGiftMessageGiftExtra {
  timestamp: string;
  receiverUserId: string;
}
interface WebcastGiftMessageGiftImage {
  giftPictureUrl: string;
}
/** Battle start */
interface WebcastLinkMicBattle {
  battleUsers: WebcastLinkMicBattleItems[];
}
interface WebcastLinkMicBattleItems {
  battleGroup: WebcastLinkMicBattleGroup | undefined;
}
interface WebcastLinkMicBattleGroup {
  user: LinkUser | undefined;
}
/** Battle status */
interface WebcastLinkMicArmies {
  battleItems: WebcastLinkMicArmiesItems[];
  battleStatus: number;
}
interface WebcastLinkMicArmiesItems {
  hostUserId: string;
  battleGroups: WebcastLinkMicArmiesGroup[];
}
interface WebcastLinkMicArmiesGroup {
  users: User[];
  points: number;
}
/** Follow & share event */
interface WebcastSocialMessage {
  event: WebcastMessageEvent | undefined;
  user: User | undefined;
}
/** Like event (is only sent from time to time, not with every like) */
interface WebcastLikeMessage {
  event: WebcastMessageEvent | undefined;
  user: User | undefined;
  likeCount: number;
  totalLikeCount: number;
}
/** New question event */
interface WebcastQuestionNewMessage {
  questionDetails: QuestionDetails | undefined;
}
interface QuestionDetails {
  questionText: string;
  user: User | undefined;
}
interface WebcastMessageEvent {
  msgId: string;
  createTime: string;
  eventDetails: WebcastMessageEventDetails | undefined;
}
/** Contains UI information */
interface WebcastMessageEventDetails {
  displayType: string;
  label: string;
}
/** Source: Co-opted https://github.com/zerodytrash/TikTok-Livestream-Chat-Connector/issues/19#issuecomment-1074150342 */
interface WebcastLiveIntroMessage {
  id: string;
  description: string;
  user: User | undefined;
}
interface SystemMessage {
  description: string;
}
interface WebcastInRoomBannerMessage {
  data: string;
}
interface RankItem {
  colour: string;
  id: string;
}
interface WeeklyRanking {
  type: string;
  label: string;
  rank: RankItem | undefined;
}
interface RankContainer {
  rankings: WeeklyRanking | undefined;
}
interface WebcastHourlyRankMessage {
  data: RankContainer | undefined;
}
interface EmoteDetails {
  emoteId: string;
  image: EmoteImage | undefined;
}
interface EmoteImage {
  imageUrl: string;
}
/**
 * Envelope (treasure boxes)
 * Taken from https://github.com/ThanoFish/TikTok-Live-Connector/blob/9b215b96792adfddfb638344b152fa9efa581b4c/src/proto/tiktokSchema.proto
 */
interface WebcastEnvelopeMessage {
  treasureBoxData: TreasureBoxData | undefined;
  treasureBoxUser: TreasureBoxUser | undefined;
}
interface TreasureBoxUser {
  user2: TreasureBoxUser2 | undefined;
}
interface TreasureBoxUser2 {
  user3: TreasureBoxUser3[];
}
interface TreasureBoxUser3 {
  user4: TreasureBoxUser4 | undefined;
}
interface TreasureBoxUser4 {
  user: User | undefined;
}
interface TreasureBoxData {
  coins: number;
  canOpen: number;
  timestamp: string;
}
/** New Subscriber message */
interface WebcastSubNotifyMessage {
  event: WebcastMessageEvent | undefined;
  user: User | undefined;
  exhibitionType: number;
  subMonth: number;
  subscribeType: number;
  oldSubscribeStatus: number;
  subscribingStatus: number;
}
interface User {
  userId: string;
  nickname: string;
  profilePicture: ProfilePicture | undefined;
  uniqueId: string;
  secUid: string;
  badges: UserBadgesAttributes[];
  createTime: string;
  bioDescription: string;
  followInfo: FollowInfo | undefined;
}
interface FollowInfo {
  followingCount: number;
  followerCount: number;
  followStatus: number;
  pushStatus: number;
}
interface LinkUser {
  userId: string;
  nickname: string;
  profilePicture: ProfilePicture | undefined;
  uniqueId: string;
}
interface ProfilePicture {
  urls: string[];
}
interface UserBadgesAttributes {
  badgeSceneType: number;
  imageBadges: UserImageBadge[];
  badges: UserBadge[];
  privilegeLogExtra: PrivilegeLogExtra | undefined;
}
interface PrivilegeLogExtra {
  privilegeId: string;
  level: string;
}
interface UserBadge {
  type: string;
  name: string;
}
interface UserImageBadge {
  displayType: number;
  image: UserImageBadgeImage | undefined;
}
interface UserImageBadgeImage {
  url: string;
}
/** Websocket incoming message structure */
interface WebcastWebsocketMessage {
  id: string;
  type: string;
  binary: Uint8Array;
}
/** Websocket acknowledgment message */
interface WebcastWebsocketAck {
  id: string;
  type: string;
}
interface WebcastBarrageMessage {
  event: WebcastMessageEvent | undefined;
  msgType: number;
  content: WebcastBarrageMessage_Text | undefined;
}
interface WebcastBarrageMessage_Text {
  key: string;
  defaultPattern: string;
  pieces: WebcastBarrageMessage_TextPiece[];
}
interface WebcastBarrageMessage_TextPiece {
  type: number;
  stringValue: string;
  userValue: WebcastBarrageMessage_TextPieceUser | undefined;
}
interface WebcastBarrageMessage_TextPieceUser {
  user: User | undefined;
  withColon: boolean;
}
declare const WebcastResponse: MessageFns<WebcastResponse>;
declare const Message: MessageFns<Message>;
declare const WebsocketParam: MessageFns<WebsocketParam>;
declare const WebcastControlMessage: MessageFns<WebcastControlMessage>;
declare const WebcastRoomUserSeqMessage: MessageFns<WebcastRoomUserSeqMessage>;
declare const TopUser: MessageFns<TopUser>;
declare const ImageModel: MessageFns<ImageModel>;
declare const ImageModel_Content: MessageFns<ImageModel_Content>;
declare const WebcastChatMessage: MessageFns<WebcastChatMessage>;
declare const WebcastChatMessage_UserIdentity: MessageFns<WebcastChatMessage_UserIdentity>;
declare const WebcastChatMessage_CommentQualityScore: MessageFns<WebcastChatMessage_CommentQualityScore>;
declare const EmoteUploadInfo: MessageFns<EmoteUploadInfo>;
declare const WebcastEmoteChatMessage: MessageFns<WebcastEmoteChatMessage>;
declare const WebcastSubEmote: MessageFns<WebcastSubEmote>;
declare const WebcastMemberMessage: MessageFns<WebcastMemberMessage>;
declare const WebcastGiftMessage: MessageFns<WebcastGiftMessage>;
declare const WebcastGiftMessageGiftDetails: MessageFns<WebcastGiftMessageGiftDetails>;
declare const WebcastGiftMessageGiftExtra: MessageFns<WebcastGiftMessageGiftExtra>;
declare const WebcastGiftMessageGiftImage: MessageFns<WebcastGiftMessageGiftImage>;
declare const WebcastLinkMicBattle: MessageFns<WebcastLinkMicBattle>;
declare const WebcastLinkMicBattleItems: MessageFns<WebcastLinkMicBattleItems>;
declare const WebcastLinkMicBattleGroup: MessageFns<WebcastLinkMicBattleGroup>;
declare const WebcastLinkMicArmies: MessageFns<WebcastLinkMicArmies>;
declare const WebcastLinkMicArmiesItems: MessageFns<WebcastLinkMicArmiesItems>;
declare const WebcastLinkMicArmiesGroup: MessageFns<WebcastLinkMicArmiesGroup>;
declare const WebcastSocialMessage: MessageFns<WebcastSocialMessage>;
declare const WebcastLikeMessage: MessageFns<WebcastLikeMessage>;
declare const WebcastQuestionNewMessage: MessageFns<WebcastQuestionNewMessage>;
declare const QuestionDetails: MessageFns<QuestionDetails>;
declare const WebcastMessageEvent: MessageFns<WebcastMessageEvent>;
declare const WebcastMessageEventDetails: MessageFns<WebcastMessageEventDetails>;
declare const WebcastLiveIntroMessage: MessageFns<WebcastLiveIntroMessage>;
declare const SystemMessage: MessageFns<SystemMessage>;
declare const WebcastInRoomBannerMessage: MessageFns<WebcastInRoomBannerMessage>;
declare const RankItem: MessageFns<RankItem>;
declare const WeeklyRanking: MessageFns<WeeklyRanking>;
declare const RankContainer: MessageFns<RankContainer>;
declare const WebcastHourlyRankMessage: MessageFns<WebcastHourlyRankMessage>;
declare const EmoteDetails: MessageFns<EmoteDetails>;
declare const EmoteImage: MessageFns<EmoteImage>;
declare const WebcastEnvelopeMessage: MessageFns<WebcastEnvelopeMessage>;
declare const TreasureBoxUser: MessageFns<TreasureBoxUser>;
declare const TreasureBoxUser2: MessageFns<TreasureBoxUser2>;
declare const TreasureBoxUser3: MessageFns<TreasureBoxUser3>;
declare const TreasureBoxUser4: MessageFns<TreasureBoxUser4>;
declare const TreasureBoxData: MessageFns<TreasureBoxData>;
declare const WebcastSubNotifyMessage: MessageFns<WebcastSubNotifyMessage>;
declare const User: MessageFns<User>;
declare const FollowInfo: MessageFns<FollowInfo>;
declare const LinkUser: MessageFns<LinkUser>;
declare const ProfilePicture: MessageFns<ProfilePicture>;
declare const UserBadgesAttributes: MessageFns<UserBadgesAttributes>;
declare const PrivilegeLogExtra: MessageFns<PrivilegeLogExtra>;
declare const UserBadge: MessageFns<UserBadge>;
declare const UserImageBadge: MessageFns<UserImageBadge>;
declare const UserImageBadgeImage: MessageFns<UserImageBadgeImage>;
declare const WebcastWebsocketMessage: MessageFns<WebcastWebsocketMessage>;
declare const WebcastWebsocketAck: MessageFns<WebcastWebsocketAck>;
declare const WebcastBarrageMessage: MessageFns<WebcastBarrageMessage>;
declare const WebcastBarrageMessage_Text: MessageFns<WebcastBarrageMessage_Text>;
declare const WebcastBarrageMessage_TextPiece: MessageFns<WebcastBarrageMessage_TextPiece>;
declare const WebcastBarrageMessage_TextPieceUser: MessageFns<WebcastBarrageMessage_TextPieceUser>;
interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
//#endregion
export { ControlAction, EmoteDetails, EmoteImage, EmoteUploadInfo, EmoteUploadInfo_UserEmoteUploadSource, FollowInfo, ImageModel, ImageModel_Content, LinkUser, Message, MessageFns, PrivilegeLogExtra, ProfilePicture, QuestionDetails, RankContainer, RankItem, SystemMessage, TopUser, TreasureBoxData, TreasureBoxUser, TreasureBoxUser2, TreasureBoxUser3, TreasureBoxUser4, User, UserBadge, UserBadgesAttributes, UserImageBadge, UserImageBadgeImage, WebcastBarrageMessage, WebcastBarrageMessage_Text, WebcastBarrageMessage_TextPiece, WebcastBarrageMessage_TextPieceUser, WebcastChatMessage, WebcastChatMessage_CommentQualityScore, WebcastChatMessage_CommentTag, WebcastChatMessage_UserIdentity, WebcastControlMessage, WebcastEmoteChatMessage, WebcastEnvelopeMessage, WebcastGiftMessage, WebcastGiftMessageGiftDetails, WebcastGiftMessageGiftExtra, WebcastGiftMessageGiftImage, WebcastHourlyRankMessage, WebcastInRoomBannerMessage, WebcastLikeMessage, WebcastLinkMicArmies, WebcastLinkMicArmiesGroup, WebcastLinkMicArmiesItems, WebcastLinkMicBattle, WebcastLinkMicBattleGroup, WebcastLinkMicBattleItems, WebcastLiveIntroMessage, WebcastMemberMessage, WebcastMessageEvent, WebcastMessageEventDetails, WebcastQuestionNewMessage, WebcastResponse, WebcastRoomUserSeqMessage, WebcastSocialMessage, WebcastSubEmote, WebcastSubNotifyMessage, WebcastWebsocketAck, WebcastWebsocketMessage, WebsocketParam, WeeklyRanking, protobufPackage };