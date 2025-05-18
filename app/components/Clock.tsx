'use client'
// components/Clock.tsx
import { useEffect, useState } from 'react';

let wakeLock: WakeLockSentinel | null = null;

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  // Format helpers
  const formatTime = (date: Date): string =>
    date.toLocaleTimeString('en-US', { hour12: false });
  const formatDate = (date: Date): string =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Wake Lock API
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    };

    requestWakeLock();

    return () => {
      clearInterval(intervalId);
      wakeLock?.release().catch(console.error);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="text-6xl font-bold">{formatTime(time)}</div>
      <div className="text-2xl font-medium">{formatDate(time)}</div>
    </div>
  );
};

export default Clock;
