import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlogEditor } from "./BlogEditor";

interface BlogPost {
  id: string;
  title: string;
  image: string;
  publishedDate: string;
  status: "published" | "draft";
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Care for Your Delicate Fabrics",
    image: "/placeholder.svg",
    publishedDate: "2025-10-10",
    status: "published",
  },
  {
    id: "2",
    title: "How to Care for Your Delicate Fabrics",
    image: "/placeholder.svg",
    publishedDate: "2025-10-10",
    status: "published",
  },
];

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleNewPost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Blog Posts</h2>
        <Button onClick={handleNewPost} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-md bg-muted"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.status === "published" ? "Published" : "Draft"} • {post.publishedDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BlogEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        post={editingPost}
      />
    </div>
  );
}
