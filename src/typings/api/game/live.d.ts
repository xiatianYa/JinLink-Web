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
      /** 哔哩哔哩直播 */
      biliVo: {
        /** 直播间ID */
        roomId: number;
        /** uid */
        uid: number;
        /** 直播状态 */
        liveStatus: number;
        /** 直播间网页url */
        liveUrl: string;
        /** 直播间标题 */
        title: string;
        /** 直播间父分区名称 */
        parentAreaName: string;
        /** 直播间分区名称 */
        areaName: string;
        /** 开播时间 */
        liveTime: string;
        /** 在线人数 */
        online: number;
        /** 主播用户名 */
        uname: string;
        /** 直播间头像url */
        avatarUrl: string;
        /** 直播间背景url */
        bgUrl: string;
      };
    }>;
  }
}
