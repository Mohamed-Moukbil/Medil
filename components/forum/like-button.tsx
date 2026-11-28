"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { useAuthModal } from "@/components/auth/auth-modal-provider";
import { toggleThreadLike, toggleReplyLike } from "@/lib/forum/actions";

type Props = {
  targetType: "thread" | "reply";
  targetId: string;
  initialCount: number;
  initialLiked: boolean;
};

export function LikeButton({ targetType, targetId, initialCount, initialLiked }: Props) {
  const router = useRouter();
  const { openAuth } = useAuthModal();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      const result =
        targetType === "thread"
          ? await toggleThreadLike(targetId)
          : await toggleReplyLike(targetId);
      if (result.ok) {
        setLiked(result.liked);
        setCount(result.count);
        router.refresh();
      } else if (result.error === "auth") {
        openAuth("login");
      }
    });
  }

  return (
    <button
      className={`post-action ${liked ? "is-active" : ""}`}
      type="button"
      onClick={onClick}
      disabled={pending}
    >
      <Icon name="heart" /> <span>{count}</span> utile{liked ? "s" : ""}
    </button>
  );
}