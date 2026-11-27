import { AuthForm } from "@/components/auth/auth-form";

export default function InscriptionPage() {
  return (
    <section className="section">
      <div className="container">
        <AuthForm mode="signup" />
      </div>
    </section>
  );
}
