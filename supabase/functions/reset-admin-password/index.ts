import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const userId = "95d904aa-f385-4239-91db-07601bdbcca2";

    // Delete existing user first
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    console.log("Delete result:", deleteError?.message || "success");

    // Create new admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
      email_confirm: true,
    });

    if (createError) {
      console.log("Create error:", createError.message);
      return new Response(JSON.stringify({ error: createError.message }), { status: 500 });
    }

    console.log("New user ID:", newUser.user.id);

    // Add admin role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: newUser.user.id, role: "admin" });

    console.log("Role result:", roleError?.message || "success");

    return new Response(JSON.stringify({ 
      success: true, 
      userId: newUser.user.id,
      message: "Admin user recreated successfully" 
    }));
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
