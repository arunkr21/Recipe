import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

// Base Arcjet instance with global protections
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield WAF - protects against SQL injection, XSS, etc.
    shield({
      mode: "LIVE", // Change to "DRY_RUN" to test without blocking
    }),

    // Bot detection - allow search engines, block malicious bots
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
        "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
      ],
    }),
  ],
});

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"], // Track by Clerk user ID
    refillRate: 10, // 10 tokens
    interval: "30d", // per month (30 days)
    capacity: 10, // max 10 tokens
  }),
);

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  }),
);

// Pro tier - effectively unlimited (very high limits)
// 1000 requests per day should be more than enough for any user
export const proTierLimit = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 1000,
    interval: "1d",
    capacity: 1000,
  }),
);
