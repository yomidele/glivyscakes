import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Try signing in first to see if user/password works
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
    });

    console.log("Sign in test:", signInError?.message || "SUCCESS - login works!");
    
    if (!signInError) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Credentials already work!",
        userId: signInData.user?.id 
      }));
    }

    // Try with old password
    const { data: oldData, error: oldError } = await supabaseAdmin.auth.signInWithPassword({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120",
    });
    console.log("Old password test:", oldError?.message || "SUCCESS with old password");

    // Try signup with new creds
    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
    });
    console.log("Signup attempt:", signUpError?.message || "signup result", JSON.stringify(signUpData?.user?.identities?.length));

    return new Response(JSON.stringify({ 
      signInError: signInError?.message,
      oldPasswordError: oldError?.message,
      oldPasswordSuccess: !oldError,
      signUpError: signUpError?.message,
      signUpIdentities: signUpData?.user?.identities?.length,
    }));
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
