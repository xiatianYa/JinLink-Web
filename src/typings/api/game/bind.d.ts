declare namespace Api {
  namespace Game {
    /** GameBind params */
    type GameBindParams = {
      communityId: string;
      cfg: string;
    };

    /** GameBind */
    type GameBind = {
      communityId: string;
      cfg: string;
    };

    /** GameBind search params */
    type GameBindSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.GameBind, 'communityId'> & Api.Common.CommonSearchParams
    >;
  }
}
