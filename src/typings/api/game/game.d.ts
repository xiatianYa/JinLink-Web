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
  }
}
