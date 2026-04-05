import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import HowItWorks from '@/components/home/HowItWorks';
import Product from '@/components/home/product';
import WhyTurfTecWorks from '@/components/home/WhyItWorks';
import Hero from '@/components/home/Hero';
import BeforeAfter from '@/components/home/BeforeAfter';

export default function Welcome() {
    return (
      <AppHeaderLayout>
        <Hero />
        <BeforeAfter />
        <HowItWorks />
        <Product />
        <WhyTurfTecWorks />
      </AppHeaderLayout>  
    );
}
