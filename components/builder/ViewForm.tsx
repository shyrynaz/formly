'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

const ViewForm = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const link = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button onClick={() => window.open(link, '_blank')}> View Form</Button>
  );
};

export default ViewForm;
