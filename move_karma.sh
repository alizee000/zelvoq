sed -i '' '78,80d' src/app/\(app\)/profile/page.tsx
sed -i '' '101a\
\
      <div className="mb-2 max-w-4xl mx-auto w-full">\
        <KarmaRings lendCount={lendCount || 0} hostCount={hostCount} helpCount={helpCount || 0} />\
      </div>\
' src/app/\(app\)/profile/page.tsx
