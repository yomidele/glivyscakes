
UPDATE auth.users 
SET encrypted_password = crypt('Kikelomo2120@', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE email = 'yomidele2120@gmail.com';
