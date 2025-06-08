import HomePage from '@/components/Home/HomePage';
import TodaysWorkout from '@/components/Home/TodaysWorkout';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [show, setShow] = useState<boolean>(false);
  
  useEffect(() => {
    setShow(true); // Show the component
    const timer = setTimeout(() => {
      setShow(false); // Hide after 3 seconds
    }, 1500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
    {show ? (
          <HomePage/>
      ): <TodaysWorkout/>}
    </>
  );
}