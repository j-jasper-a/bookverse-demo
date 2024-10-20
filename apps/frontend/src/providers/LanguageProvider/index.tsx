import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

type ProvidersPropsType = {
  children: ReactNode;
};

const LanguageProvider = async ({ children }: ProvidersPropsType) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default LanguageProvider;
