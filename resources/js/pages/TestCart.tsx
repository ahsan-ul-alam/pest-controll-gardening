import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function TestCart() {
  console.log("TestCart component is rendering!!!");

  return (
    <div style={{ padding: '40px', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '48px' }}>HELLO - CART TEST PAGE</h1>
      <p>If you see this → Inertia routing works</p>
    </div>
  );
}

TestCart.layout = AppHeaderLayout;