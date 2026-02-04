import { useState, useEffect } from "react";
import { X, Image as ImageIcon, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Quote, Code, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BlogEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: any;
}

export function BlogEditor({ open, onOpenChange, post }: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content || "");
    } else {
      setTitle("");
      setContent("");
      setImage(null);
    }
  }, [post]);

  if (!open) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-4xl my-8 mx-4">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {post ? "Edit Blog Post" : "Create/Edit Blog Post"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Post Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging blog post title"
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">
              Featured Image <span className="text-destructive">*</span>
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-muted/20">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label htmlFor="image" className="cursor-pointer">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload featured image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-destructive">*</span>
            </Label>
            <div className="border border-border rounded-lg overflow-hidden bg-background">
              <div className="border-b border-border bg-muted/30 p-2 flex items-center gap-1 flex-wrap">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold">
                  H1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold">
                  H2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold">
                  H3
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Quote className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your blog post content..."
                className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Tip: Use headings to structure your content, add images/links, and format text for better readability.
            </p>
          </div>
        </div>

        <div className="border-t border-border p-6 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Preview
          </Button>
          <Button className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Publish Post
          </Button>
        </div>
      </div>
    </div>
  );
}
