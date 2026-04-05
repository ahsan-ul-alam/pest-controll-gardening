import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import type { AppLayoutProps } from '@/types';
import { CartProvider } from '../../context/CartContext';

export default function AppHeaderLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <CartProvider>
            <AppShell>
                <Header />
                <AppContent>{children}</AppContent>
                <Footer />
            </AppShell>
        </CartProvider>
    );
}
