import React from 'react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import CartContent from '../components/CartContent';

export default function CartPage() {
  return (
    <AppHeaderLayout>
      <CartContent />
    </AppHeaderLayout>
  );
}