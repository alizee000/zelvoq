import re

with open('src/app/actions/auth.ts', 'r') as f:
    content = f.read()

# Replace redirects with success returns for login and signup
content = content.replace('redirect("/home");', 'return { success: true };')

with open('src/app/actions/auth.ts', 'w') as f:
    f.write(content)

with open('src/app/auth-client.tsx', 'r') as f:
    client = f.read()

# Add useRouter and handle success
if 'useRouter' not in client:
    client = client.replace('import { login, signup } from "@/app/actions/auth";', 'import { login, signup } from "@/app/actions/auth";\nimport { useRouter } from "next/navigation";')
    
    # login handler
    client = client.replace(
        '''    const result = await login(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    }''',
        '''    try {
      const result = await login(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        window.location.href = "/home"; // Hard redirect to force re-render
      }
    } catch (e) {
      // In case next.js throws a redirect error anyway
      window.location.href = "/home";
    }'''
    )
    
    # signup handler
    client = client.replace(
        '''    const result = await signup(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    }''',
        '''    try {
      const result = await signup(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        window.location.href = "/home";
      }
    } catch (e) {
      window.location.href = "/home";
    }'''
    )

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(client)
