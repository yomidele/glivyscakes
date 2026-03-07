
UPDATE auth.users 
SET encrypted_password = crypt('Kikelomo2120@', gen_salt('bf', 10)),
    updated_at = now()
WHERE email = 'yomidele2120@gmail.com';
