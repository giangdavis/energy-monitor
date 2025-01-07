'use client';

import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Energy Monitor
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to start tracking your energy usage
          </p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-300">
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  formAction={login} 
                  className="bg-blue-600 text-white p-2 rounded"
                >
                  Log in
                </button>
                <button 
                  formAction={signup}
                  className="bg-gray-200 text-gray-700 p-2 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}