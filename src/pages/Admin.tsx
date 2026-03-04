import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Image as ImageIcon, Users, Settings, Download, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpg";

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  start_date: string;
  notes: string;
  created_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  media_type: string;
  created_at: string;
}

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"applications" | "gallery" | "settings">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchApplications();
      fetchGallery();
    }
  }, [session]);

  const fetchApplications = async () => {
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (data) setApplications(data);
    if (error) toast.error("Failed to load applications");
  };

  const fetchGallery = async () => {
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setGalleryItems(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Welcome back, Admin!");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const mediaType = file.type.startsWith("video") ? "video" : "image";

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("gallery").insert({
      title: file.name.replace(/\.[^/.]+$/, ""),
      category: "Cakes",
      image_url: publicUrl,
      media_type: mediaType,
    });

    if (insertError) {
      toast.error("Failed to save to gallery");
    } else {
      toast.success("Uploaded successfully!");
      fetchGallery();
    }
    e.target.value = "";
  };

  const handleDeleteGalleryItem = async (item: GalleryItem) => {
    const fileName = item.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
    const { error } = await supabase.from("gallery").delete().eq("id", item.id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Deleted!");
      fetchGallery();
    }
  };

  const exportApplications = () => {
    const csv = [
      "Full Name,Email,Phone,Course,Start Date,Notes,Submitted At",
      ...applications.map((a) =>
        `"${a.full_name}","${a.email}","${a.phone}","${a.course}","${a.start_date}","${a.notes || ""}","${a.created_at}"`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Applications exported!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Glivyz Cakes" className="h-16 w-auto rounded-full" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Glivyz" className="h-8 w-auto rounded-full" />
          <h1 className="font-heading text-lg font-bold text-primary">Glivyz Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 border-b border-border">
          {[
            { key: "applications" as const, label: "Applications", icon: Users },
            { key: "gallery" as const, label: "Gallery", icon: ImageIcon },
            { key: "settings" as const, label: "Settings", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "applications" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold">
                Student Applications ({applications.length})
              </h2>
              {applications.length > 0 && (
                <button
                  onClick={exportApplications}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              )}
            </div>

            {applications.length === 0 ? (
              <p className="text-muted-foreground text-sm py-10 text-center">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Name</th>
                      <th className="text-left px-4 py-3 font-medium">Email</th>
                      <th className="text-left px-4 py-3 font-medium">Phone</th>
                      <th className="text-left px-4 py-3 font-medium">Course</th>
                      <th className="text-left px-4 py-3 font-medium">Start Date</th>
                      <th className="text-left px-4 py-3 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-t border-border">
                        <td className="px-4 py-3">{app.full_name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.phone}</td>
                        <td className="px-4 py-3">{app.course}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.start_date}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold">Gallery Management</h2>
              <label className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity">
                <Upload size={16} />
                Upload Media
                <input type="file" accept="image/*,video/*" onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>

            {galleryItems.length === 0 ? (
              <p className="text-muted-foreground text-sm py-10 text-center">No gallery items yet. Upload your first image or video above.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="relative group rounded-lg overflow-hidden border border-border">
                    {item.media_type === "video" ? (
                      <video src={item.image_url} className="w-full aspect-square object-cover" />
                    ) : (
                      <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" />
                    )}
                    <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteGalleryItem(item)}
                        className="bg-destructive text-destructive-foreground p-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-2 py-1">
                      <p className="text-xs truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-md space-y-4">
            <h3 className="font-heading text-lg font-semibold mb-4">Business Settings</h3>
            <p className="text-sm text-muted-foreground">
              Contact info and social links are managed in the site configuration. Contact the developer to update these settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
