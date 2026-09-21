import { createClient } from "@/lib/supabase/server";

export async function getPollsForUser(userName: string) {
  const supabase = await createClient();
  
  // Get all polls
  const { data: allPolls, error: pollsError } = await supabase
    .from("polls")
    .select("*")
    .order("created_at", { ascending: false });

  if (pollsError) {
    console.error("Error fetching polls:", pollsError);
    return { activePolls: [], completedPolls: [] };
  }

  // Get votes for this user
  const { data: userVotes, error: votesError } = await supabase
    .from("poll_votes")
    .select("poll_id, vote")
    .eq("user_name", userName);

  if (votesError) {
    console.error("Error fetching votes:", votesError);
    return { activePolls: allPolls || [], completedPolls: [] };
  }

  // Get total vote counts for completed polls
  const { data: allVotes } = await supabase
    .from("poll_votes")
    .select("poll_id, vote");

  const votedPollIds = new Set((userVotes || []).map(v => v.poll_id));
  
  const activePolls = [];
  const completedPolls = [];

  for (const poll of (allPolls || [])) {
    if (votedPollIds.has(poll.id)) {
      // Calculate stats
      const pollVotes = (allVotes || []).filter(v => v.poll_id === poll.id);
      const yesVotes = pollVotes.filter(v => v.vote === 'yes').length;
      const totalVotes = pollVotes.length;
      
      const userVote = userVotes?.find(v => v.poll_id === poll.id)?.vote;

      completedPolls.push({
        ...poll,
        yesVotes,
        totalVotes,
        percentage: totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 0,
        userVote
      });
    } else {
      activePolls.push(poll);
    }
  }

  return { activePolls, completedPolls };
}
