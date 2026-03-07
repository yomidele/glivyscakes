
UPDATE auth.users 
SET encrypted_password = extensions.crypt('Kikelomo2120@', extensions.gen_salt('bf', 10)),
    updated_at = now()
WHERE email = 'yomidele2120@gmail.com';
