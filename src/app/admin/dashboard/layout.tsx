import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect('/admin');

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
