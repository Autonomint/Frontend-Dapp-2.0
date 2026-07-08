# Commands
- Build: `npm run build` (run before every commit)
- Dev: `npm run dev`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit` (use instead of build during development)

# Commit Process
- Husky runs `npx lint-staged && npm run build` automatically on commit
- Always run `npm run build` before pushing

# Architecture
- Next.js 15 App Router, React 19, Tailwind CSS 3.4
- Path alias `@` maps to project root (e.g. `@/design-systems/...`)
- Atomic design in `design-systems/`: atoms/, molecule/, organisms/, templates/
- Custom hooks live in **`hookes/`** (not `hooks/`) — `hookes/api-hooks/` and `hookes/contract-hooks/`
- Blockchain config in `blockchain/`: ABIs (`abis/`), contract addresses (`contracts.ts`), wagmi setup (`WalletConfigs/`)
- Dark mode via `next-themes` with class strategy; wrapper at `providers/theme-provider.tsx`
- Provider hierarchy: WalletProvider → QueryProvider → context Provider → ThemeProvider
- Routes: `/earn`, `/dashboard`, `/bridge`, `/deposit`, `/redeem`, `/trick`, `/strategies`, `/dcds`, `/farmyourluck`, `/mintusdalist`, `/mintUSDaWithCollateral/[currency]`
- Backend API: `https://43.204.73.16`

# Style Conventions
- Use Tailwind utility classes; custom colors (grayLight, textBlack, etc.) and fonts (plex-grotesk, plex-sans) are defined in `tailwind.config.ts`
- `<Button>` component from `@/design-systems/atoms/button` uses `cva` with a default variant that applies `bg-black` and `dark:bg-custom-gradient-to-bottom` — these may override passed `className`. For full style control, use a plain `<button>` instead
- ESLint has all strict TS rules disabled (`no-explicit-any`, `no-unused-vars`, `ban-ts-comment`, etc.) — loose TypeScript is expected

# Key Dependencies
- Web3: wagmi 2.14, viem 2.22, ethers 6.13, @reown/appkit 1.6
- UI: shadcn/ui (Radix primitives), framer-motion, lucide-react, sonner (toasts)
- State: TanStack React Query 5, Formik + Yup
- Styling: tailwind-merge + clsx via `cn()` utility in `@/utils/helpers`

# Code Quality & Documentation
- Write clean, maintainable, and modular code.
- Add clear JSDoc comments to functions and inline comments explaining complex, non-obvious logic.
- Preserve existing comments and docstrings unless explicitly asked to modify them.

