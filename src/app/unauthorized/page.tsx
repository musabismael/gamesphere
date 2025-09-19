'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, ArrowLeft, Shield, Lock, User } from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';

export default function UnauthorizedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userRole, isAuthenticated } = usePermissions();
  const [attemptedRoute, setAttemptedRoute] = useState<string | null>(null);

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl) {
      setAttemptedRoute(callbackUrl);
    }
  }, [searchParams]);

  const getErrorMessage = () => {
    if (!isAuthenticated) {
      return {
        title: 'Authentication Required',
        description: 'You need to sign in to access this page.',
        icon: User,
        color: 'blue'
      };
    }

    if (attemptedRoute?.startsWith('/admin')) {
      return {
        title: 'Admin Access Required',
        description: 'This page is only accessible to administrators.',
        icon: Shield,
        color: 'red'
      };
    }

    if (attemptedRoute?.startsWith('/developer') || attemptedRoute?.startsWith('/dashboard')) {
      return {
        title: 'Developer Access Required',
        description: 'This page is only accessible to developers and administrators.',
        icon: Lock,
        color: 'yellow'
      };
    }

    return {
      title: 'Access Denied',
      description: 'You don\'t have permission to access this page.',
      icon: AlertTriangle,
      color: 'red'
    };
  };

  const errorInfo = getErrorMessage();
  const IconComponent = errorInfo.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
            errorInfo.color === 'red' ? 'bg-red-500/20' :
            errorInfo.color === 'yellow' ? 'bg-yellow-500/20' :
            'bg-blue-500/20'
          }`}>
            <IconComponent className={`h-8 w-8 ${
              errorInfo.color === 'red' ? 'text-red-400' :
              errorInfo.color === 'yellow' ? 'text-yellow-400' :
              'text-blue-400'
            }`} />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {errorInfo.title}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {errorInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500">
            Error Code: 403 - Forbidden
            {userRole && (
              <div className="mt-1">
                Current role: <span className="font-medium text-gray-300">{userRole}</span>
              </div>
            )}
            {attemptedRoute && (
              <div className="mt-1">
                Attempted to access: <span className="font-medium text-gray-300">{attemptedRoute}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {!isAuthenticated ? (
              <Button asChild className="w-full">
                <Link href={`/signin${attemptedRoute ? `?callbackUrl=${encodeURIComponent(attemptedRoute)}` : ''}`}>
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/" className="flex items-center justify-center">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild className="w-full">
              <Link href="javascript:history.back()" className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
            {isAuthenticated && (
              <Button 
                variant="outline" 
                onClick={() => router.push('/contact')}
                className="w-full"
              >
                Contact Support
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
