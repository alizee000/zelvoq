import os

files_to_fix = [
    'src/app/(app)/home/page.tsx',
    'src/app/(app)/discover/page.tsx'
]

for file_path in files_to_fix:
    with open(file_path, 'r') as f:
        content = f.read()
    
    if 'export const revalidate = 0;' not in content:
        # Add it after the imports
        import_end = content.rfind('import ')
        if import_end != -1:
            next_newline = content.find('\n', import_end)
            content = content[:next_newline+1] + '\nexport const revalidate = 0;\n' + content[next_newline+1:]
        
        with open(file_path, 'w') as f:
            f.write(content)

