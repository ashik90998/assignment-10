import { DashboardSidebarPage } from "@/components/dashboard/Sidebar";


export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            <DashboardSidebarPage />

            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}