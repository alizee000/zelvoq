import re
import os

# 1. CoOwnCard
with open('src/components/shared/co-own-card.tsx', 'r') as f:
    coown = f.read()
if 'onClick={() => setInvested(false)}' not in coown:
    coown = coown.replace(
        '</form>\n          </div>\n        )}',
        '</form>\n          </div>\n        )}\n        {invested && (\n           <button onClick={() => { setInvested(false); setShowChat(false); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full">Withdraw Share</button>\n        )}'
    )
    with open('src/components/shared/co-own-card.tsx', 'w') as f:
        f.write(coown)


# 2. GroupBuyCard
with open('src/components/shared/group-buy-card.tsx', 'r') as f:
    groupbuy = f.read()
if 'onClick={() => setJoined(false)}' not in groupbuy:
    # Find the joined button wrapper
    # It might be returning a <button> ... {joined ? '...' : '...'}
    groupbuy = groupbuy.replace(
        '</button>\n      </div>',
        '</button>\n      {joined && (\n        <button onClick={() => setJoined(false)} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-3 transition-colors text-center w-full block">Leave Group Buy</button>\n      )}\n      </div>'
    )
    with open('src/components/shared/group-buy-card.tsx', 'w') as f:
        f.write(groupbuy)


# 3. BorrowCard
with open('src/components/shared/borrow-card.tsx', 'r') as f:
    borrow = f.read()
if 'onClick={() => setRequested(false)}' not in borrow:
    borrow = borrow.replace(
        '</button>\n      </div>',
        '</button>\n      {requested && (\n        <button onClick={() => setRequested(false)} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-3 transition-colors text-center w-full block">Cancel Request</button>\n      )}\n      </div>'
    )
    with open('src/components/shared/borrow-card.tsx', 'w') as f:
        f.write(borrow)


# 4. SpaceCard
if os.path.exists('src/components/shared/space-card.tsx'):
    with open('src/components/shared/space-card.tsx', 'r') as f:
        space = f.read()
    if 'onClick={() => setRequested(false)}' not in space:
        space = space.replace(
            '</button>\n      </div>',
            '</button>\n      {requested && (\n        <button onClick={() => setRequested(false)} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-3 transition-colors text-center w-full block">Cancel Booking</button>\n      )}\n      </div>'
        )
        with open('src/components/shared/space-card.tsx', 'w') as f:
            f.write(space)

