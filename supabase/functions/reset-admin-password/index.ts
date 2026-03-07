import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find the admin user
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) return new Response(JSON.stringify({ error: listError.message }), { status: 500 });

  const adminUser = users.find(u => u.email === "yomidele2120@gmail.com");
  if (!adminUser) {
    return new Response(JSON.stringify({ error: "Admin user not found" }), { status: 404 });
  }

  // Update password
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
    password: "Kikelomo2120@",
    email_confirm: true,
  });

  if (updateError) return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });

  // Ensure admin role exists
  const { data: existingRole } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", adminUser.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!existingRole) {
    await supabaseAdmin.from("user_roles").insert({ user_id: adminUser.id, role: "admin" });
  }

  return new Response(JSON.stringify({ success: true, message: "Admin password reset successfully" }));
});
