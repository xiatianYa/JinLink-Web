declare namespace Api {
  namespace Game {
    /** game search params */
    type ModelSearchParams = CommonType.RecordNullable<
      Pick<Api.Game.Model, 'modelName' | 'modelType'> & Api.Common.CommonSearchParams
    >;

    /** model */
    type Model = Common.CommonRecord<{
      /** 模型名称 */
      modelName: string;
      /** 模型类型 */
      modelType: string;
      /** 模型图片路径 */
      modelUrl: string;
      /** 模型路径 */
      modelModeUrl: string;
    }>;

    /** model list */
    type ModelList = Common.PaginatingQueryRecord<Model>;

    /** model vo */
    type ModelVo = Common.CommonRecord<{
      /** 模型名称 */
      modelName: string;
      /** 模型类型 */
      modelType: string;
      /** 模型图片路径 */
      modelUrl: string;
      /** 模型路径 */
      modelModeUrl: string;
    }>;

    type ModelParams = {
      /** 模型名称 */
      modelName: string;
      /** 模型类型 */
      modelType: string;
      /** 模型图片路径 */
      modelUrl: string;
      /** 模型路径 */
      modelModeUrl: string;
    };
  }
}
