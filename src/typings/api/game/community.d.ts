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
  }
}
