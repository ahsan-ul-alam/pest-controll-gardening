import React, { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, ChevronDown, ChevronUp, Check, Droplets, Sprout, AlertCircle, Share2, ThumbsUp, ArrowLeft } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import ProductDetailContent from '../../components/product-detail-content';


export default function ProductDetailPage() {

  return (
    <AppHeaderLayout>
      <ProductDetailContent />
    </AppHeaderLayout>
  );
}