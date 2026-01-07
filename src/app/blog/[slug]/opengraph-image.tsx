import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";
import { calculateReadingTime } from "@/lib/utils";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Blog Post | Piotr Zadka";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug, false);

  const title = post?.title || "Blog Post";
  const tags = post?.tags?.slice(0, 3) || [];

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0b",
        backgroundImage:
          "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#18181b",
          padding: "50px 60px",
          borderRadius: "20px",
          border: "1px solid #27272a",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Blog badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#14b8a6",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Blog
          </div>
          <div
            style={{
              width: "60px",
              height: "2px",
              backgroundColor: "#14b8a6",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 48 : 56,
              fontWeight: "bold",
              color: "#e5e5e5",
              lineHeight: 1.2,
              maxWidth: "100%",
            }}
          >
            {title}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 18,
                    color: "#14b8a6",
                    backgroundColor: "rgba(20, 184, 166, 0.1)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(20, 184, 166, 0.3)",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Author info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#14b8a6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#0a0a0b",
              }}
            >
              PZ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#e5e5e5",
                }}
              >
                Piotr Zadka
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#a1a1aa",
                }}
              >
                piotrzadka.dev
              </div>
            </div>
          </div>

          {/* Read time badge */}
          {post?.content && (
            <div
              style={{
                fontSize: 16,
                color: "#a1a1aa",
                backgroundColor: "#27272a",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {calculateReadingTime(post.content)} min read
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
