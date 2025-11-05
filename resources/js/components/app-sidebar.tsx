import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, CheckSquare, Columns3, Folder, LayoutGrid, Tag, Target, FileText, BarChart3, HelpCircle } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Tasks',
        href: '/tasks',
        icon: CheckSquare,
    },
    {
        title: 'Calendar',
        href: '/tasks-calendar',
        icon: Calendar,
    },
    {
        title: 'Kanban',
        href: '/tasks-kanban',
        icon: Columns3,
    },
    {
        title: 'Goals',
        href: '/goals',
        icon: Target,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Folder,
    },
    {
        title: 'Tags',
        href: '/tags',
        icon: Tag,
    },
    {
        title: 'Templates',
        href: '/templates',
        icon: FileText,
    },
    {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
    },
    {
        title: 'Help & Guide',
        href: '/guide',
        icon: HelpCircle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
