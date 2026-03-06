import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Try to create admin user first
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
      email_confirm: true,
    });

    if (createError) {
      // User likely exists, try to find and update
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
      
      if (listError) {
        return new Response(JSON.stringify({ error: "List error: " + listError.message }), { status: 500 });
      }

      const adminUser = users?.find((u: any) => u.email === "yomidele2120@gmail.com");
      
      if (!adminUser) {
        return new Response(JSON.stringify({ error: "Create error: " + createError.message + ", and user not found in list" }), { status: 500 });
      }

      // Update password
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
        password: "Kikelomo2120@",
        email_confirm: true,
      });

      if (updateError) {
        return new Response(JSON.stringify({ error: "Update error: " + updateError.message }), { status: 500 });
      }

      // Ensure admin role
      await supabaseAdmin.from("user_roles").upsert({
        user_id: adminUser.id,
        role: "admin",
      }, { onConflict: "user_id,role" });

      return new Response(JSON.stringify({ message: "Password updated successfully", userId: adminUser.id }));
    }

    // New user created, assign role
    await supabaseAdmin.from("user_roles").upsert({
      user_id: newUser.user.id,
      role: "admin",
    }, { onConflict: "user_id,role" });

    return new Response(JSON.stringify({ message: "Admin created successfully", userId: newUser.user.id }));
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
