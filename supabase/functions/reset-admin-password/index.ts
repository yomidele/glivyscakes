import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find admin user
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) return new Response(JSON.stringify({ error: listError.message }), { status: 500 });

  const adminUser = users?.find(u => u.email === "yomidele2120@gmail.com");

  if (!adminUser) {
    // Create the admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
      email_confirm: true,
    });
    if (createError) return new Response(JSON.stringify({ error: createError.message }), { status: 500 });

    // Assign admin role
    const { error: roleError } = await supabaseAdmin.from("user_roles").upsert({
      user_id: newUser.user.id,
      role: "admin",
    }, { onConflict: "user_id,role" });

    return new Response(JSON.stringify({ message: "Admin created", userId: newUser.user.id, roleError }));
  }

  // Update password
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
    password: "Kikelomo2120@",
    email_confirm: true,
  });

  if (updateError) return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });

  // Ensure admin role exists
  const { error: roleError } = await supabaseAdmin.from("user_roles").upsert({
    user_id: adminUser.id,
    role: "admin",
  }, { onConflict: "user_id,role" });

  return new Response(JSON.stringify({ message: "Password updated", userId: adminUser.id, roleError }));
});
