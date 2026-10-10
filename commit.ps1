git add src/lib/api.ts src/services/auth.service.ts src/services/upload.service.ts src/store/auth.store.ts src/validations/auth.validation.ts src/types/auth.types.ts
git commit -m "feat(core): setup api client, auth store, and global types"

git add src/components/auth/ src/app/login/ src/app/register/ src/app/verify-email/ src/app/forgot-password/ src/app/reset-password/
git commit -m "feat(auth): implement complete authentication flow UI"

git add src/components/userDashboard/profile/ src/app/dashboard/profile/
git commit -m "feat(profile): add user profile and security settings"

git add src/components/userDashboard/analytics/ src/services/dashboard.service.ts src/types/dashboard.types.ts src/app/dashboard/page.tsx
git commit -m "feat(dashboard): implement analytics dashboard with interactive charts"

git add src/components/userDashboard/applications/ src/services/jobApplication.service.ts src/types/job-application.types.ts src/validations/job-application.validation.ts src/app/dashboard/applications/
git commit -m "feat(applications): build job applications management feature"

git add src/components/landing/ src/app/page.tsx
git commit -m "feat(landing): enhance landing page UI with dynamic theme support"

git add src/components/ui/ src/components/theme-provider.tsx src/app/layout.tsx src/lib/utils.ts
git commit -m "chore(ui): update core UI components and layout providers"

git add package.json pnpm-lock.yaml pnpm-workspace.yaml
git commit -m "chore(deps): update project dependencies and workspace config"

git add .
git commit -m "chore: minor fixes and remaining unstaged changes"

git push origin salman
