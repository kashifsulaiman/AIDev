import type { Metadata } from 'next';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ReduxStoreProvider from '@/providers/StoreProvider';
import { Toastify } from '@/components/Toaster';

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = 'AI Dev - Powering Your Future';
  const description = 'AI Dev - Build cutting-edge applications with ease.';
  const favicon = 'https://dc3yp5a9dizw2.cloudfront.net/images/aboutstory.jpg';

  return {
    title: siteTitle,
    description: description,

    openGraph: {
      title: siteTitle,
      description: description,
      siteName: siteTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: description,
    },
    icons: {
      icon: favicon,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          rel="icon"
          href="https://dc3yp5a9dizw2.cloudfront.net/images/aboutstory.png"
        />
        <meta name="slogan" content="Innovating with AI" />
      </head>
      <body className={`bg-white antialiased`}>
        <NextUIProvider>
          <ReactQueryProvider>
            <ReduxStoreProvider>
              <Toastify />
              <main>{children}</main>
            </ReduxStoreProvider>
          </ReactQueryProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
