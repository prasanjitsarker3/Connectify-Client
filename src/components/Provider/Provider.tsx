"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "sonner";
import store, { persistor } from "../Redux/store";
import SocketProvider from "../SocketIO/socketProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SocketProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="white">
              <Toaster position="top-right" richColors />

              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </PersistGate>
      </SocketProvider>
    </Provider>
  );
}
