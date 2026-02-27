import "./globals.css";
import { FruitBoxProvider } from "@/lib/context";

export const metadata = {
  title: "Fruit Box Manager",
  description: "Wholesale fruit box management — track boxes received and given",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FruitBoxProvider>
          {children}
        </FruitBoxProvider>
      </body>
    </html>
  );
}
