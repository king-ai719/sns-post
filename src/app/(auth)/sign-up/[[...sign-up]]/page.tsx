export const runtime = 'edge'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: 'w-full max-w-sm',
          card: 'bg-surface-1 border border-surface-border shadow-none rounded-2xl',
          headerTitle: 'text-white',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'bg-surface-2 border-surface-border text-white hover:bg-surface-3',
          dividerLine: 'bg-surface-border',
          dividerText: 'text-zinc-500',
          formFieldLabel: 'text-zinc-300',
          formFieldInput: 'bg-surface-2 border-surface-border text-white focus:border-brand',
          formButtonPrimary: 'bg-brand hover:bg-brand-light text-black font-semibold',
          footerActionLink: 'text-brand hover:text-brand-light',
        },
      }}
    />
  )
}
