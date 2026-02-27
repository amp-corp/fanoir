import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>FANOIR Admin</title>
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
