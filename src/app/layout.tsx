'use client';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Navbar from 'components/navbar';
import {Component} from "react";
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

metadata.title = 'CDTCDL-2023';

export default class RootLayout extends Component<{ children: React.ReactNode}> {
    render() {
        let {children} = this.props;
        return (
            <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="description" content={metadata?.description ?? ''}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{metadata?.title?.toString() ?? ''}</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            </head>


            <body className={inter.className}>
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>

            <footer></footer>
            </body>
            </html>
        );
    }
}
