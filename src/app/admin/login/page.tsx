import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-full flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="mt-2 text-muted-foreground">
            Chatriya Nadar Matriculation HSS
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 rounded-lg border border-dashed border-border bg-card p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Dev Mode Credentials
          </p>
          <p className="text-sm text-foreground">
            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">admin@school.edu</span>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
