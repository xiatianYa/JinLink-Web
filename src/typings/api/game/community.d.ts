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
  }
}
