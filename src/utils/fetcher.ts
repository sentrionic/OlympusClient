import axios from 'axios';

export default async function fetcher(url: string) {
  const { data } = await axios.get(url, {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });
  return data;
}
