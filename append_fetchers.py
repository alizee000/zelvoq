with open('src/lib/data/fetchers.ts', 'r') as f:
    content = f.read()

new_function = """

export async function getCoOwnItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('co_own_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching co-own items:', error);
    return [];
  }

  return data || [];
}
"""

if 'getCoOwnItems' not in content:
    with open('src/lib/data/fetchers.ts', 'a') as f:
        f.write(new_function)
