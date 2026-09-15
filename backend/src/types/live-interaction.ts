export type LiveInteractionType = "comment" | "join" | "gift";

export interface LiveUser {
    id?: string;
    uniqueId: string;
    nickname: string;
    avatarUrl?: string;
}

export interface LiveInteractionBase {
    id: string;
    type: LiveInteractionType;
    roomId?: string;
    createdAt: string;
    user: LiveUser;
    raw?: unknown;
}

export interface CommentInteraction extends LiveInteractionBase {
    type: "comment";
    comment: {
        text: string;
    };
}

export interface JoinInteraction extends LiveInteractionBase {
    type: "join";
    join: {
        action: "joined";
    };
}

export interface GiftInteraction extends LiveInteractionBase {
    type: "gift";
    gift: {
        id?: string;
        name: string;
        repeatCount: number;
        diamondCount?: number;
    };
}

export type LiveInteraction =
    | CommentInteraction
    | JoinInteraction
    | GiftInteraction;