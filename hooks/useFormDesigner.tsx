'use client';

import { FormDesignerContext } from '@/components/context/FormDesignerContext';
import React, { useContext } from 'react';

const useFormDesigner = () => {
  const context = useContext(FormDesignerContext);
  if (!context) {
    throw new Error('useFormDesigner must be used inside FormDesignerContext');
  }
  return context;
};

export default useFormDesigner;
