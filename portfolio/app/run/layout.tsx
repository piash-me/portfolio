export const metadata = {
  robots: { index: false, follow: false },
};

export default function RunLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#08090B' }}>{children}</body>
    </html>
  );
}
