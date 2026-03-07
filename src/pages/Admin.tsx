import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Image as ImageIcon, Users, Settings, Download, Upload, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpg";

interface Application {
  id: string; full_name: string; email: string; phone: string; course: string; start_date: string; notes: string; created_at: string;
}
interface GalleryItem {
  id: string; title: string; category: string; image_url: string; media_type: string; created_at: string;
}
interface CateringQuote {
  id: string; full_name: string; phone: string; email: string; event_type: string; event_date: string; num_guests: number; location: string; budget_range: string; notes: string; created_at: string;
}

const GALLERY_CATEGORIES = ["Cakes", "Catering", "Training", "Events"];

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"applications" | "quotes" | "gallery" | "settings">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [cateringQuotes, setCateringQuotes] = useState<CateringQuote[]>([]);
  const [uploadCategory, setUploadCategory] = useState("Cakes");
  const [uploadTitle, setUploadTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) { fetchApplications(); fetchGallery(); fetchCateringQuotes(); }
  }, [session]);

  const fetchApplications = async () => {
    const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (data) setApplications(data);
  };
  const fetchGallery = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setGalleryItems(data);
  };
  const fetchCateringQuotes = async () => {
    const { data } = await supabase.from("catering_quotes").select("*").order("created_at", { ascending: false });
    if (data) setCateringQuotes(data as CateringQuote[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (error) {
      setLoginError("Invalid credentials. Please check your email and password.");
      toast.error("Invalid credentials");
    } else {
      toast.success("Welcome back, Admin!");
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file);
    if (uploadError) { toast.error("Upload failed: " + uploadError.message); return; }
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
    const title = uploadTitle.trim() || file.name.replace(/\.[^/.]+$/, "");
    const { error: insertError } = await supabase.from("gallery").insert({ title, category: uploadCategory, image_url: publicUrl, media_type: mediaType });
    if (insertError) toast.error("Failed to save to gallery");
    else { toast.success("Uploaded successfully!"); fetchGallery(); setUploadTitle(""); }
    e.target.value = "";
  };

  const handleDeleteGalleryItem = async (item: GalleryItem) => {
    const fileName = item.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("gallery").remove([fileName]);
    const { error } = await supabase.from("gallery").delete().eq("id", item.id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted!"); fetchGallery(); }
  };

  const exportCSV = (data: any[], headers: string[], filename: string) => {
    const csv = [headers.join(","), ...data.map(row => headers.map(h => `"${row[h] || ""}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="bg-card border border-border p-8">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Glivyz Cakes" className="h-16 w-16 rounded-full border-2 border-primary object-cover" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-center mb-1 uppercase tracking-wider">Admin Login</h1>
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
            {loginError && <p className="text-destructive text-sm text-center mb-4">{loginError}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors">Sign In</button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Glivyz" className="h-8 w-8 rounded-full border border-primary object-cover" />
          <h1 className="font-heading text-lg font-bold text-primary uppercase tracking-wider">Glivyz Admin</h1>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {[
            { key: "applications" as const, label: "Training", icon: Users },
            { key: "quotes" as const, label: "Catering Quotes", icon: FileText },
            { key: "gallery" as const, label: "Gallery", icon: ImageIcon },
            { key: "settings" as const, label: "Settings", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-px whitespace-nowrap ${
                activeTab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} />{label}
            </button>
          ))}
        </div>

        {activeTab === "applications" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wider">Training Applications ({applications.length})</h2>
              {applications.length > 0 && (
                <button onClick={() => exportCSV(applications, ["full_name","email","phone","course","start_date","notes","created_at"], `applications-${new Date().toISOString().split("T")[0]}.csv`)}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Download size={16} /> Export
                </button>
              )}
            </div>
            {applications.length === 0 ? <p className="text-muted-foreground text-sm py-10 text-center">No applications yet.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-secondary"><tr>
                    {["Name","Email","Phone","Course","Start Date","Submitted"].map(h => <th key={h} className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">{h}</th>)}
                  </tr></thead>
                  <tbody>{applications.map(app => (
                    <tr key={app.id} className="border-t border-border hover:bg-card transition-colors">
                      <td className="px-4 py-3">{app.full_name}</td><td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.phone}</td><td className="px-4 py-3">{app.course}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.start_date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "quotes" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wider">Catering Quotes ({cateringQuotes.length})</h2>
              {cateringQuotes.length > 0 && (
                <button onClick={() => exportCSV(cateringQuotes, ["full_name","phone","email","event_type","event_date","num_guests","location","budget_range","notes","created_at"], `catering-quotes-${new Date().toISOString().split("T")[0]}.csv`)}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Download size={16} /> Export
                </button>
              )}
            </div>
            {cateringQuotes.length === 0 ? <p className="text-muted-foreground text-sm py-10 text-center">No catering quote requests yet.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-secondary"><tr>
                    {["Name","Event","Date","Guests","Budget","Location","Submitted"].map(h => <th key={h} className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">{h}</th>)}
                  </tr></thead>
                  <tbody>{cateringQuotes.map(q => (
                    <tr key={q.id} className="border-t border-border hover:bg-card transition-colors">
                      <td className="px-4 py-3"><div>{q.full_name}</div><div className="text-xs text-muted-foreground">{q.email}</div></td>
                      <td className="px-4 py-3">{q.event_type}</td><td className="px-4 py-3 text-muted-foreground">{q.event_date}</td>
                      <td className="px-4 py-3">{q.num_guests}</td><td className="px-4 py-3 text-muted-foreground">{q.budget_range || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{q.location}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wider">Gallery ({galleryItems.length})</h2>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="px-3 py-2 bg-background border border-border text-foreground text-xs w-36 outline-none focus:ring-1 focus:ring-primary"
                />
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="px-3 py-2 bg-background border border-border text-foreground text-xs outline-none focus:ring-1 focus:ring-primary"
                >
                  {GALLERY_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-colors">
                  <Upload size={16} /> Upload
                  <input type="file" accept="image/*,video/*" onChange={handleGalleryUpload} className="hidden" />
                </label>
              </div>
            </div>
            {galleryItems.length === 0 ? <p className="text-muted-foreground text-sm py-10 text-center">No gallery items yet. Upload photos and videos above.</p> : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {galleryItems.map(item => (
                  <div key={item.id} className="relative group overflow-hidden border border-border">
                    {item.media_type === "video" ? <video src={item.image_url} className="w-full aspect-square object-cover" /> : <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" />}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => handleDeleteGalleryItem(item)} className="bg-destructive text-destructive-foreground p-2"><Trash2 size={16} /></button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-2 py-1">
                      <p className="text-xs truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-md space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Business Settings</h3>
            <p className="text-sm text-muted-foreground">Contact info and social links are managed in the site configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
