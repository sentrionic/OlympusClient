import axios from 'axios';

export default async function getFetcher(url: string) {
  const { data } = await axios.get(url, {
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
    withCredentials: true,
  });
  return data;
}
