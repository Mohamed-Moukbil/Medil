-- ---------------------------------------------------------------------------
-- 0008_forum_likes_triggers.sql
-- Maintain forum_threads.upvotes / forum_replies.upvotes automatically
-- whenever a row is inserted into or deleted from public.user_likes.
-- ---------------------------------------------------------------------------

create or replace function public.sync_forum_upvotes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (tg_op = 'INSERT') then
    if (new.target_type = 'thread') then
      update public.forum_threads
        set upvotes = upvotes + 1
        where id = new.target_id;
    elsif (new.target_type = 'reply') then
      update public.forum_replies
        set upvotes = upvotes + 1
        where id = new.target_id;
    end if;
  elsif (tg_op = 'DELETE') then
    if (old.target_type = 'thread') then
      update public.forum_threads
        set upvotes = greatest(0, upvotes - 1)
        where id = old.target_id;
    elsif (old.target_type = 'reply') then
      update public.forum_replies
        set upvotes = greatest(0, upvotes - 1)
        where id = old.target_id;
    end if;
  end if;
  return null;
end;
$$;

drop trigger if exists user_likes_sync_upvotes on public.user_likes;
create trigger user_likes_sync_upvotes
  after insert or delete on public.user_likes
  for each row
  execute function public.sync_forum_upvotes();
