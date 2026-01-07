// Script to create a draft blog post in Sanity
// Run with: npx ts-node --esm scripts/create-draft-post.ts

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2pse7vxr",
  dataset: "production",
  apiVersion: "2025-01-04",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const draftPost = {
  _id: "drafts.demo-blog-improvements",
  _type: "post",
  title: "Why I'm Betting My Career on AI-Augmented Development",
  slug: {
    _type: "slug",
    current: "ai-augmented-development-career",
  },
  excerpt:
    "I shipped my portfolio in 3 days using AI agents. Here's what I learned about the future of software development and why every developer should embrace AI tooling.",
  date: "2026-01-13",
  readTime: "6 min read",
  tags: ["AI", "Career", "Developer Experience", "OpenCode", "Productivity"],
  linkedinHook:
    "I shipped my portfolio in 3 days using AI agents. Here's what I learned... 🚀",
  content: [
    {
      _type: "block",
      _key: "intro1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Six months ago, I was skeptical. \"AI will replace developers\" — that's what the headlines said. But after 100+ hours working with coding agents, I've discovered something different: AI doesn't replace developers, it amplifies them.",
        },
      ],
    },
    {
      _type: "block",
      _key: "heading1",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "The Moment Everything Changed",
        },
      ],
    },
    {
      _type: "block",
      _key: "para1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "It started with a simple portfolio project. What would normally take me 2-3 weeks of evening coding sessions took just 3 days. Not because the AI wrote everything for me — but because it handled the boilerplate, caught my mistakes early, and let me focus on what matters: architecture and user experience.",
        },
      ],
    },
    {
      _type: "block",
      _key: "heading2",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "What AI-Augmented Development Actually Looks Like",
        },
      ],
    },
    {
      _type: "block",
      _key: "para2",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Here's my typical workflow now:",
        },
      ],
    },
    {
      _type: "block",
      _key: "list1",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "I describe the feature I want to build in plain English",
        },
      ],
    },
    {
      _type: "block",
      _key: "list2",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "The AI generates a first draft — often 80% correct",
        },
      ],
    },
    {
      _type: "block",
      _key: "list3",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "I review, refine, and guide it toward the final solution",
        },
      ],
    },
    {
      _type: "block",
      _key: "list4",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "We iterate together until it's production-ready",
        },
      ],
    },
    {
      _type: "block",
      _key: "heading3",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "The Skills That Matter Now",
        },
      ],
    },
    {
      _type: "block",
      _key: "para3",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Prompt engineering isn't just a buzzword — it's becoming a core developer skill. The ability to clearly articulate what you want, break down complex problems, and guide an AI toward the right solution is incredibly valuable.",
        },
      ],
    },
    {
      _type: "block",
      _key: "heading4",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "My Takeaway",
        },
      ],
    },
    {
      _type: "block",
      _key: "para4",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "The developers who thrive in 2026 and beyond won't be those who resist AI — they'll be the ones who learn to collaborate with it effectively. I'm betting my career on this shift, and so far, it's paying off.",
        },
      ],
    },
    {
      _type: "block",
      _key: "cta",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "What's your experience with AI coding tools? I'd love to hear your thoughts.",
        },
      ],
    },
  ],
};

async function createDraftPost() {
  try {
    const result = await client.createOrReplace(draftPost);
    console.log("✅ Draft post created successfully!");
    console.log("   ID:", result._id);
    console.log("   Title:", result.title);
    console.log("\n📝 View in Sanity Studio: /studio/structure/post");
    console.log(
      "   This post is saved as a DRAFT and won't appear on the live site."
    );
  } catch (error) {
    console.error("❌ Error creating draft post:", error);
  }
}

createDraftPost();
