import axios from 'axios';
import { Http, HttpOutput, PostInput } from '../useCases/services/http';

// TODO: add env
const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

const http: Http = {
  post: async <Input, Output>({
    url,
    body,
  }: PostInput<Input>): Promise<HttpOutput<Output>> =>
    axiosInstance.post(url, body).then((res) => res.data),
};

export default http;
