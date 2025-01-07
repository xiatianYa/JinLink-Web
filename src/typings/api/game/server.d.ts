declare namespace Api {
  namespace Game {
    /** server search params */
    type ServerSearchParams = CommonType.RecordNullable<
      Pick<
        {
          /** 服务器名称 */
          serverName: string;
          /** 社区ID */
          communityIds: Array<string> | null;
          /** 模式ID */
          modeIds: Array<string> | null;
          /** 游戏ID */
          gameId: string;
        },
        'serverName' | 'communityIds' | 'modeIds' | 'gameId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** server list */
    type ServerList = Common.PaginatingQueryRecord<ServerVo>;

    /** server vo list */
    type SteamServerVoList = Array<SourceServerVo>;

    /** server vo page */
    type SteamServerVoPage = Common.PaginatingQueryRecord<SteamServerVo>;

    /** server vo */
    type SteamServerOnLineUser = Array<SourcePlayer>;

    /** server */
    type Server = Common.CommonRecord<{
      /** 服务器名称 */
      serverName: string;
      /** 社区ID */
      communityId: string;
      /** 模式ID */
      modeId: string | null;
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
      modeId: string | null;
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

    /** steam server vo */
    type SteamServerVo = {
      /** 服务器名称 */
      serverName: string;
      /** 服务器地址 */
      addr: string;
      /** 服务器IP */
      ip: string;
      /** 服务器端口 */
      port: string;
      /** 模式ID */
      modeId: number;
      /** 游戏ID */
      gameId: string;
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
      /** 最小在线玩家数 */
      minPlayers: number;
      /** 在线玩家 */
      sourcePlayers: Array<SourcePlayer>;
    };
    type SourcePlayer = {
      /** 索引 */
      index: number;
      /** 名称 */
      name: string;
      /** 分数 */
      score: number;
      /** 持续时间 */
      duration: number;
    };
    type SourceServerVo = {
      /** 社区对象 */
      gameCommunity: Game.Community;
      /** 社区在线人数 */
      onLineUserNumber: number;
      /** 服务器列表 */
      gameServerVoList: Array<SteamServerVo>;
    };

    /** 我的世界服务器分页 */
    type MinecraftPage = Common.PaginatingQueryRecord<MinecraftServerVo>;

    /** 我的世界服务器vo */
    type MinecraftServerVo = Common.CommonRecord<{
      /** 服务器名称 */
      description: string;
      /** 在线玩家数据 */
      players: {
        online: number;
        max: number;
      };
      /** 服务器版本 */
      version: {
        name: string;
      };
      /** 服务器地图 */
      addr: string;
      /** 图标 */
      favicon: string;
    }>;
  }
}
