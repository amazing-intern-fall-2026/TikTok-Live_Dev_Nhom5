import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
//#region src/generated/node/v1/tiktok-schema.ts
const protobufPackage = "TikTok";
let ControlAction = /* @__PURE__ */ function(ControlAction) {
	ControlAction[ControlAction["CONTROL_ACTION_FALLBACK_UNKNOWN"] = 0] = "CONTROL_ACTION_FALLBACK_UNKNOWN";
	ControlAction[ControlAction["CONTROL_ACTION_STREAM_PAUSED"] = 1] = "CONTROL_ACTION_STREAM_PAUSED";
	ControlAction[ControlAction["CONTROL_ACTION_STREAM_UNPAUSED"] = 2] = "CONTROL_ACTION_STREAM_UNPAUSED";
	ControlAction[ControlAction["CONTROL_ACTION_STREAM_ENDED"] = 3] = "CONTROL_ACTION_STREAM_ENDED";
	ControlAction[ControlAction["CONTROL_ACTION_STREAM_SUSPENDED"] = 4] = "CONTROL_ACTION_STREAM_SUSPENDED";
	ControlAction[ControlAction["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return ControlAction;
}({});
let WebcastChatMessage_CommentTag = /* @__PURE__ */ function(WebcastChatMessage_CommentTag) {
	WebcastChatMessage_CommentTag[WebcastChatMessage_CommentTag["COMMENT_TAG_NORMAL"] = 0] = "COMMENT_TAG_NORMAL";
	WebcastChatMessage_CommentTag[WebcastChatMessage_CommentTag["COMMENT_TAG_CANDIDATE"] = 1] = "COMMENT_TAG_CANDIDATE";
	WebcastChatMessage_CommentTag[WebcastChatMessage_CommentTag["COMMENT_TAG_OVERAGE"] = 2] = "COMMENT_TAG_OVERAGE";
	WebcastChatMessage_CommentTag[WebcastChatMessage_CommentTag["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return WebcastChatMessage_CommentTag;
}({});
let EmoteUploadInfo_UserEmoteUploadSource = /* @__PURE__ */ function(EmoteUploadInfo_UserEmoteUploadSource) {
	EmoteUploadInfo_UserEmoteUploadSource[EmoteUploadInfo_UserEmoteUploadSource["USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_ANCHOR"] = 0] = "USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_ANCHOR";
	EmoteUploadInfo_UserEmoteUploadSource[EmoteUploadInfo_UserEmoteUploadSource["USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_SUBSCRIBER"] = 1] = "USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_SUBSCRIBER";
	EmoteUploadInfo_UserEmoteUploadSource[EmoteUploadInfo_UserEmoteUploadSource["USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_MODERATOR"] = 2] = "USER_EMOTE_UPLOAD_SOURCE_EMOTE_UPLOAD_SOURCE_MODERATOR";
	EmoteUploadInfo_UserEmoteUploadSource[EmoteUploadInfo_UserEmoteUploadSource["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return EmoteUploadInfo_UserEmoteUploadSource;
}({});
function createBaseWebcastResponse() {
	return {
		messages: [],
		cursor: "",
		fetchInterval: 0,
		serverTimestamp: "0",
		internalExt: "",
		fetchType: 0,
		wsParams: [],
		heartbeatDuration: 0,
		needAck: false,
		wsUrl: ""
	};
}
const WebcastResponse = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.messages) Message.encode(v, writer.uint32(10).fork()).join();
		if (message.cursor !== "") writer.uint32(18).string(message.cursor);
		if (message.fetchInterval !== 0) writer.uint32(24).int32(message.fetchInterval);
		if (message.serverTimestamp !== "0") writer.uint32(32).int64(message.serverTimestamp);
		if (message.internalExt !== "") writer.uint32(42).string(message.internalExt);
		if (message.fetchType !== 0) writer.uint32(48).int32(message.fetchType);
		for (const v of message.wsParams) WebsocketParam.encode(v, writer.uint32(58).fork()).join();
		if (message.heartbeatDuration !== 0) writer.uint32(64).int32(message.heartbeatDuration);
		if (message.needAck !== false) writer.uint32(72).bool(message.needAck);
		if (message.wsUrl !== "") writer.uint32(82).string(message.wsUrl);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.messages.push(Message.decode(reader, reader.uint32()));
					continue;
				case 2:
					if (tag !== 18) break;
					message.cursor = reader.string();
					continue;
				case 3:
					if (tag !== 24) break;
					message.fetchInterval = reader.int32();
					continue;
				case 4:
					if (tag !== 32) break;
					message.serverTimestamp = reader.int64().toString();
					continue;
				case 5:
					if (tag !== 42) break;
					message.internalExt = reader.string();
					continue;
				case 6:
					if (tag !== 48) break;
					message.fetchType = reader.int32();
					continue;
				case 7:
					if (tag !== 58) break;
					message.wsParams.push(WebsocketParam.decode(reader, reader.uint32()));
					continue;
				case 8:
					if (tag !== 64) break;
					message.heartbeatDuration = reader.int32();
					continue;
				case 9:
					if (tag !== 72) break;
					message.needAck = reader.bool();
					continue;
				case 10:
					if (tag !== 82) break;
					message.wsUrl = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseMessage() {
	return {
		type: "",
		binary: Buffer.alloc(0)
	};
}
const Message = {
	encode(message, writer = new BinaryWriter()) {
		if (message.type !== "") writer.uint32(10).string(message.type);
		if (message.binary.length !== 0) writer.uint32(18).bytes(message.binary);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.type = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.binary = Buffer.from(reader.bytes());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebsocketParam() {
	return {
		name: "",
		value: ""
	};
}
const WebsocketParam = {
	encode(message, writer = new BinaryWriter()) {
		if (message.name !== "") writer.uint32(10).string(message.name);
		if (message.value !== "") writer.uint32(18).string(message.value);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebsocketParam();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.name = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.value = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastControlMessage() {
	return { action: 0 };
}
const WebcastControlMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.action !== 0) writer.uint32(16).int32(message.action);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastControlMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 16) break;
					message.action = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastRoomUserSeqMessage() {
	return {
		topViewers: [],
		viewerCount: 0
	};
}
const WebcastRoomUserSeqMessage = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.topViewers) TopUser.encode(v, writer.uint32(18).fork()).join();
		if (message.viewerCount !== 0) writer.uint32(24).int32(message.viewerCount);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastRoomUserSeqMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.topViewers.push(TopUser.decode(reader, reader.uint32()));
					continue;
				case 3:
					if (tag !== 24) break;
					message.viewerCount = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTopUser() {
	return {
		coinCount: "0",
		user: void 0
	};
}
const TopUser = {
	encode(message, writer = new BinaryWriter()) {
		if (message.coinCount !== "0") writer.uint32(8).uint64(message.coinCount);
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTopUser();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.coinCount = reader.uint64().toString();
					continue;
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseImageModel() {
	return {
		mUrls: [],
		mUri: "",
		height: 0,
		width: 0,
		avgColor: "",
		imageType: 0,
		schema: "",
		content: void 0,
		isAnimated: false
	};
}
const ImageModel = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.mUrls) writer.uint32(10).string(v);
		if (message.mUri !== "") writer.uint32(18).string(message.mUri);
		if (message.height !== 0) writer.uint32(24).int32(message.height);
		if (message.width !== 0) writer.uint32(32).int32(message.width);
		if (message.avgColor !== "") writer.uint32(42).string(message.avgColor);
		if (message.imageType !== 0) writer.uint32(48).int32(message.imageType);
		if (message.schema !== "") writer.uint32(58).string(message.schema);
		if (message.content !== void 0) ImageModel_Content.encode(message.content, writer.uint32(66).fork()).join();
		if (message.isAnimated !== false) writer.uint32(72).bool(message.isAnimated);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseImageModel();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.mUrls.push(reader.string());
					continue;
				case 2:
					if (tag !== 18) break;
					message.mUri = reader.string();
					continue;
				case 3:
					if (tag !== 24) break;
					message.height = reader.int32();
					continue;
				case 4:
					if (tag !== 32) break;
					message.width = reader.int32();
					continue;
				case 5:
					if (tag !== 42) break;
					message.avgColor = reader.string();
					continue;
				case 6:
					if (tag !== 48) break;
					message.imageType = reader.int32();
					continue;
				case 7:
					if (tag !== 58) break;
					message.schema = reader.string();
					continue;
				case 8:
					if (tag !== 66) break;
					message.content = ImageModel_Content.decode(reader, reader.uint32());
					continue;
				case 9:
					if (tag !== 72) break;
					message.isAnimated = reader.bool();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseImageModel_Content() {
	return {
		name: "",
		fontColor: "",
		level: "0"
	};
}
const ImageModel_Content = {
	encode(message, writer = new BinaryWriter()) {
		if (message.name !== "") writer.uint32(10).string(message.name);
		if (message.fontColor !== "") writer.uint32(18).string(message.fontColor);
		if (message.level !== "0") writer.uint32(24).int64(message.level);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseImageModel_Content();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.name = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.fontColor = reader.string();
					continue;
				case 3:
					if (tag !== 24) break;
					message.level = reader.int64().toString();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastChatMessage() {
	return {
		event: void 0,
		user: void 0,
		comment: "",
		visibleToSender: false,
		background: void 0,
		fullScreenTextColor: "",
		backgroundImageV2: void 0,
		giftImage: void 0,
		inputType: 0,
		atUser: void 0,
		emotes: [],
		contentLanguage: "",
		quickChatScene: 0,
		communityflaggedStatus: 0,
		commentQualityScores: [],
		userIdentity: void 0,
		commentTag: [],
		screenTime: "0",
		signature: "",
		signatureVersion: "",
		ecStreamerKey: ""
	};
}
const WebcastChatMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		if (message.comment !== "") writer.uint32(26).string(message.comment);
		if (message.visibleToSender !== false) writer.uint32(32).bool(message.visibleToSender);
		if (message.background !== void 0) ImageModel.encode(message.background, writer.uint32(42).fork()).join();
		if (message.fullScreenTextColor !== "") writer.uint32(50).string(message.fullScreenTextColor);
		if (message.backgroundImageV2 !== void 0) ImageModel.encode(message.backgroundImageV2, writer.uint32(58).fork()).join();
		if (message.giftImage !== void 0) ImageModel.encode(message.giftImage, writer.uint32(82).fork()).join();
		if (message.inputType !== 0) writer.uint32(88).int32(message.inputType);
		if (message.atUser !== void 0) User.encode(message.atUser, writer.uint32(98).fork()).join();
		for (const v of message.emotes) WebcastSubEmote.encode(v, writer.uint32(106).fork()).join();
		if (message.contentLanguage !== "") writer.uint32(114).string(message.contentLanguage);
		if (message.quickChatScene !== 0) writer.uint32(128).int32(message.quickChatScene);
		if (message.communityflaggedStatus !== 0) writer.uint32(136).int32(message.communityflaggedStatus);
		for (const v of message.commentQualityScores) WebcastChatMessage_CommentQualityScore.encode(v, writer.uint32(154).fork()).join();
		if (message.userIdentity !== void 0) WebcastChatMessage_UserIdentity.encode(message.userIdentity, writer.uint32(146).fork()).join();
		writer.uint32(162).fork();
		for (const v of message.commentTag) writer.int32(v);
		writer.join();
		if (message.screenTime !== "0") writer.uint32(176).int64(message.screenTime);
		if (message.signature !== "") writer.uint32(186).string(message.signature);
		if (message.signatureVersion !== "") writer.uint32(194).string(message.signatureVersion);
		if (message.ecStreamerKey !== "") writer.uint32(202).string(message.ecStreamerKey);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastChatMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 3:
					if (tag !== 26) break;
					message.comment = reader.string();
					continue;
				case 4:
					if (tag !== 32) break;
					message.visibleToSender = reader.bool();
					continue;
				case 5:
					if (tag !== 42) break;
					message.background = ImageModel.decode(reader, reader.uint32());
					continue;
				case 6:
					if (tag !== 50) break;
					message.fullScreenTextColor = reader.string();
					continue;
				case 7:
					if (tag !== 58) break;
					message.backgroundImageV2 = ImageModel.decode(reader, reader.uint32());
					continue;
				case 10:
					if (tag !== 82) break;
					message.giftImage = ImageModel.decode(reader, reader.uint32());
					continue;
				case 11:
					if (tag !== 88) break;
					message.inputType = reader.int32();
					continue;
				case 12:
					if (tag !== 98) break;
					message.atUser = User.decode(reader, reader.uint32());
					continue;
				case 13:
					if (tag !== 106) break;
					message.emotes.push(WebcastSubEmote.decode(reader, reader.uint32()));
					continue;
				case 14:
					if (tag !== 114) break;
					message.contentLanguage = reader.string();
					continue;
				case 16:
					if (tag !== 128) break;
					message.quickChatScene = reader.int32();
					continue;
				case 17:
					if (tag !== 136) break;
					message.communityflaggedStatus = reader.int32();
					continue;
				case 19:
					if (tag !== 154) break;
					message.commentQualityScores.push(WebcastChatMessage_CommentQualityScore.decode(reader, reader.uint32()));
					continue;
				case 18:
					if (tag !== 146) break;
					message.userIdentity = WebcastChatMessage_UserIdentity.decode(reader, reader.uint32());
					continue;
				case 20:
					if (tag === 160) {
						message.commentTag.push(reader.int32());
						continue;
					}
					if (tag === 162) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) message.commentTag.push(reader.int32());
						continue;
					}
					break;
				case 22:
					if (tag !== 176) break;
					message.screenTime = reader.int64().toString();
					continue;
				case 23:
					if (tag !== 186) break;
					message.signature = reader.string();
					continue;
				case 24:
					if (tag !== 194) break;
					message.signatureVersion = reader.string();
					continue;
				case 25:
					if (tag !== 202) break;
					message.ecStreamerKey = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastChatMessage_UserIdentity() {
	return {
		isGiftGiverOfAnchor: false,
		isSubscriberOfAnchor: false,
		isMutualFollowingWithAnchor: false,
		isFollowerOfAnchor: false,
		isModeratorOfAnchor: false,
		isAnchor: false
	};
}
const WebcastChatMessage_UserIdentity = {
	encode(message, writer = new BinaryWriter()) {
		if (message.isGiftGiverOfAnchor !== false) writer.uint32(8).bool(message.isGiftGiverOfAnchor);
		if (message.isSubscriberOfAnchor !== false) writer.uint32(16).bool(message.isSubscriberOfAnchor);
		if (message.isMutualFollowingWithAnchor !== false) writer.uint32(24).bool(message.isMutualFollowingWithAnchor);
		if (message.isFollowerOfAnchor !== false) writer.uint32(32).bool(message.isFollowerOfAnchor);
		if (message.isModeratorOfAnchor !== false) writer.uint32(40).bool(message.isModeratorOfAnchor);
		if (message.isAnchor !== false) writer.uint32(48).bool(message.isAnchor);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastChatMessage_UserIdentity();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.isGiftGiverOfAnchor = reader.bool();
					continue;
				case 2:
					if (tag !== 16) break;
					message.isSubscriberOfAnchor = reader.bool();
					continue;
				case 3:
					if (tag !== 24) break;
					message.isMutualFollowingWithAnchor = reader.bool();
					continue;
				case 4:
					if (tag !== 32) break;
					message.isFollowerOfAnchor = reader.bool();
					continue;
				case 5:
					if (tag !== 40) break;
					message.isModeratorOfAnchor = reader.bool();
					continue;
				case 6:
					if (tag !== 48) break;
					message.isAnchor = reader.bool();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastChatMessage_CommentQualityScore() {
	return {
		version: "",
		score: "0"
	};
}
const WebcastChatMessage_CommentQualityScore = {
	encode(message, writer = new BinaryWriter()) {
		if (message.version !== "") writer.uint32(10).string(message.version);
		if (message.score !== "0") writer.uint32(16).int64(message.score);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastChatMessage_CommentQualityScore();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.version = reader.string();
					continue;
				case 2:
					if (tag !== 16) break;
					message.score = reader.int64().toString();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseEmoteUploadInfo() {
	return {
		userId: "0",
		emoteUploadSource: void 0,
		userInfo: void 0,
		userIdStr: ""
	};
}
const EmoteUploadInfo = {
	encode(message, writer = new BinaryWriter()) {
		if (message.userId !== "0") writer.uint32(8).int64(message.userId);
		if (message.emoteUploadSource !== void 0) writer.uint32(16).int32(message.emoteUploadSource);
		if (message.userInfo !== void 0) User.encode(message.userInfo, writer.uint32(26).fork()).join();
		if (message.userIdStr !== "") writer.uint32(34).string(message.userIdStr);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseEmoteUploadInfo();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.userId = reader.int64().toString();
					continue;
				case 2:
					if (tag !== 16) break;
					message.emoteUploadSource = reader.int32();
					continue;
				case 3:
					if (tag !== 26) break;
					message.userInfo = User.decode(reader, reader.uint32());
					continue;
				case 4:
					if (tag !== 34) break;
					message.userIdStr = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastEmoteChatMessage() {
	return {
		user: void 0,
		emote: void 0
	};
}
const WebcastEmoteChatMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		if (message.emote !== void 0) EmoteDetails.encode(message.emote, writer.uint32(26).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastEmoteChatMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 3:
					if (tag !== 26) break;
					message.emote = EmoteDetails.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastSubEmote() {
	return {
		placeInComment: 0,
		emote: void 0
	};
}
const WebcastSubEmote = {
	encode(message, writer = new BinaryWriter()) {
		if (message.placeInComment !== 0) writer.uint32(8).int32(message.placeInComment);
		if (message.emote !== void 0) EmoteDetails.encode(message.emote, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastSubEmote();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.placeInComment = reader.int32();
					continue;
				case 2:
					if (tag !== 18) break;
					message.emote = EmoteDetails.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastMemberMessage() {
	return {
		event: void 0,
		user: void 0,
		actionId: 0
	};
}
const WebcastMemberMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		if (message.actionId !== 0) writer.uint32(80).int32(message.actionId);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastMemberMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 10:
					if (tag !== 80) break;
					message.actionId = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastGiftMessage() {
	return {
		event: void 0,
		giftId: 0,
		repeatCount: 0,
		user: void 0,
		repeatEnd: 0,
		groupId: "0",
		giftDetails: void 0,
		monitorExtra: "",
		giftExtra: void 0
	};
}
const WebcastGiftMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.giftId !== 0) writer.uint32(16).int32(message.giftId);
		if (message.repeatCount !== 0) writer.uint32(40).int32(message.repeatCount);
		if (message.user !== void 0) User.encode(message.user, writer.uint32(58).fork()).join();
		if (message.repeatEnd !== 0) writer.uint32(72).int32(message.repeatEnd);
		if (message.groupId !== "0") writer.uint32(88).uint64(message.groupId);
		if (message.giftDetails !== void 0) WebcastGiftMessageGiftDetails.encode(message.giftDetails, writer.uint32(122).fork()).join();
		if (message.monitorExtra !== "") writer.uint32(178).string(message.monitorExtra);
		if (message.giftExtra !== void 0) WebcastGiftMessageGiftExtra.encode(message.giftExtra, writer.uint32(186).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastGiftMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 16) break;
					message.giftId = reader.int32();
					continue;
				case 5:
					if (tag !== 40) break;
					message.repeatCount = reader.int32();
					continue;
				case 7:
					if (tag !== 58) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 9:
					if (tag !== 72) break;
					message.repeatEnd = reader.int32();
					continue;
				case 11:
					if (tag !== 88) break;
					message.groupId = reader.uint64().toString();
					continue;
				case 15:
					if (tag !== 122) break;
					message.giftDetails = WebcastGiftMessageGiftDetails.decode(reader, reader.uint32());
					continue;
				case 22:
					if (tag !== 178) break;
					message.monitorExtra = reader.string();
					continue;
				case 23:
					if (tag !== 186) break;
					message.giftExtra = WebcastGiftMessageGiftExtra.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastGiftMessageGiftDetails() {
	return {
		giftImage: void 0,
		giftName: "",
		describe: "",
		giftType: 0,
		diamondCount: 0
	};
}
const WebcastGiftMessageGiftDetails = {
	encode(message, writer = new BinaryWriter()) {
		if (message.giftImage !== void 0) WebcastGiftMessageGiftImage.encode(message.giftImage, writer.uint32(10).fork()).join();
		if (message.giftName !== "") writer.uint32(130).string(message.giftName);
		if (message.describe !== "") writer.uint32(18).string(message.describe);
		if (message.giftType !== 0) writer.uint32(88).int32(message.giftType);
		if (message.diamondCount !== 0) writer.uint32(96).int32(message.diamondCount);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastGiftMessageGiftDetails();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.giftImage = WebcastGiftMessageGiftImage.decode(reader, reader.uint32());
					continue;
				case 16:
					if (tag !== 130) break;
					message.giftName = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.describe = reader.string();
					continue;
				case 11:
					if (tag !== 88) break;
					message.giftType = reader.int32();
					continue;
				case 12:
					if (tag !== 96) break;
					message.diamondCount = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastGiftMessageGiftExtra() {
	return {
		timestamp: "0",
		receiverUserId: "0"
	};
}
const WebcastGiftMessageGiftExtra = {
	encode(message, writer = new BinaryWriter()) {
		if (message.timestamp !== "0") writer.uint32(48).uint64(message.timestamp);
		if (message.receiverUserId !== "0") writer.uint32(64).uint64(message.receiverUserId);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastGiftMessageGiftExtra();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 6:
					if (tag !== 48) break;
					message.timestamp = reader.uint64().toString();
					continue;
				case 8:
					if (tag !== 64) break;
					message.receiverUserId = reader.uint64().toString();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastGiftMessageGiftImage() {
	return { giftPictureUrl: "" };
}
const WebcastGiftMessageGiftImage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.giftPictureUrl !== "") writer.uint32(10).string(message.giftPictureUrl);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastGiftMessageGiftImage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.giftPictureUrl = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicBattle() {
	return { battleUsers: [] };
}
const WebcastLinkMicBattle = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.battleUsers) WebcastLinkMicBattleItems.encode(v, writer.uint32(82).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicBattle();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 10:
					if (tag !== 82) break;
					message.battleUsers.push(WebcastLinkMicBattleItems.decode(reader, reader.uint32()));
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicBattleItems() {
	return { battleGroup: void 0 };
}
const WebcastLinkMicBattleItems = {
	encode(message, writer = new BinaryWriter()) {
		if (message.battleGroup !== void 0) WebcastLinkMicBattleGroup.encode(message.battleGroup, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicBattleItems();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.battleGroup = WebcastLinkMicBattleGroup.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicBattleGroup() {
	return { user: void 0 };
}
const WebcastLinkMicBattleGroup = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user !== void 0) LinkUser.encode(message.user, writer.uint32(10).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicBattleGroup();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.user = LinkUser.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicArmies() {
	return {
		battleItems: [],
		battleStatus: 0
	};
}
const WebcastLinkMicArmies = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.battleItems) WebcastLinkMicArmiesItems.encode(v, writer.uint32(26).fork()).join();
		if (message.battleStatus !== 0) writer.uint32(56).int32(message.battleStatus);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicArmies();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 3:
					if (tag !== 26) break;
					message.battleItems.push(WebcastLinkMicArmiesItems.decode(reader, reader.uint32()));
					continue;
				case 7:
					if (tag !== 56) break;
					message.battleStatus = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicArmiesItems() {
	return {
		hostUserId: "0",
		battleGroups: []
	};
}
const WebcastLinkMicArmiesItems = {
	encode(message, writer = new BinaryWriter()) {
		if (message.hostUserId !== "0") writer.uint32(8).uint64(message.hostUserId);
		for (const v of message.battleGroups) WebcastLinkMicArmiesGroup.encode(v, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicArmiesItems();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.hostUserId = reader.uint64().toString();
					continue;
				case 2:
					if (tag !== 18) break;
					message.battleGroups.push(WebcastLinkMicArmiesGroup.decode(reader, reader.uint32()));
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLinkMicArmiesGroup() {
	return {
		users: [],
		points: 0
	};
}
const WebcastLinkMicArmiesGroup = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.users) User.encode(v, writer.uint32(10).fork()).join();
		if (message.points !== 0) writer.uint32(16).int32(message.points);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLinkMicArmiesGroup();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.users.push(User.decode(reader, reader.uint32()));
					continue;
				case 2:
					if (tag !== 16) break;
					message.points = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastSocialMessage() {
	return {
		event: void 0,
		user: void 0
	};
}
const WebcastSocialMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastSocialMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLikeMessage() {
	return {
		event: void 0,
		user: void 0,
		likeCount: 0,
		totalLikeCount: 0
	};
}
const WebcastLikeMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.user !== void 0) User.encode(message.user, writer.uint32(42).fork()).join();
		if (message.likeCount !== 0) writer.uint32(16).int32(message.likeCount);
		if (message.totalLikeCount !== 0) writer.uint32(24).int32(message.totalLikeCount);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLikeMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 5:
					if (tag !== 42) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 16) break;
					message.likeCount = reader.int32();
					continue;
				case 3:
					if (tag !== 24) break;
					message.totalLikeCount = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastQuestionNewMessage() {
	return { questionDetails: void 0 };
}
const WebcastQuestionNewMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.questionDetails !== void 0) QuestionDetails.encode(message.questionDetails, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastQuestionNewMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.questionDetails = QuestionDetails.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseQuestionDetails() {
	return {
		questionText: "",
		user: void 0
	};
}
const QuestionDetails = {
	encode(message, writer = new BinaryWriter()) {
		if (message.questionText !== "") writer.uint32(18).string(message.questionText);
		if (message.user !== void 0) User.encode(message.user, writer.uint32(42).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseQuestionDetails();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.questionText = reader.string();
					continue;
				case 5:
					if (tag !== 42) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastMessageEvent() {
	return {
		msgId: "0",
		createTime: "0",
		eventDetails: void 0
	};
}
const WebcastMessageEvent = {
	encode(message, writer = new BinaryWriter()) {
		if (message.msgId !== "0") writer.uint32(16).uint64(message.msgId);
		if (message.createTime !== "0") writer.uint32(32).uint64(message.createTime);
		if (message.eventDetails !== void 0) WebcastMessageEventDetails.encode(message.eventDetails, writer.uint32(66).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastMessageEvent();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 16) break;
					message.msgId = reader.uint64().toString();
					continue;
				case 4:
					if (tag !== 32) break;
					message.createTime = reader.uint64().toString();
					continue;
				case 8:
					if (tag !== 66) break;
					message.eventDetails = WebcastMessageEventDetails.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastMessageEventDetails() {
	return {
		displayType: "",
		label: ""
	};
}
const WebcastMessageEventDetails = {
	encode(message, writer = new BinaryWriter()) {
		if (message.displayType !== "") writer.uint32(10).string(message.displayType);
		if (message.label !== "") writer.uint32(18).string(message.label);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastMessageEventDetails();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.displayType = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.label = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastLiveIntroMessage() {
	return {
		id: "0",
		description: "",
		user: void 0
	};
}
const WebcastLiveIntroMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.id !== "0") writer.uint32(16).uint64(message.id);
		if (message.description !== "") writer.uint32(34).string(message.description);
		if (message.user !== void 0) User.encode(message.user, writer.uint32(42).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastLiveIntroMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 16) break;
					message.id = reader.uint64().toString();
					continue;
				case 4:
					if (tag !== 34) break;
					message.description = reader.string();
					continue;
				case 5:
					if (tag !== 42) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseSystemMessage() {
	return { description: "" };
}
const SystemMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.description !== "") writer.uint32(18).string(message.description);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseSystemMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.description = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastInRoomBannerMessage() {
	return { data: "" };
}
const WebcastInRoomBannerMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.data !== "") writer.uint32(18).string(message.data);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastInRoomBannerMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.data = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseRankItem() {
	return {
		colour: "",
		id: "0"
	};
}
const RankItem = {
	encode(message, writer = new BinaryWriter()) {
		if (message.colour !== "") writer.uint32(10).string(message.colour);
		if (message.id !== "0") writer.uint32(32).uint64(message.id);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseRankItem();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.colour = reader.string();
					continue;
				case 4:
					if (tag !== 32) break;
					message.id = reader.uint64().toString();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWeeklyRanking() {
	return {
		type: "",
		label: "",
		rank: void 0
	};
}
const WeeklyRanking = {
	encode(message, writer = new BinaryWriter()) {
		if (message.type !== "") writer.uint32(10).string(message.type);
		if (message.label !== "") writer.uint32(18).string(message.label);
		if (message.rank !== void 0) RankItem.encode(message.rank, writer.uint32(26).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWeeklyRanking();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.type = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.label = reader.string();
					continue;
				case 3:
					if (tag !== 26) break;
					message.rank = RankItem.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseRankContainer() {
	return { rankings: void 0 };
}
const RankContainer = {
	encode(message, writer = new BinaryWriter()) {
		if (message.rankings !== void 0) WeeklyRanking.encode(message.rankings, writer.uint32(34).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseRankContainer();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 4:
					if (tag !== 34) break;
					message.rankings = WeeklyRanking.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastHourlyRankMessage() {
	return { data: void 0 };
}
const WebcastHourlyRankMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.data !== void 0) RankContainer.encode(message.data, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastHourlyRankMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.data = RankContainer.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseEmoteDetails() {
	return {
		emoteId: "",
		image: void 0
	};
}
const EmoteDetails = {
	encode(message, writer = new BinaryWriter()) {
		if (message.emoteId !== "") writer.uint32(10).string(message.emoteId);
		if (message.image !== void 0) EmoteImage.encode(message.image, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseEmoteDetails();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.emoteId = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.image = EmoteImage.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseEmoteImage() {
	return { imageUrl: "" };
}
const EmoteImage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.imageUrl !== "") writer.uint32(10).string(message.imageUrl);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseEmoteImage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.imageUrl = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastEnvelopeMessage() {
	return {
		treasureBoxData: void 0,
		treasureBoxUser: void 0
	};
}
const WebcastEnvelopeMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.treasureBoxData !== void 0) TreasureBoxData.encode(message.treasureBoxData, writer.uint32(18).fork()).join();
		if (message.treasureBoxUser !== void 0) TreasureBoxUser.encode(message.treasureBoxUser, writer.uint32(10).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastEnvelopeMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.treasureBoxData = TreasureBoxData.decode(reader, reader.uint32());
					continue;
				case 1:
					if (tag !== 10) break;
					message.treasureBoxUser = TreasureBoxUser.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTreasureBoxUser() {
	return { user2: void 0 };
}
const TreasureBoxUser = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user2 !== void 0) TreasureBoxUser2.encode(message.user2, writer.uint32(66).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTreasureBoxUser();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 8:
					if (tag !== 66) break;
					message.user2 = TreasureBoxUser2.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTreasureBoxUser2() {
	return { user3: [] };
}
const TreasureBoxUser2 = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.user3) TreasureBoxUser3.encode(v, writer.uint32(34).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTreasureBoxUser2();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 4:
					if (tag !== 34) break;
					message.user3.push(TreasureBoxUser3.decode(reader, reader.uint32()));
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTreasureBoxUser3() {
	return { user4: void 0 };
}
const TreasureBoxUser3 = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user4 !== void 0) TreasureBoxUser4.encode(message.user4, writer.uint32(170).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTreasureBoxUser3();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 21:
					if (tag !== 170) break;
					message.user4 = TreasureBoxUser4.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTreasureBoxUser4() {
	return { user: void 0 };
}
const TreasureBoxUser4 = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user !== void 0) User.encode(message.user, writer.uint32(10).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTreasureBoxUser4();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseTreasureBoxData() {
	return {
		coins: 0,
		canOpen: 0,
		timestamp: "0"
	};
}
const TreasureBoxData = {
	encode(message, writer = new BinaryWriter()) {
		if (message.coins !== 0) writer.uint32(40).uint32(message.coins);
		if (message.canOpen !== 0) writer.uint32(48).uint32(message.canOpen);
		if (message.timestamp !== "0") writer.uint32(56).uint64(message.timestamp);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTreasureBoxData();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 5:
					if (tag !== 40) break;
					message.coins = reader.uint32();
					continue;
				case 6:
					if (tag !== 48) break;
					message.canOpen = reader.uint32();
					continue;
				case 7:
					if (tag !== 56) break;
					message.timestamp = reader.uint64().toString();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastSubNotifyMessage() {
	return {
		event: void 0,
		user: void 0,
		exhibitionType: 0,
		subMonth: 0,
		subscribeType: 0,
		oldSubscribeStatus: 0,
		subscribingStatus: 0
	};
}
const WebcastSubNotifyMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.user !== void 0) User.encode(message.user, writer.uint32(18).fork()).join();
		if (message.exhibitionType !== 0) writer.uint32(24).int32(message.exhibitionType);
		if (message.subMonth !== 0) writer.uint32(32).int32(message.subMonth);
		if (message.subscribeType !== 0) writer.uint32(40).int32(message.subscribeType);
		if (message.oldSubscribeStatus !== 0) writer.uint32(48).int32(message.oldSubscribeStatus);
		if (message.subscribingStatus !== 0) writer.uint32(64).int32(message.subscribingStatus);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastSubNotifyMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 3:
					if (tag !== 24) break;
					message.exhibitionType = reader.int32();
					continue;
				case 4:
					if (tag !== 32) break;
					message.subMonth = reader.int32();
					continue;
				case 5:
					if (tag !== 40) break;
					message.subscribeType = reader.int32();
					continue;
				case 6:
					if (tag !== 48) break;
					message.oldSubscribeStatus = reader.int32();
					continue;
				case 8:
					if (tag !== 64) break;
					message.subscribingStatus = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseUser() {
	return {
		userId: "0",
		nickname: "",
		profilePicture: void 0,
		uniqueId: "",
		secUid: "",
		badges: [],
		createTime: "0",
		bioDescription: "",
		followInfo: void 0
	};
}
const User = {
	encode(message, writer = new BinaryWriter()) {
		if (message.userId !== "0") writer.uint32(8).uint64(message.userId);
		if (message.nickname !== "") writer.uint32(26).string(message.nickname);
		if (message.profilePicture !== void 0) ProfilePicture.encode(message.profilePicture, writer.uint32(74).fork()).join();
		if (message.uniqueId !== "") writer.uint32(306).string(message.uniqueId);
		if (message.secUid !== "") writer.uint32(370).string(message.secUid);
		for (const v of message.badges) UserBadgesAttributes.encode(v, writer.uint32(514).fork()).join();
		if (message.createTime !== "0") writer.uint32(128).uint64(message.createTime);
		if (message.bioDescription !== "") writer.uint32(42).string(message.bioDescription);
		if (message.followInfo !== void 0) FollowInfo.encode(message.followInfo, writer.uint32(178).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseUser();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.userId = reader.uint64().toString();
					continue;
				case 3:
					if (tag !== 26) break;
					message.nickname = reader.string();
					continue;
				case 9:
					if (tag !== 74) break;
					message.profilePicture = ProfilePicture.decode(reader, reader.uint32());
					continue;
				case 38:
					if (tag !== 306) break;
					message.uniqueId = reader.string();
					continue;
				case 46:
					if (tag !== 370) break;
					message.secUid = reader.string();
					continue;
				case 64:
					if (tag !== 514) break;
					message.badges.push(UserBadgesAttributes.decode(reader, reader.uint32()));
					continue;
				case 16:
					if (tag !== 128) break;
					message.createTime = reader.uint64().toString();
					continue;
				case 5:
					if (tag !== 42) break;
					message.bioDescription = reader.string();
					continue;
				case 22:
					if (tag !== 178) break;
					message.followInfo = FollowInfo.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseFollowInfo() {
	return {
		followingCount: 0,
		followerCount: 0,
		followStatus: 0,
		pushStatus: 0
	};
}
const FollowInfo = {
	encode(message, writer = new BinaryWriter()) {
		if (message.followingCount !== 0) writer.uint32(8).int32(message.followingCount);
		if (message.followerCount !== 0) writer.uint32(16).int32(message.followerCount);
		if (message.followStatus !== 0) writer.uint32(24).int32(message.followStatus);
		if (message.pushStatus !== 0) writer.uint32(32).int32(message.pushStatus);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseFollowInfo();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.followingCount = reader.int32();
					continue;
				case 2:
					if (tag !== 16) break;
					message.followerCount = reader.int32();
					continue;
				case 3:
					if (tag !== 24) break;
					message.followStatus = reader.int32();
					continue;
				case 4:
					if (tag !== 32) break;
					message.pushStatus = reader.int32();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseLinkUser() {
	return {
		userId: "0",
		nickname: "",
		profilePicture: void 0,
		uniqueId: ""
	};
}
const LinkUser = {
	encode(message, writer = new BinaryWriter()) {
		if (message.userId !== "0") writer.uint32(8).uint64(message.userId);
		if (message.nickname !== "") writer.uint32(18).string(message.nickname);
		if (message.profilePicture !== void 0) ProfilePicture.encode(message.profilePicture, writer.uint32(26).fork()).join();
		if (message.uniqueId !== "") writer.uint32(34).string(message.uniqueId);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseLinkUser();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.userId = reader.uint64().toString();
					continue;
				case 2:
					if (tag !== 18) break;
					message.nickname = reader.string();
					continue;
				case 3:
					if (tag !== 26) break;
					message.profilePicture = ProfilePicture.decode(reader, reader.uint32());
					continue;
				case 4:
					if (tag !== 34) break;
					message.uniqueId = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseProfilePicture() {
	return { urls: [] };
}
const ProfilePicture = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.urls) writer.uint32(10).string(v);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseProfilePicture();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.urls.push(reader.string());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseUserBadgesAttributes() {
	return {
		badgeSceneType: 0,
		imageBadges: [],
		badges: [],
		privilegeLogExtra: void 0
	};
}
const UserBadgesAttributes = {
	encode(message, writer = new BinaryWriter()) {
		if (message.badgeSceneType !== 0) writer.uint32(24).int32(message.badgeSceneType);
		for (const v of message.imageBadges) UserImageBadge.encode(v, writer.uint32(162).fork()).join();
		for (const v of message.badges) UserBadge.encode(v, writer.uint32(170).fork()).join();
		if (message.privilegeLogExtra !== void 0) PrivilegeLogExtra.encode(message.privilegeLogExtra, writer.uint32(98).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseUserBadgesAttributes();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 3:
					if (tag !== 24) break;
					message.badgeSceneType = reader.int32();
					continue;
				case 20:
					if (tag !== 162) break;
					message.imageBadges.push(UserImageBadge.decode(reader, reader.uint32()));
					continue;
				case 21:
					if (tag !== 170) break;
					message.badges.push(UserBadge.decode(reader, reader.uint32()));
					continue;
				case 12:
					if (tag !== 98) break;
					message.privilegeLogExtra = PrivilegeLogExtra.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBasePrivilegeLogExtra() {
	return {
		privilegeId: "",
		level: ""
	};
}
const PrivilegeLogExtra = {
	encode(message, writer = new BinaryWriter()) {
		if (message.privilegeId !== "") writer.uint32(18).string(message.privilegeId);
		if (message.level !== "") writer.uint32(42).string(message.level);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBasePrivilegeLogExtra();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.privilegeId = reader.string();
					continue;
				case 5:
					if (tag !== 42) break;
					message.level = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseUserBadge() {
	return {
		type: "",
		name: ""
	};
}
const UserBadge = {
	encode(message, writer = new BinaryWriter()) {
		if (message.type !== "") writer.uint32(18).string(message.type);
		if (message.name !== "") writer.uint32(26).string(message.name);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseUserBadge();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 18) break;
					message.type = reader.string();
					continue;
				case 3:
					if (tag !== 26) break;
					message.name = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseUserImageBadge() {
	return {
		displayType: 0,
		image: void 0
	};
}
const UserImageBadge = {
	encode(message, writer = new BinaryWriter()) {
		if (message.displayType !== 0) writer.uint32(8).int32(message.displayType);
		if (message.image !== void 0) UserImageBadgeImage.encode(message.image, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseUserImageBadge();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.displayType = reader.int32();
					continue;
				case 2:
					if (tag !== 18) break;
					message.image = UserImageBadgeImage.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseUserImageBadgeImage() {
	return { url: "" };
}
const UserImageBadgeImage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.url !== "") writer.uint32(10).string(message.url);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseUserImageBadgeImage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.url = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastWebsocketMessage() {
	return {
		id: "0",
		type: "",
		binary: Buffer.alloc(0)
	};
}
const WebcastWebsocketMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.id !== "0") writer.uint32(16).uint64(message.id);
		if (message.type !== "") writer.uint32(58).string(message.type);
		if (message.binary.length !== 0) writer.uint32(66).bytes(message.binary);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastWebsocketMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 16) break;
					message.id = reader.uint64().toString();
					continue;
				case 7:
					if (tag !== 58) break;
					message.type = reader.string();
					continue;
				case 8:
					if (tag !== 66) break;
					message.binary = Buffer.from(reader.bytes());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastWebsocketAck() {
	return {
		id: "0",
		type: ""
	};
}
const WebcastWebsocketAck = {
	encode(message, writer = new BinaryWriter()) {
		if (message.id !== "0") writer.uint32(16).uint64(message.id);
		if (message.type !== "") writer.uint32(58).string(message.type);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastWebsocketAck();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 2:
					if (tag !== 16) break;
					message.id = reader.uint64().toString();
					continue;
				case 7:
					if (tag !== 58) break;
					message.type = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastBarrageMessage() {
	return {
		event: void 0,
		msgType: 0,
		content: void 0
	};
}
const WebcastBarrageMessage = {
	encode(message, writer = new BinaryWriter()) {
		if (message.event !== void 0) WebcastMessageEvent.encode(message.event, writer.uint32(10).fork()).join();
		if (message.msgType !== 0) writer.uint32(24).int32(message.msgType);
		if (message.content !== void 0) WebcastBarrageMessage_Text.encode(message.content, writer.uint32(42).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastBarrageMessage();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.event = WebcastMessageEvent.decode(reader, reader.uint32());
					continue;
				case 3:
					if (tag !== 24) break;
					message.msgType = reader.int32();
					continue;
				case 5:
					if (tag !== 42) break;
					message.content = WebcastBarrageMessage_Text.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastBarrageMessage_Text() {
	return {
		key: "",
		defaultPattern: "",
		pieces: []
	};
}
const WebcastBarrageMessage_Text = {
	encode(message, writer = new BinaryWriter()) {
		if (message.key !== "") writer.uint32(10).string(message.key);
		if (message.defaultPattern !== "") writer.uint32(18).string(message.defaultPattern);
		for (const v of message.pieces) WebcastBarrageMessage_TextPiece.encode(v, writer.uint32(34).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastBarrageMessage_Text();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.key = reader.string();
					continue;
				case 2:
					if (tag !== 18) break;
					message.defaultPattern = reader.string();
					continue;
				case 4:
					if (tag !== 34) break;
					message.pieces.push(WebcastBarrageMessage_TextPiece.decode(reader, reader.uint32()));
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastBarrageMessage_TextPiece() {
	return {
		type: 0,
		stringValue: "",
		userValue: void 0
	};
}
const WebcastBarrageMessage_TextPiece = {
	encode(message, writer = new BinaryWriter()) {
		if (message.type !== 0) writer.uint32(8).int32(message.type);
		if (message.stringValue !== "") writer.uint32(90).string(message.stringValue);
		if (message.userValue !== void 0) WebcastBarrageMessage_TextPieceUser.encode(message.userValue, writer.uint32(170).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastBarrageMessage_TextPiece();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.type = reader.int32();
					continue;
				case 11:
					if (tag !== 90) break;
					message.stringValue = reader.string();
					continue;
				case 21:
					if (tag !== 170) break;
					message.userValue = WebcastBarrageMessage_TextPieceUser.decode(reader, reader.uint32());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
function createBaseWebcastBarrageMessage_TextPieceUser() {
	return {
		user: void 0,
		withColon: false
	};
}
const WebcastBarrageMessage_TextPieceUser = {
	encode(message, writer = new BinaryWriter()) {
		if (message.user !== void 0) User.encode(message.user, writer.uint32(10).fork()).join();
		if (message.withColon !== false) writer.uint32(16).bool(message.withColon);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseWebcastBarrageMessage_TextPieceUser();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.user = User.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 16) break;
					message.withColon = reader.bool();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	}
};
//#endregion
export { ControlAction, EmoteDetails, EmoteImage, EmoteUploadInfo, EmoteUploadInfo_UserEmoteUploadSource, FollowInfo, ImageModel, ImageModel_Content, LinkUser, Message, PrivilegeLogExtra, ProfilePicture, QuestionDetails, RankContainer, RankItem, SystemMessage, TopUser, TreasureBoxData, TreasureBoxUser, TreasureBoxUser2, TreasureBoxUser3, TreasureBoxUser4, User, UserBadge, UserBadgesAttributes, UserImageBadge, UserImageBadgeImage, WebcastBarrageMessage, WebcastBarrageMessage_Text, WebcastBarrageMessage_TextPiece, WebcastBarrageMessage_TextPieceUser, WebcastChatMessage, WebcastChatMessage_CommentQualityScore, WebcastChatMessage_CommentTag, WebcastChatMessage_UserIdentity, WebcastControlMessage, WebcastEmoteChatMessage, WebcastEnvelopeMessage, WebcastGiftMessage, WebcastGiftMessageGiftDetails, WebcastGiftMessageGiftExtra, WebcastGiftMessageGiftImage, WebcastHourlyRankMessage, WebcastInRoomBannerMessage, WebcastLikeMessage, WebcastLinkMicArmies, WebcastLinkMicArmiesGroup, WebcastLinkMicArmiesItems, WebcastLinkMicBattle, WebcastLinkMicBattleGroup, WebcastLinkMicBattleItems, WebcastLiveIntroMessage, WebcastMemberMessage, WebcastMessageEvent, WebcastMessageEventDetails, WebcastQuestionNewMessage, WebcastResponse, WebcastRoomUserSeqMessage, WebcastSocialMessage, WebcastSubEmote, WebcastSubNotifyMessage, WebcastWebsocketAck, WebcastWebsocketMessage, WebsocketParam, WeeklyRanking, protobufPackage };
