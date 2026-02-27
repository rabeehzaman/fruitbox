import "./globals.css";
import { FruitBoxProvider } from "@/lib/context";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata = {
  title: "Fruit Box Manager",
  description: "Wholesale fruit box management — track boxes received and given",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FruitBox",
  },
};

export const viewport = {
  themeColor: "#2E7D32",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <FruitBoxProvider>
          {children}
        </FruitBoxProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
