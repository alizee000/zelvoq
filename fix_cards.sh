sed -i '' 's|export function GroupBuyCard({|import { DeleteButton } from "./delete-button";\n\nexport function GroupBuyCard({|g' src/components/shared/group-buy-card.tsx
sed -i '' 's|imageFallback: string;|imageFallback: string;\n  currentUserName?: string;|g' src/components/shared/group-buy-card.tsx
sed -i '' 's|imageFallback,|imageFallback,\n  currentUserName,|g' src/components/shared/group-buy-card.tsx
sed -i '' 's|<div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">|<div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">\n        {currentUserName === "Test Resident" || currentUserName === "Koodu" ? <DeleteButton id={id} type="group_buy" /> : null}|g' src/components/shared/group-buy-card.tsx

sed -i '' 's|export function BorrowCard({|import { DeleteButton } from "./delete-button";\n\nexport function BorrowCard({|g' src/components/shared/borrow-card.tsx
sed -i '' 's|imageFallback: string;|imageFallback: string;\n  currentUserName?: string;|g' src/components/shared/borrow-card.tsx
sed -i '' 's|imageFallback,|imageFallback,\n  currentUserName,|g' src/components/shared/borrow-card.tsx
sed -i '' 's|<div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">|<div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">\n        {currentUserName === ownerName || currentUserName === "Koodu" ? <DeleteButton id={id} type="talent" /> : null}|g' src/components/shared/borrow-card.tsx

sed -i '' 's|export function SpaceCard({|import { DeleteButton } from "./delete-button";\n\nexport function SpaceCard({|g' src/components/shared/space-card.tsx
sed -i '' 's|imageUrl: string;|imageUrl: string;\n  currentUserName?: string;\n  id?: string;|g' src/components/shared/space-card.tsx
sed -i '' 's|imageUrl }: SpaceCardProps|imageUrl, currentUserName, id }: SpaceCardProps|g' src/components/shared/space-card.tsx
sed -i '' 's|<div className="relative h-48 w-full bg-slate-200">|<div className="relative h-48 w-full bg-slate-200">\n        {id \&\& (currentUserName === ownerName || currentUserName === "Koodu") ? <DeleteButton id={id} type="talent" /> : null}|g' src/components/shared/space-card.tsx
