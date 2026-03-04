import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Image, Users, Settings, Download } from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  startDate: string;
  notes: string;
  submittedAt: string;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"applications" | "gallery" | "settings">("applications");
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const session = sessionStorage.getItem("glivyz_admin");
    if (session === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const apps = JSON.parse(localStorage.getItem("glivyz_applications") || "[]");
      setApplications(apps);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: This is temporary client-side auth. For production, use Lovable Cloud auth.
    if (email === "yomidele2120@gmail.com" && password === "Kikelomo2120") {
      sessionStorage.setItem("glivyz_admin", "true");
      setIsLoggedIn(true);
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("glivyz_admin");
    setIsLoggedIn(false);
  };

  const exportApplications = () => {
    const csv = [
      "Full Name,Email,Phone,Course,Start Date,Notes,Submitted At",
      ...applications.map((a) =>
        `"${a.fullName}","${a.email}","${a.phone}","${a.course}","${a.startDate}","${a.notes || ""}","${a.submittedAt}"`
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
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
      {/* Admin Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-heading text-lg font-bold text-primary">Glivyz Admin</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {[
            { key: "applications" as const, label: "Applications", icon: Users },
            { key: "gallery" as const, label: "Gallery", icon: Image },
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

        {/* Applications Tab */}
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
                        <td className="px-4 py-3">{app.fullName}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.phone}</td>
                        <td className="px-4 py-3">{app.course}</td>
                        <td className="px-4 py-3 text-muted-foreground">{app.startDate}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="text-center py-16">
            <Image size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-lg font-semibold mb-2">Gallery Management</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              To enable gallery uploads and dynamic media management, we need to connect to Lovable Cloud for file storage. This feature will be available once the backend is set up.
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-md space-y-4">
            <h3 className="font-heading text-lg font-semibold mb-4">Business Settings</h3>
            <p className="text-sm text-muted-foreground">
              Settings management (WhatsApp number, social links, contact info) will be available once Lovable Cloud is connected for persistent storage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
