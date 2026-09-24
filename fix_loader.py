import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Replace the text-only publishing state with a spinner
old_button = r'\{isSubmitting \? "Publishing\.\.\." \: <><Sparkles className="w-4 h-4" /> Publish Listing</>\}'
new_button = """{isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Publish Listing
              </>
            )}"""

content = re.sub(old_button, new_button, content)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
