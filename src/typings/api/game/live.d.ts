declare namespace Api {
  namespace Game {
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
