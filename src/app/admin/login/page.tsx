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
      </div>
    </div>
  );
}
