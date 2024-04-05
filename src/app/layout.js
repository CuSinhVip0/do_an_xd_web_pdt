import "react-notifications/lib/notifications.css";
import "@/app/globals.css";
import SessionProvider from "@/components/SessionProviders";
import { Providers } from "@/components/NextUiProviders";

import { getServerSession } from "next-auth";
import NextTopLoader from "nextjs-toploader";
export const metadata = {
    title: "Phòng đào tạo",
    icons: {
        icon: [
            {
                url: "/favicon_32x32.png", // /public path
                href: "/favicon_32x32.png", // /public path
            },
        ],
    },
};
export default async function RootLayout({ children }) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body className="overflow-y-scroll">
                <NextTopLoader
                    color="#2299DD"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                <SessionProvider session={session}>
                    <Providers>{children}</Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
