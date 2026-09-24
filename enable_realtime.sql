-- Enable real-time for feed_posts table
begin;
  -- remove the supabase_realtime publication if it exists
  drop publication if exists supabase_realtime;
  -- re-create it
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table feed_posts;
