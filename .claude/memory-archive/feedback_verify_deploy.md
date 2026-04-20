---
name: Verify deploy status after push
description: After every git push, check GitHub Actions deploy status with `gh run list --limit 1` before waiting or telling user to check
type: feedback
---

After every `git push`, immediately check deploy status with `gh run list --limit 1`.
Wait for it to complete and confirm `success` before telling user to check the live site.

**Why:** Multiple deploys silently failed because Cloudflare Pages API rejected commits with Cyrillic commit messages (`Invalid commit message, it must be a valid UTF-8 string [code: 8000111]`). We wasted 30+ minutes waiting for deploys that never happened.

**How to apply:**
1. After `git push`, wait ~30s then run `gh run list --limit 1`
2. If `in_progress`, wait and recheck
3. If `failure`, run `gh run view <id> --log-failed` to diagnose
4. Only tell user to check live site after confirming `completed success`
5. Use ASCII-only commit messages for bestauto repo (Cloudflare Pages limitation)
