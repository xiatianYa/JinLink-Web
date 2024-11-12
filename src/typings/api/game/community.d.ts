declare namespace Api {
  namespace Game {
    /** community search params */
    type CommunitySearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Community, 'communityName'> & Api.Common.CommonSearchParams
    >;

    /** Community list */
    type CommunityList = Common.PaginatingQueryRecord<Community>;

    /** Community */
    type Community = Common.CommonRecord<{
      /** community name */
      communityName: string;
    }>;

    type CommunityParams = {
      /** community name */
      communityName: string;
    };

    /** game search params */
    type GameSearchParams = CommonType.RecordNullable<Pick<Api.Game.Game, 'gameName'> & Api.Common.CommonSearchParams>;

    /** game list */
    type GameList = Common.PaginatingQueryRecord<Game>;

    /** game */
    type Game = Common.CommonRecord<{
      /** game name */
      gameName: string;
    }>;

    type GameParams = {
      /** game name */
      gameName: string;
    };

    /** game search params */
    type ModeSearchParams = CommonType.RecordNullable<Pick<Api.Game.Mode, 'modeName'> & Api.Common.CommonSearchParams>;

    /** game list */
    type ModeList = Common.PaginatingQueryRecord<Mode>;

    /** game */
    type Mode = Common.CommonRecord<{
      /** game name */
      modeName: string;
    }>;

    type ModeParams = {
      /** game name */
      modeName: string;
    };

    /** server search params */
    type ServerSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Server, 'serverName' | 'communityId' | 'modeId' | 'gameId'> & Api.Common.CommonSearchParams
    >;

    /** server list */
    type ServerList = Common.PaginatingQueryRecord<ServerVo>;

    /** server */
    type Server = Common.CommonRecord<{
      /** 服务器名称 */
      serverName: string;
      /** 社区ID */
      communityId: string;
      /** 模式ID */
      modeId: string;
      /** 游戏ID */
      gameId: string;
      /** IP */
      ip: string;
      /** 端口 */
      port: string;
      /** 排序值 */
      sort: number;
    }>;

    /** server params */
    type ServerParams = {
      /** 服务器名称 */
      serverName: string;
      /** 社区ID */
      communityId: string;
      /** 模式ID */
      modeId: string;
      /** 游戏ID */
      gameId: string;
    };

    /** serverVo */
    type ServerVo = Common.CommonRecord<{
      /** 服务器名称 */
      serverName: string;
      /** 社区ID */
      communityId: string;
      /** 社区名称 */
      communityName: string;
      /** 模式ID */
      modeId: string;
      /** 模式名称 */
      modeName: string;
      /** 游戏ID */
      gameId: string;
      /** 游戏名称 */
      gameName: string;
      /** IP */
      ip: string;
      /** 端口 */
      port: string;
      /** 排序值 */
      sort: number;
    }>;

    /** 神器列表 */
    type Artifact = {
      code: string;
      desc: string;
    };

    /** map search params */
    type MapSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Map, 'mapName' | 'mapLabel' | 'modeId' | 'type' | 'tag'> & Api.Common.CommonSearchParams
    >;

    /** map list */
    type MapList = Common.PaginatingQueryRecord<MapVo>;

    /** map */
    type Map = Common.CommonRecord<{
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 图片路径 */
      mapUrl: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: string;
      /** 地图神器 */
      artifact: string;
    }>;

    /** map params */
    type MapParams = {
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: Array<string>;
      /** 地图神器 */
      artifact: Artifact[];
    };

    /** mapVo */
    type MapVo = Common.CommonRecord<{
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 图片路径 */
      mapUrl: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: Array<string>;
      /** 地图神器 */
      artifact: Artifact[];
    }>;

    /** live search params */
    type LiveSearchParams = CommonType.RecordNullable<Pick<Api.Game.Live, 'uid'> & Api.Common.CommonSearchParams>;

    /** live list */
    type LiveList = Common.PaginatingQueryRecord<LiveVo>;

    /** live */
    type Live = Common.CommonRecord<{
      /** 用户uid */
      uid: string;
      /** 用户头像地址 */
      avatar: string;
      /** 背景地址 */
      bgUrl: string;
    }>;

    /** live params */
    type LiveParams = {
      /** 用户uid */
      uid: string;
      /** 用户头像地址 */
      avatar: string;
      /** 背景地址 */
      bgUrl: string;
    };

    /** liveVo */
    type LiveVo = Common.CommonRecord<{
      /** 用户uid */
      uid: string;
      /** 用户头像地址 */
      avatar: string;
      /** 背景地址 */
      bgUrl: string;
    }>;
  }
}
