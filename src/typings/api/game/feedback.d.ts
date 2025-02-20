declare namespace Api {
  namespace Feedback {
    /** community search params */
    type FeedbackSearchParams = CommonType.RecordNullable<
      Pick<Api.Feedback.Feedback, 'content' | 'type' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** Feedback list */
    type FeedbackList = Common.PaginatingQueryRecord<FeedbackVo>;

    /** Community */
    type Feedback = Common.CommonRecord<{
      /** content */
      content: string;
      /** mapUrls */
      image: string;
      /** type */
      type: string;
      /** status */
      status: string;
      /** feedback */
      feedback: string;
    }>;

    type FeedbackVo = Common.CommonRecord<{
      /** userName */
      userName: string;
      /** content */
      content: string;
      /** mapUrls */
      image: Array<string>;
      /** type */
      type: string;
      /** status */
      status: string;
      /** feedback */
      feedback: string;
    }>;

    type FeedbackParams = {
      /** content */
      content: string;
      /** mapUrls */
      image: Array<string>;
      /** type */
      type: string;
      /** status */
      status: string;
    };
  }
}
