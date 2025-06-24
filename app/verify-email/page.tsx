
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { resendConfirmation } from "../actions/auth";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is already confirmed, redirect to dashboard
  if (user?.email_confirmed_at) {
    redirect("/");
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            Verify Your Email
          </CardTitle>
          {searchParams?.message && (
            <CardDescription className="text-center text-red-500">
              {searchParams.message}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p>
              We've sent a confirmation email to <strong>{user?.email}</strong>
            </p>
            <p>Please check your inbox and click the verification link.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={resendConfirmation}
            variant="default"
            className="w-full cursor-pointer"
            type="submit"
          >
            Resend Verification Email
          </Button>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:underline"
          >
            Return to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
