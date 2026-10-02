type InviteState = {
  expiresAt: Date;
  usedAt: Date | null;
  email: string | null;
  placeholderUserId: string | null;
};

/**
 * Whether a group invite can still add a new member.
 *
 * A plain invite link is shared like a group-chat link, so it stays valid for
 * everyone until it expires. Invites aimed at one person stay single-use: a
 * placeholder-linked invite hands the redeemer that placeholder's balances,
 * and an email invite is meant for that address alone.
 */
export function isInviteRedeemable(invite: InviteState, now: Date = new Date()): boolean {
  if (invite.expiresAt < now) return false;
  const singleUse = invite.placeholderUserId !== null || invite.email !== null;
  return !(singleUse && invite.usedAt);
}
