import Link from 'next/link';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="w-full bg-cover bg-center flex flex-col items-center justify-center p-10" style={{ backgroundImage: 'url(/images/home.jpg)' }}>
    <h1 className="text-5xl font-bold text-white mb-4">Welcome to Loket Musik</h1>
    <p className="text-xl text-white mb-6">Your gateway to the best concerts</p>
  </div>
  );
}
