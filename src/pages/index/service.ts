
import http from '../../utils/http';

export const delPayItem = (id: number) => {
  return http('/v1/expend/delete', 'POST', { expendId: id })
}