export const metadata = {
  title: 'HWS Bot Dashboard',
  description: 'WhatsApp Bot Control Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
