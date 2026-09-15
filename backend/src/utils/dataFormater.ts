import { User, UserIdentity } from "tiktok-live-connector";

export type BaseSocketPayload<T = any> = {
  event: string;
  roomId: string;
  timestamp: number;
  data?: T;
  [key: string]: any;
}

export function formatUser(user?: User, userIdentity?: UserIdentity) {
  if (!user) return null;
  return {
    userId: user.id || user.idStr || "",
    uniqueId: user.displayId || "",
    nickname: user.nickname || "",
    profilePictureUrl: user.avatarThumb?.urlList?.[0] || null,
    ...(userIdentity && {
      badges: {
        isModerator: Boolean(userIdentity.isModeratorOfAnchor),
        isSubscriber: Boolean(userIdentity.isSubscriberOfAnchor),
      }
    })
  };
}

export function createSocketPayload<T extends Record<string, any>>(
  eventName: string,
  roomId: string,
  extraPayload: T
): BaseSocketPayload {
  return {
    event: eventName,
    roomId,
    timestamp: Date.now(),
    ...extraPayload
  };
}
