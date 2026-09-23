import { createClient } from "@/lib/supabase/server";

export async function getTalents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching talents:", error);
    return [];
  }

  // Fetch profiles to get the latest avatar for each user
  const { data: profiles } = await supabase.from("profiles").select("owner_name, image_url");
  
  if (profiles && data) {
    // Merge the profile image_url into the talent data
    const profileMap = new Map(profiles.map((p) => [p.owner_name, p.image_url]));
    return data.map((talent) => ({
      ...talent,
      image_url: profileMap.get(talent.owner_name) || talent.image_url
    }));
  }

  return data;
}

export async function getGroupBuys() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("group_buys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching group buys:", error);
    return [];
  }
  return data;
}

export async function getFeedPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feed_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3); // Only get latest 3 for feed

  if (error) {
    console.error("Error fetching feed posts:", error);
    return [];
  }

  // Fetch profiles to get the latest avatar for each user
  const { data: profiles } = await supabase.from("profiles").select("owner_name, image_url");
  
  if (profiles && data) {
    const profileMap = new Map(profiles.map((p) => [p.owner_name, p.image_url]));
    return data.map((post) => ({
      ...post,
      author_avatar: profileMap.get(post.author_name) || post.author_avatar
    }));
  }

  return data;
}


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
