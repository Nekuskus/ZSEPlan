import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { MantineLogo } from '@mantinex/mantine-logo';
import '@mantine/core/styles.css';
import './css/fontello.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ZSE Plan",
    authors: { name: "kuskus", url: "https://github.com/Nekuskus"},
    description: "An implementation written in Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript/>
            </head>
            <body className={inter.className}>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
