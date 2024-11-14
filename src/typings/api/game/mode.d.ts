declare namespace Api {
  namespace Game {
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
  }
}
