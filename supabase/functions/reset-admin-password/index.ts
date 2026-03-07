import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const userId = "95d904aa-f385-4239-91db-07601bdbcca2";

  // Update password directly by ID
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: "Kikelomo2120@",
    email_confirm: true,
  });

  if (updateError) return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });

  // Ensure admin role exists
  const { data: existingRole } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (!existingRole) {
    await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
  }

  return new Response(JSON.stringify({ success: true, message: "Admin password reset successfully" }));
});
