import axios, { Method } from 'axios';

export interface ApiQueryParams {
  params?: any;
  data?: any;
  headers?: any;
}

export type ApiPrefix = string | number;

class Api {
  url: string;
  resource: string;

  constructor(resource: string) {
    this.resource = resource;
    this.url =
      process.env.REACT_APP_BASE_URL || `https://api.openweathermap.org`;
  }

  get = async (id: ApiPrefix, params: ApiQueryParams) => {
    return this.buildQuery('get', params, id);
  };

  post = async (params: ApiQueryParams, prefix?: ApiPrefix) => {
    return this.buildQuery('post', params, prefix);
  };

  put = async (id: ApiPrefix, params: ApiQueryParams) => {
    return this.buildQuery('put', params, id);
  };

  destroy = async (id: ApiPrefix, params: ApiQueryParams = {}) => {
    return this.buildQuery('delete', params, id);
  };

  upload = async (
    params: ApiQueryParams,
    prefix?: ApiPrefix,
    upload?: boolean,
  ) => {
    return this.buildQuery('post', params, prefix, upload);
  };

  buildQuery = async (
    method: Method,
    params: ApiQueryParams,
    prefix?: ApiPrefix,
    upload?: boolean,
  ) => {
    const headers = {
      'Content-Type': 'application/json',
      // Accept: "application/json",
    };

    if (upload) {
      headers['Content-Type'] = `multipart/form-data;boundary=file`;
    }

    return axios({
      url: this.getFullUrl(prefix),
      method,
      data: params.data,
      params: params.params,
      headers,
    });
  };

  getFullUrl = (prefix?: ApiPrefix) => {
    return `${this.url}/${this.resource}${prefix ? `/${prefix}` : ''}`;
  };
}

export default Api;
