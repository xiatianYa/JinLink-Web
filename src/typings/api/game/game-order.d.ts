declare namespace Api {
  namespace GameMapOrder {
    /** 地图订阅 */
    type MapOrder = Common.CommonRecord<{
      /** 地图ID */
      mapId: string;
    }>;

    /** 地图订阅参数 */
    type MapOrderParams = {
      /** 主键ID */
      id: string;
      /** 用户ID */
      userId: string;
      /** 地图ID */
      mapId: string;
      /** 通知记录 */
      orderTimes: string;
    };

    /** 通知记录 */
    type orderTime = {
      /** 服务器地图 */
      addr: string;
      /** 地图名称 */
      mapName: string;
      /** 通知时间 */
      orderTime: string;
    };

    /** 地图订阅列表 */
    type gameMapOrderList = Array<gameMapOrderVo>;

    /** 地图订阅Vo */
    type gameMapOrderVo = Common.CommonRecord<{
      /** 用户ID */
      userId: string;
      /** 地图ID */
      mapId: string;
      /** 地图Vo */
      gameMapVo: Api.Game.MapVo;
      /** 通知记录 */
      orderTimes: Array<orderTime>;
    }>;
  }
}
