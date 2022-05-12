/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
import HttpClient from 'secure-http-client';
import { FANS_GROUP_TYPE } from '@/types/room/anchor';

const {
  ApiModel,
  mapping,
  array,
  number,
  string,
  object,
  boolean,
  enumDecorator,
} = HttpClient;

enum PrintMedia {
  Newspaper,
  Newsletter,
  Magazine,
  Book,
}

@mapping({
  cmode: 'ext.cmode_params.cmode',
  mobileNetSupport: 'ext.cmode_params.mobile_net_support',
  name: 'ext.cmode_params.name',
  pixel: 'ext.cmode_params.pixel',
})
export class CmodeParams {
  @string() cmode = '';
  @number() mobileNetSupport = 999;
  @string() name = '';
  @number() pixel = 0;
}

@mapping({
  tab: 'ext.fans_group.descriptions.tab',
  level: 'ext.fans_group.descriptions.title',
  title: 'ext.fans_group.descriptions.title',
  desc: 'ext.fans_group.descriptions.title',
})
class Descriptions {
  @string() tab = '';
  @number() level: FANS_GROUP_TYPE = FANS_GROUP_TYPE.LEVEL0;
  @string() title = '';
  @string() desc = '';
}

@mapping({
  effectEnd: 'ext.fans_group.user_fans_group.effect_end',
  fansGroupType: 'ext.fans_group.user_fans_group.fans_group_type',
  hostId: 'ext.fans_group.user_fans_group.host_id',
  autoRenew: 'ext.fans_group.user_fans_group.auto_renew',
})
class UserFansGroup {
  @number() effectEnd = 0;
  @number() fansGroupType = 0;
  @number() hostId = 0;
  @number() autoRenew = 0;
}

@mapping({
  bgId: 'ext.fans_group.fans_badge.bg_id',
  bgPic: 'ext.fans_group.fans_badge.bg_pic',
  fansGroupLevel: 'ext.fans_group.fans_badge.fans_group_level',
  illegal: 'ext.fans_group.fans_badge.illegal',
  name: 'ext.fans_group.fans_badge.name',
})
class FansBadge {
  @number() bgId = 0;
  @string() bgPic = '';
  @number() fansGroupLevel = 0;
  @number() illegal = 0;
  @string() name = '';
}
@mapping({
  id: 'ext.fans_group.fans_group_emotions.id',
  illegal: 'ext.fans_group.fans_group_emotions.illegal',
  leve: 'ext.fans_group.fans_group_emotions.level',
  lock: 'ext.fans_group.fans_group_emotions.lock',
  pic: 'ext.fans_group.fans_group_emotions.pic',
  picType: 'ext.fans_group.fans_group_emotions.pic_type1',
})
class FansGroupEmotions {
  @number() id = 0;
  @number() illegal = 0;
  @number() level = 0;
  @number() lock = 0;
  @string() pic = 'aaa';
  @string() picType = 'png1';
}

@mapping({
  fansBadge: 'ext.fans_group.fans_badge',
  fansGroupEmotions: 'ext.fans_group.fans_group_emotions',
  descriptions: 'ext.fans_group.descriptions',
  userFansGroup: 'ext.fans_group.user_fans_group',
  fansGroupType: 'ext.fans_group.fans_group_type1',
  isGroupMember: 'ext.fans_group.is_group_member',
  hostSubStatus: 'ext.fans_group.host_sub_status',
})
class FansGroup {
  @object({ model: FansBadge }) fansBadge: FansBadge | {} = {};
  @array({ model: FansGroupEmotions })
  fansGroupEmotions: FansGroupEmotions[] = [];
  @array({ model: Descriptions }) descriptions: Descriptions[] = [];
  @object({ model: UserFansGroup }) userFansGroup: UserFansGroup | {} = {};
  @number({ optional: true }) fansGroupType = 0;
  @number() isGroupMember = 0;
  @number() hostSubStatus = 0;
}

@mapping({
  cmodeParams: 'ext.cmode_params',
  fansGroup: 'ext.fans_group',
  liveMode: 'ext.live_mode',
})
export class Ext {
  @array({ model: CmodeParams }) cmodeParams: CmodeParams[] = [];
  @object({ model: FansGroup }) fansGroup: FansGroup | {} = {};
  @number() liveMode = 0;
}

@mapping({
  chatInterval: 'room_setting.chat_interval',
  chatLevelLimit: 'room_setting.chat_level_limit',
  chatMustFans: 'room_setting.chat_must_fans',
  guestChatInterval: 'room_setting.guest_chat_interval7',
  noChatOffLive: 'room_setting.no_chat_off_live',
})
class RoomSetting {
  @number() chatInterval = 0;
  @number() chatLevelLimit = 0;
  @number() chatMustFans = 0;
  @number() guestChatInterval = 99;
  @number() noChatOffLive = 0;
}

@mapping({
  anchorId1: 'user_id', // test
  name: 'loginname1',
  anchorId: 'user_id',
  anchorId2: 'user_id',
  anchorGroup: 'anchor_group',
  liveTags: 'live_tags',
  roomSetting: 'room_setting',
  ext: 'ext',
})
export default class AnchorInfo extends ApiModel {
  @boolean() anchorId1 = true; // test
  @string() name = 'noname';
  @number() anchorId = 0;
  @enumDecorator({ model: PrintMedia, optional: true }) anchorId2 =
    PrintMedia.Book;
  @array({ model: 'string' }) anchorGroup = [];
  @array({ optional: true, model: 'string' }) liveTags = [];
  @object({ model: RoomSetting }) roomSetting: RoomSetting | {} = {};
  @object({ model: Ext, optional: true }) ext: Ext | {} = {};
}
