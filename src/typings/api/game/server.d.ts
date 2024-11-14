declare namespace Api {
  namespace Game {
    /** server search params */
    type ServerSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Server, 'serverName' | 'communityId' | 'modeId' | 'gameId'> & Api.Common.CommonSearchParams
    >;

    /** server list */
    type ServerList = Common.PaginatingQueryRecord<ServerVo>;

    /** server list */
    type SteamServerVoList = Array<SteamServerVo>;

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

    /** server server */
    type SteamServer = {
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
      /** 服务器数据 */
      serverVo: {
        /** 地图名称 */
        mapName: string;
        /** 地图标签 */
        mapLabel: string;
        /** 图片路径 */
        mapUrl: string;
        /** 地图类型 */
        type: string;
        /** 地图标签 */
        tag: Array<string>;
        /** 在线玩家数 */
        players: number;
        /** 最大在线玩家数 */
        maxPlayers: number;
      };
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

    /** steam server vo */
    type SteamServerVo = Common.CommonRecord<{
      /** 社区对象 */
      gameCommunityVo: Game.Community;
      /** 在线人数 */
      onlineCount: number;
      /** 社区服务器数据 */
      gameServerVoList: Array<Game.SteamServer>;
    }>;
  }
}
