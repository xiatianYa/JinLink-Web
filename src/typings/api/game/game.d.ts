declare namespace Api {
  namespace Game {
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

    /** 用户所在服务器信息 */
    type UserServerInfo = Common.CommonRecord<{
      /** 服务器名称 */
      serverName: string;
      /** 服务器地址 */
      addr: string;
      /** 地图名称 */
      mapName: string;
      /** 地图标签 */
      mapLabel: string;
      /** 地图图片 */
      mapUrl: string;
      /** 在线玩家数 */
      players: number;
      /** 最大玩家数 */
      maxPlayers: number;
    }>;
  }
}
