import re

with open('src/components/shared/avatar-uploader.tsx', 'r') as f:
    content = f.read()

# Update signature
content = content.replace('export function AvatarUploader({ initialImage }: { initialImage?: string }) {', 'export function AvatarUploader({ initialImage, ownerName }: { initialImage?: string, ownerName?: string }) {')

# Update fallback
old_fallback = """      {imageUrl ? (
        <Image src={imageUrl} alt="Profile" fill className="object-cover" />
      ) : (
        <User className="w-10 h-10" />
      )}"""

new_fallback = """      {imageUrl ? (
        <Image src={imageUrl} alt="Profile" fill className="object-cover" />
      ) : ownerName ? (
        <span className="uppercase text-4xl text-indigo-400 font-black">{ownerName.charAt(0)}</span>
      ) : (
        <User className="w-10 h-10" />
      )}"""

content = content.replace(old_fallback, new_fallback)

with open('src/components/shared/avatar-uploader.tsx', 'w') as f:
    f.write(content)


with open('src/app/(app)/profile/page.tsx', 'r') as f:
    profile = f.read()

profile = profile.replace('<AvatarUploader initialImage={currentImageUrl} />', '<AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />')

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(profile)

