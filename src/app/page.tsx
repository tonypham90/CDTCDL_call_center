'use client';
import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {use} from 'react';
import {AuthService} from 'services';

export default function Home() {
    const router = useRouter();

    function goToDetailPage() {
        router.push('/');
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Đề tài: Quản lý đặt xe Taxi - Admin Page &nbsp;
                    <code className="font-mono font-bold"><Link href={"https://grabapi-192a6fe739cb.herokuapp.com/"}>
                    API Document
                </Link></code>
                </p>
                
            </div>

            <div
                className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <h1>Thành  Viên Nhóm</h1>
                <hr />
                <ul className='flex-auto'>
                    <li>Ngô Hoàng Vân Anh</li>
                    <li>Phạm Tuấn Anh</li>
                    <li>Nguyễn Thị Kim Cương</li>
                    <li>Huỳnh Chính</li>
                </ul>
                

            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                Cơ sở dữ liệu: <code className="font-mono font-bold">MongoDB</code>
                API: <code className="font-mono font-bold">NodeJS</code>
                Mobile: <code className="font-mono font-bold">Dart</code>
                Admin Web: <code className="font-mono font-bold">NextJS</code>
            </div>
        </div>
    );
}
