"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInComponent({ providers }: { providers: any }) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {provider.name === "Google" && (
                <Image
                  src="/google.svg"
                  alt="Google Logo"
                  width={20}
                  height={20}
                />
              )}
              {provider.name === "GitHub" && (
                <Image
                  src="/github.svg"
                  alt="GitHub Logo"
                  width={20}
                  height={20}
                />
              )}
              <span>Sign in with {provider.name}</span>
            </button>
          </div>
        ))}
    </>
  );
}
