import { MainLayout } from 'components/layout';
import { PageProps } from '../../../.next/types/app/history/page';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

export interface Post {}

export default function HistoryPage(PageProps: Post) {
  const [postList, setPostList] = useState([]);
  let useRouter;

  if (typeof window !== 'undefined') {
    useRouter = require('next/router').useRouter;
  }
  const router = useRouter();

  console.log('About query', router.query);

  useEffect(() => {
    (async function fetchPostList() {
      try {
        const requestUrl = process.env.API_SERVER_URL + '/posts';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        setPostList(responseJSON);
      } catch (error: any) {
        console.log('Failed to fetch post list: ', error.message);
      }
    })();
  }, []);
}
