import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // First try creating
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: "yomidele2120@gmail.com",
      password: "Kikelomo2120@",
      email_confirm: true,
    });

    if (!createError && createData?.user) {
      // Created successfully
      await supabaseAdmin.from("user_roles").upsert(
        { user_id: createData.user.id, role: "admin" },
        { onConflict: "user_id,role" }
      );
      return new Response(JSON.stringify({ message: "Admin created", userId: createData.user.id }));
    }

    // User exists - find via RPC or direct query
    const { data: userData, error: queryError } = await supabaseAdmin.rpc("get_user_id_by_email", { 
      user_email: "yomidele2120@gmail.com" 
    });

    // If RPC doesn't exist, try the signIn approach to get the user ID
    // Actually let's just try updating via the auth admin with listing page by page
    let page = 1;
    let found = false;
    let userId = "";
    
    while (!found && page <= 10) {
      const { data: listData, error: listErr } = await supabaseAdmin.auth.admin.listUsers({
        page: page,
        perPage: 50,
      });
      
      if (listErr) {
        // Try alternative: sign in to get user id, then update
        const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
          email: "yomidele2120@gmail.com",
          password: "Kikelomo2120",
        });
        
        if (signInData?.user) {
          userId = signInData.user.id;
          found = true;
          break;
        }
        
        // Try with old password variant
        const { data: signInData2 } = await supabaseAdmin.auth.signInWithPassword({
          email: "yomidele2120@gmail.com",
          password: "Kikelomo2120@",
        });
        
        if (signInData2?.user) {
          userId = signInData2.user.id;
          found = true;
          break;
        }
        
        // Try with Yomidele2120@gmail.com (capital Y)
        const { data: signInData3 } = await supabaseAdmin.auth.signInWithPassword({
          email: "Yomidele2120@gmail.com",
          password: "Kikelomo2120",
        });
        
        if (signInData3?.user) {
          userId = signInData3.user.id;
          found = true;
          break;
        }

        return new Response(JSON.stringify({ 
          error: "Cannot list users or sign in", 
          createError: createError?.message,
          listErr: listErr?.message,
          signInError: signInError?.message
        }), { status: 500 });
      }
      
      const user = listData?.users?.find((u: any) => u.email === "yomidele2120@gmail.com");
      if (user) {
        userId = user.id;
        found = true;
      }
      
      if (!listData?.users || listData.users.length < 50) break;
      page++;
    }

    if (!found || !userId) {
      return new Response(JSON.stringify({ error: "User not found", createError: createError?.message }), { status: 500 });
    }

    // Update password
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: "Kikelomo2120@",
      email_confirm: true,
    });

    if (updateError) {
      return new Response(JSON.stringify({ error: "Update failed: " + updateError.message }), { status: 500 });
    }

    // Ensure admin role
    await supabaseAdmin.from("user_roles").upsert(
      { user_id: userId, role: "admin" },
      { onConflict: "user_id,role" }
    );

    return new Response(JSON.stringify({ message: "Password updated", userId }));
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
