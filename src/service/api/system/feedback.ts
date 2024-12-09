import { request } from '../../request';

/** get feedback list */
export function fetchGetFeedbackList(params?: Api.Feedback.FeedbackSearchParams) {
  return request<Api.Feedback.FeedbackList>({
    url: '/sysFeedback/page',
    method: 'get',
    params
  });
}

/** add feedback */
export function fetchAddFeedback(data: Api.Feedback.FeedbackParams) {
  return request({
    url: '/sysFeedback/save',
    method: 'post',
    data
  });
}

/** update feedback */
export function fetchUpdateFeedback(data: Api.Feedback.FeedbackParams) {
  return request({
    url: '/sysFeedback/update',
    method: 'put',
    data
  });
}

/** delete feedback */
export function fetchDeleteFeedbackById(id: string) {
  return request({
    url: `/sysFeedback/remove/${id}`,
    method: 'delete'
  });
}
