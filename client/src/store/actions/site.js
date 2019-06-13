import axios from 'axios';

import { SITE_SERVER } from '../../components/utils/misc';
import { GET_SITE_DATA, UPDATE_SITE_DATA } from './types';

export function getSiteData() {
  const request = axios
    .get(`${SITE_SERVER}/siteData`)
    .then(res => res.data);

  return {
    type: GET_SITE_DATA,
    payload: request,
  };
}

export function updateSiteData(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/siteData`, dataToSubmit)
    .then(res => res.data);

  return {
    type: UPDATE_SITE_DATA,
    payload: request,
  };
}
