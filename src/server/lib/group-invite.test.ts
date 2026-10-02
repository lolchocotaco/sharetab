import { describe, expect, test } from 'vitest';
import { isInviteRedeemable } from './group-invite';

const now = new Date('2026-10-01T12:00:00Z');
const future = new Date('2026-10-08T12:00:00Z');
const past = new Date('2026-09-30T12:00:00Z');
const plain = { expiresAt: future, usedAt: null, email: null, placeholderUserId: null };

describe('isInviteRedeemable', () => {
  test('an unused plain invite is redeemable', () => {
    expect(isInviteRedeemable(plain, now)).toBe(true);
  });

  test('a plain invite stays redeemable after someone has joined with it', () => {
    expect(isInviteRedeemable({ ...plain, usedAt: past }, now)).toBe(true);
  });

  test('an expired invite is not redeemable', () => {
    expect(isInviteRedeemable({ ...plain, expiresAt: past }, now)).toBe(false);
  });

  test('a placeholder-linked invite is single-use', () => {
    const invite = { ...plain, placeholderUserId: 'placeholder-1' };
    expect(isInviteRedeemable(invite, now)).toBe(true);
    expect(isInviteRedeemable({ ...invite, usedAt: past }, now)).toBe(false);
  });

  test('an email invite is single-use', () => {
    const invite = { ...plain, email: 'friend@example.com' };
    expect(isInviteRedeemable(invite, now)).toBe(true);
    expect(isInviteRedeemable({ ...invite, usedAt: past }, now)).toBe(false);
  });
});
