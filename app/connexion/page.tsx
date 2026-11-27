import { AuthForm } from "@/components/auth/auth-form";

export default function ConnexionPage() {
  return (
    <section className="section">
      <div className="container">
        <AuthForm mode="login" />
      </div>
    </section>
  );
}
