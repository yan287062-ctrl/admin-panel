import './globals.css';

export const metadata = {
  title: 'Paing Gyi Admin',
  description: 'Admin Panel for Paing Gyi Game Shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
