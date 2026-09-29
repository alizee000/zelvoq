with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Add the import
if "import { EmptyState }" not in content:
    content = content.replace(
        'import { MotionSection } from "@/components/ui/motion-wrapper";',
        'import { MotionSection } from "@/components/ui/motion-wrapper";\nimport { EmptyState } from "@/components/ui/empty-state";\nimport { ShoppingBag, PackageOpen, Key } from "lucide-react";'
    )

# Replace mapping blocks with empty state checks
# Deals Tab
content = content.replace(
    '{deals?.map((item: any, i: number) => (',
    '{deals?.length === 0 ? (\n              <EmptyState \n                icon={ShoppingBag}\n                title="No active deals"\n                description="There are currently no flash deals or group buys. Start a new one to rally the community!"\n                actionLabel="Create Group Buy"\n                actionHref="/add"\n              />\n            ) : deals?.map((item: any, i: number) => ('
)
content = content.replace(
    '</MotionSection>\n              </Link>\n            ))}',
    '</MotionSection>\n              </Link>\n            )))}'
)

# Borrow Tab
content = content.replace(
    '{items?.map((item: any, i: number) => (',
    '{items?.length === 0 ? (\n              <EmptyState \n                icon={PackageOpen}\n                title="The library is empty"\n                description="Nobody is lending items right now. Add an idle item from your closet to kickstart the sharing economy!"\n                actionLabel="Lend an Item"\n                actionHref="/add"\n              />\n            ) : items?.map((item: any, i: number) => ('
)
# Note: we need to replace the ending for items correctly
content = content.replace(
    '<BorrowCard key={item.id} item={item} index={i} />\n            ))}',
    '<BorrowCard key={item.id} item={item} index={i} />\n            )))}'
)

# Spaces Tab
content = content.replace(
    '{spaces?.map((space: any, i: number) => (',
    '{spaces?.length === 0 ? (\n              <EmptyState \n                icon={Key}\n                title="No spaces available"\n                description="Looking for an extra parking spot or a quiet room? Check back soon or list your own space."\n                actionLabel="List a Space"\n                actionHref="/add"\n              />\n            ) : spaces?.map((space: any, i: number) => ('
)
# Note: we need to replace the ending for spaces correctly
content = content.replace(
    '<SpaceCard key={space.id} space={space} index={i} />\n            ))}',
    '<SpaceCard key={space.id} space={space} index={i} />\n            )))}'
)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)

