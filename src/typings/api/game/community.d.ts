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
      Pick<Api.Game.Server, 'communityId' | 'modeId' | 'gameId'> & Api.Common.CommonSearchParams
    >;

    /** server list */
    type ServerList = Common.PaginatingQueryRecord<ServerVo>;

    /** server */
    type Server = Common.CommonRecord<{
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
    }>;

    /** server params */
    type ServerParams = {
      /** 社区ID */
      communityId: string;
      /** 模式ID */
      modeId: string;
      /** 游戏ID */
      gameId: string;
    };

    /** serverVo */
    type ServerVo = Common.CommonRecord<{
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
    }>;
  }
}
