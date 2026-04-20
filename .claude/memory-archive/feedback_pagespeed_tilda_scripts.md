---
name: Never restore heavy Tilda scripts without shims
description: Restoring original Tilda scripts tanks PageSpeed; always write lightweight replacements first
type: feedback
---

Never restore heavy Tilda runtime scripts (tilda-zero.js, tilda-popup.js, tilda-slds.js) to fix functionality issues. Write lightweight inline shims instead.

**Why:** User restored 3 scripts (~85KB total) to fix hero positioning and gallery popups. PageSpeed scores dropped immediately. The fix was writing ~2KB of inline shims that provide the same global function API.

**How to apply:** When a Tilda feature breaks after script removal:
1. Read the original minified script to identify which functions are actually called
2. Check blocks JS (`tilda-blocks-pageXXX.min.js`) to see which API functions it invokes
3. Write a minimal shim defining those exact function signatures
4. Test that blocks JS works with the shim (it uses `t_onFuncLoad` polling)
5. Always check PageSpeed after any script changes
