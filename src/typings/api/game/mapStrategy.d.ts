declare namespace Api {
  namespace Game {
    /** map strategy search params */
    type MapStrategySearchParams = CommonType.RecordNullable<
      Pick<Api.Game.MapStrategy, 'title' | 'mapId' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** map list */
    type MapStrategyList = Common.PaginatingQueryRecord<MapStrategyVo>;

    /** map strategy */
    type MapStrategy = Common.CommonRecord<{
      /** 攻略名称 */
      title: string;
      /** 地图ID */
      mapId: string;
      /** 攻略内容 */
      content: string;
      /** 攻略视频路径 */
      videoUrl: string;
      /** 审核状态 */
      status: number;
    }>;

    /** map strategyVo */
    type MapStrategyVo = Common.CommonRecord<{
      /** 文字名称 */
      title: string;
      /** 地图ID */
      mapId: string | null;
      /** 审核状态 */
      status: string | null;
      /** 攻略内容 */
      content: string;
      /** 攻略视频路径 */
      videoUrl: string;
      /** 译名 */
      mapLabel: string;
      /** 发布人ID */
      createUserId: string;
      /** 发布人 */
      createUserName: string;
      /** 发布时间 */
      createTime: string;
    }>;

    /** map strategy params */
    type MapStrategyParams = {
      /** 攻略名称 */
      title: string;
      /** 地图ID */
      mapId: string | null;
      /** 攻略内容 */
      content: string;
      /** 攻略视频路径 */
      videoUrl: string;
    };
  }
}
