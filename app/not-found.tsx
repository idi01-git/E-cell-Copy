import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          404
        </h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-gray-300 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild variant="default" size="lg">
            <Link href="/" className="font-medium">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
