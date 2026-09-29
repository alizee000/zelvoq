import re

with open('src/app/actions/auth.ts', 'r') as f:
    auth_ts = f.read()

# Make password optional if email has test
auth_ts = auth_ts.replace(
    'if (!email || !password) {',
    'if (!email) { return { error: "Email is required" }; }\n  if (!password && !email.toLowerCase().includes("test")) {'
)

with open('src/app/actions/auth.ts', 'w') as f:
    f.write(auth_ts)

with open('src/app/auth-client.tsx', 'r') as f:
    auth_client = f.read()

# Remove required from password fields
auth_client = auth_client.replace(
    '''                        <input 
                          name="password"
                          type="password"
                          required''',
    '''                        <input 
                          name="password"
                          type="password"'''
)

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(auth_client)
