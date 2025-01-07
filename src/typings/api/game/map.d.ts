declare namespace Api {
  namespace Game {
    /** 神器列表 */
    type Artifact = {
      code: string;
      desc: string;
    };

    /** map search params */
    type MapSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Map, 'mapName' | 'mapLabel' | 'modeId' | 'type' | 'tag'> & Api.Common.CommonSearchParams
    >;

    /** map list */
    type MapList = Common.PaginatingQueryRecord<MapVo>;

    /** map */
    type Map = Common.CommonRecord<{
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 图片路径 */
      mapUrl: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: string;
      /** 地图神器 */
      artifact: string;
    }>;

    /** map params */
    type MapParams = {
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: Array<string>;
      /** 地图神器 */
      artifact: Artifact[];
    };

    /** mapVo */
    type MapVo = Common.CommonRecord<{
      /** 地图名称 */
      mapName: string;
      /** 译名 */
      mapLabel: string;
      /** 图片路径 */
      mapUrl: string;
      /** 模型路径 */
      mapModeUrl: string;
      /** 模式ID */
      modeId: string;
      /** 地图难度 */
      type: string;
      /** 地图标签 */
      tag: Array<string>;
      /** 地图神器 */
      artifact: Artifact[];
      /** 地图CD */
      mapCd: string;
      /** 扩展地图 */
      exgMap: {
        /** 地图名称 */
        Name: string;
        /** 地图名称(翻译) */
        CnName: string;
        /** 地图名称(最后运行时间) */
        LastRun: string;
        /** 冷却时间(分钟) */
        CooldownMinute: number;
        /** 冷却截止 */
        deadline: string;
        /** 是否可预定 */
        isOrder: boolean;
      };
    }>;
  }
}
