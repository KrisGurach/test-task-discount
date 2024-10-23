import localFont from "next/font/local";
import "./globals.css";

const rootBold = localFont({
  src: "./fonts/PT-Root-UI_Bold.ttf",
  variable: "--font-root-bold",
  weight: "700",
});

const rootMedium = localFont({
  src: "./fonts/PT-Root-UI_Medium.ttf",
  variable: "--font-root-medium",
  weight: "500",
});

const rootRegular = localFont({
  src: "./fonts/PT-Root-UI_Regular.ttf",
  variable: "--font-root-regular",
  weight: "400",
});

const rubik = localFont({
  src: "./fonts/Rubik.ttf",
  variable: "--font-rubik",
  weight: "500 700",
});

const neue = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  variable: "--font-neue",
  weight: "400",
});

const neueCyr = localFont({
  src: "./fonts/Bebas Neue Cyrillic.ttf",
  variable: "--font-neue-cyr",
  weight: "400",
});

export const metadata = {
  title: "Choose your tariff",
  description: "Find the best tariff for keeping yourself"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${rootBold.variable} ${rootMedium.variable} ${rootRegular.variable} ${rubik.variable} ${neue.variable} ${neueCyr.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
