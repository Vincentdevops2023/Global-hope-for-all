import { useState, useEffect, FormEvent } from "react";
import { User, Lock, LogOut, Calendar, Download, RefreshCw, Send, Check, AlertCircle, FileText, Settings, Heart, Info, LayoutDashboard } from "lucide-react";
import { Appointment, PatientProfile, InfoSheet } from "../types";
import { INFO_SHEETS } from "../data";

export default function Portal({ activeSectionSetter }: { activeSectionSetter?: (sec: string) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState<"patient" | "admin">("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [userProfile, setUserProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile" | "downloads" | "support">("dashboard");

  // Profile Edit States
  const [editFields, setEditFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: ""
  });
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState("");

  // Support Message States
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Load user session on mount
  useEffect(() => {
    const currentUser = localStorage.getItem("global_hope_current_user");
    if (currentUser) {
      loadSession(currentUser);
    }
  }, []);

  const loadSession = (userKey: string) => {
    try {
      const stored = localStorage.getItem("global_hope_patients");
      const users = stored ? JSON.parse(stored) : {};
      
      let profile: PatientProfile;
      
      if (userKey === "demo") {
        profile = {
          firstName: "Demo",
          lastName: "Patient",
          dob: "1990-01-01",
          gender: "prefer-not-to-say",
          email: "demo.patient@globalhope.org",
          phone: "+1 (555) 019-2834",
          address: "100 Wellness Ave, Seattle, WA",
          emergencyContact: "Alex Patient (+1 555-901-2041)",
          username: "demo"
        };
      } else {
        profile = users[userKey]?.profile;
      }

      if (profile) {
        setUserProfile(profile);
        setEditFields({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          emergencyContact: profile.emergencyContact
        });
        setIsLoggedIn(true);
        loadAppointments(profile.email);
      }
    } catch (err) {
      console.error("Session load error", err);
    }
  };

  const loadAppointments = (userEmail: string) => {
    const existing = localStorage.getItem("global_hope_appointments");
    const appts: Appointment[] = existing ? JSON.parse(existing) : [];
    
    // Filter appointments for this user, or if demo, load a pre-set mock appointment
    const userAppts = appts.filter(a => a.email.toLowerCase() === userEmail.toLowerCase());
    
    if (userEmail.toLowerCase() === "demo.patient@globalhope.org" && userAppts.length === 0) {
      const demoAppt: Appointment = {
        id: "APT-DEMO-99",
        name: "Demo Patient",
        email: "demo.patient@globalhope.org",
        phone: "+1 (555) 019-2834",
        date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0], // 3 days from now
        time: "10:30",
        reason: "General Anxiety Wellness Consultation",
        contactMethod: "email",
        status: "Confirmed",
        createdAt: new Date().toISOString()
      };
      setAppointments([demoAppt]);
    } else {
      setAppointments(userAppts);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const normalizedUser = username.trim().toLowerCase();

    // 1. Check Admin Credentials (admin237 / admin112233@)
    if ((normalizedUser === "admin237" || normalizedUser === "admin237@globalhope.org" || normalizedUser === "admin") && password === "admin112233@") {
      localStorage.setItem("global_hope_admin_logged_in", "true");
      if (activeSectionSetter) {
        activeSectionSetter("admin-panel");
      }
      return;
    }

    // 2. Check Patient Demo Account
    if (normalizedUser === "demo" && password === "password") {
      localStorage.setItem("global_hope_current_user", "demo");
      loadSession("demo");
      return;
    }

    // 3. Check registered patient accounts
    const stored = localStorage.getItem("global_hope_patients");
    const users = stored ? JSON.parse(stored) : {};
    
    if (users[normalizedUser] && users[normalizedUser].password === password) {
      localStorage.setItem("global_hope_current_user", normalizedUser);
      loadSession(normalizedUser);
    } else {
      setErrorMsg("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("global_hope_current_user");
    setIsLoggedIn(false);
    setUserProfile(null);
    setAppointments([]);
    setUsername("");
    setPassword("");
  };

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    setProfileSuccessMsg("");

    if (!userProfile) return;

    try {
      const currentUsername = userProfile.username.toLowerCase();
      const updatedProfile: PatientProfile = {
        ...userProfile,
        firstName: editFields.firstName,
        lastName: editFields.lastName,
        email: editFields.email,
        phone: editFields.phone,
        address: editFields.address,
        emergencyContact: editFields.emergencyContact
      };

      if (currentUsername !== "demo") {
        const stored = localStorage.getItem("global_hope_patients");
        const users = stored ? JSON.parse(stored) : {};
        
        if (users[currentUsername]) {
          users[currentUsername].profile = updatedProfile;
          localStorage.setItem("global_hope_patients", JSON.stringify(users));
        }
      }

      setUserProfile(updatedProfile);
      setProfileSuccessMsg("Profile updated successfully!");
      
      // Reload appointments matching updated email if any
      loadAppointments(updatedProfile.email);
    } catch (err) {
      setErrorMsg("Failed to update profile.");
    }
  };

  const handleSupportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    setSupportSuccess(true);
    setTimeout(() => {
      setSupportMessage("");
      setSupportSuccess(false);
    }, 3000);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div id="portal-login-card" className="glass-panel-heavy rounded-[40px] shadow-2xl overflow-hidden max-w-md mx-auto my-6 text-left">
        
        {/* Mode Selector Header Tabs */}
        <div className="grid grid-cols-2 bg-slate-950/40 p-1.5 border-b border-white/20">
          <button
            type="button"
            id="login-tab-patient"
            onClick={() => {
              setLoginMode("patient");
              setErrorMsg("");
              setUsername("demo");
              setPassword("password");
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === "patient"
                ? "bg-teal-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </button>
          <button
            type="button"
            id="login-tab-admin"
            onClick={() => {
              setLoginMode("admin");
              setErrorMsg("");
              setUsername("admin237");
              setPassword("admin112233@");
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === "admin"
                ? "bg-amber-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Back-End</span>
          </button>
        </div>

        <div className={`p-6 text-center border-b border-white/20 text-white transition-colors duration-200 ${
          loginMode === "admin"
            ? "bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950"
            : "bg-gradient-to-r from-blue-950/85 via-blue-900/85 to-teal-800/85"
        }`}>
          {loginMode === "admin" ? (
            <Lock className="w-10 h-10 mx-auto mb-3 text-amber-400" />
          ) : (
            <LayoutDashboard className="w-10 h-10 mx-auto mb-3 text-teal-300" />
          )}
          <h3 className="text-xl font-bold font-sans">
            {loginMode === "admin" ? "Admin Website Back-End Portal" : "Patient Information Portal"}
          </h3>
          <p className="text-slate-200 text-xs mt-1.5 font-light">
            {loginMode === "admin"
              ? "Sign in with admin login details to open the website back-end control center."
              : "Sign in with patient credentials to manage appointments, access downloadable guides, and receive support."}
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-4">
          {errorMsg && (
            <div className="bg-red-50/90 backdrop-blur-sm text-red-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="portal-username">
              {loginMode === "admin" ? "Admin Username / Email" : "Username"}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="portal-username"
                type="text"
                required
                placeholder={loginMode === "admin" ? "admin237" : "demo"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="portal-password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="portal-password"
                type="password"
                required
                placeholder={loginMode === "admin" ? "admin112233@" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className={`w-full text-white font-bold py-3.5 rounded-xl transition duration-150 shadow-lg text-sm cursor-pointer flex items-center justify-center gap-2 ${
              loginMode === "admin"
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                : "bg-teal-600 hover:bg-teal-700 shadow-teal-600/15"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{loginMode === "admin" ? "Login to Back-End Portal" : "Access Patient Portal"}</span>
          </button>

          {/* Quick Demo Credentials Box */}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-3.5 text-[11px] text-slate-700 space-y-2">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-teal-700" /> Quick Access Login Details:
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              {/* Patient Demo Details */}
              <div 
                onClick={() => {
                  setLoginMode("patient");
                  setUsername("demo");
                  setPassword("password");
                  setErrorMsg("");
                }}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  loginMode === "patient" 
                    ? "bg-teal-50/90 border-teal-300 ring-2 ring-teal-500/30" 
                    : "bg-white/60 border-white/80 hover:bg-white/80"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                  <span>👤 Patient Login</span>
                  <span className="text-[9px] text-teal-700 underline font-bold">Use</span>
                </div>
                <p>User: <strong className="font-mono text-teal-900">demo</strong></p>
                <p>Pass: <strong className="font-mono text-teal-900">password</strong></p>
              </div>

              {/* Admin Login Details */}
              <div 
                onClick={() => {
                  setLoginMode("admin");
                  setUsername("admin237");
                  setPassword("admin112233@");
                  setErrorMsg("");
                }}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  loginMode === "admin" 
                    ? "bg-amber-100/90 border-amber-300 ring-2 ring-amber-500/30" 
                    : "bg-amber-50/70 border-amber-200 hover:bg-amber-100/70"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-amber-950 mb-0.5">
                  <span>🔐 Admin Login</span>
                  <span className="text-[9px] text-amber-800 underline font-bold">Use</span>
                </div>
                <p>User: <strong className="font-mono text-amber-900">admin237</strong></p>
                <p>Pass: <strong className="font-mono text-amber-900 font-bold">admin112233@</strong></p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 pt-1 border-t border-white/40">
              Need a patient account? Register at <span className="font-semibold cursor-pointer underline text-teal-700 hover:text-teal-900" onClick={() => activeSectionSetter?.("patient-registration")}>Patient Registration</span>.
            </p>
          </div>
        </form>
      </div>
    );
  }

  // Logged In Dashboard
  return (
    <div id="patient-portal-dashboard" className="glass-panel-heavy rounded-[40px] shadow-2xl overflow-hidden max-w-5xl mx-auto my-6 flex flex-col md:flex-row min-h-[550px]">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-slate-950/80 backdrop-blur-md text-white p-6 flex flex-col justify-between border-r border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
              H
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide leading-none">Hope Portal</h4>
              <span className="text-[10px] text-teal-400">Secure Education Area</span>
            </div>
          </div>

          <div className="space-y-1.5 text-sm">
            <button
              id="tab-dashboard-btn"
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition duration-150 flex items-center gap-3 font-medium cursor-pointer ${
                activeTab === "dashboard" ? "bg-teal-600/80 backdrop-blur-xs text-white" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              Dashboard
            </button>
            <button
              id="tab-profile-btn"
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition duration-150 flex items-center gap-3 font-medium cursor-pointer ${
                activeTab === "profile" ? "bg-teal-600/80 backdrop-blur-xs text-white" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Settings className="w-4.5 h-4.5" />
              Update Profile
            </button>
            <button
              id="tab-downloads-btn"
              onClick={() => setActiveTab("downloads")}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition duration-150 flex items-center gap-3 font-medium cursor-pointer ${
                activeTab === "downloads" ? "bg-teal-600/80 backdrop-blur-xs text-white" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              Guides & Sheets
            </button>
            <button
              id="tab-support-btn"
              onClick={() => setActiveTab("support")}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition duration-150 flex items-center gap-3 font-medium cursor-pointer ${
                activeTab === "support" ? "bg-teal-600/80 backdrop-blur-xs text-white" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Send className="w-4.5 h-4.5" />
              Contact Support
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 md:mt-0 space-y-2.5">
          <div className="text-xs text-slate-400">
            Logged in as: <strong className="text-white block truncate">{userProfile?.firstName} {userProfile?.lastName}</strong>
          </div>

          <button
            id="portal-logout-btn"
            onClick={handleLogout}
            className="w-full border border-white/20 hover:bg-red-950/75 hover:text-red-300 text-slate-300 hover:border-red-900/50 backdrop-blur-xs transition py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout Securely
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 bg-transparent">
        
        {/* Tab 1: Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-950 font-sans">Patient Dashboard</h3>
                <p className="text-slate-500 text-xs">Wellness updates & appointment tracking</p>
              </div>
              <button
                id="refresh-dashboard"
                onClick={() => userProfile && loadAppointments(userProfile.email)}
                className="p-2 bg-white/40 hover:bg-white/60 border border-white/60 text-slate-700 rounded-lg shadow-sm transition cursor-pointer"
                title="Sync Appointments"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Greeting Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-tr from-blue-950/70 via-blue-900/70 to-teal-800/70 backdrop-blur-xs text-white p-6 rounded-[24px] border border-white/20 shadow-sm relative overflow-hidden">
                <Heart className="absolute right-4 bottom-4 w-20 h-20 text-white/5 pointer-events-none" />
                <h4 className="font-semibold text-teal-300 text-xs uppercase tracking-wider">Welcome Back</h4>
                <p className="text-lg font-bold mt-1 font-sans">{userProfile?.firstName} {userProfile?.lastName}</p>
                <p className="text-xs text-teal-100/90 mt-2">
                  "Your mental wellness is a lifelong journey. Pace yourself, be gentle with your expectations, and breathe through transition periods."
                </p>
              </div>

              <div className="glass-panel p-6 rounded-[24px]">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Overview</h4>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-600">Username: <span className="font-semibold text-slate-800">{userProfile?.username}</span></p>
                  <p className="text-slate-600">Email: <span className="font-semibold text-slate-800">{userProfile?.email}</span></p>
                  <p className="text-slate-600">Preferred Contact: <span className="font-semibold text-slate-800 capitalize">{userProfile?.phone ? "Phone" : "Email"}</span></p>
                </div>
              </div>
            </div>

            {/* Booked Consultations */}
            <div className="glass-panel p-6 rounded-[24px]">
              <div className="flex items-center justify-between border-b border-white/40 pb-3 mb-4">
                <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 text-teal-700" />
                  Your Scheduled Consultations
                </h4>
                {activeSectionSetter && (
                  <button
                    id="schedule-new-from-portal"
                    onClick={() => activeSectionSetter("appointment-booking")}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    + Book New Slot
                  </button>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-medium">No consultations scheduled currently.</p>
                  <p className="text-xs mt-1 text-slate-400">Need support? Schedule a counseling session anytime.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="border border-white/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/30 backdrop-blur-xs transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold bg-white/60 text-slate-700 px-2 py-0.5 rounded border border-white/50">
                            {appt.id}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            appt.status === 'Confirmed' ? 'bg-teal-50/85 backdrop-blur-xs text-teal-900 border-teal-200' : 'bg-amber-50/85 backdrop-blur-xs text-amber-900 border-amber-200'
                          }`}>
                            {appt.status}
                          </span>
                        </div>
                        <h5 className="font-semibold text-slate-800 text-sm">{appt.reason}</h5>
                        <p className="text-slate-500 text-xs">
                          Date: <span className="text-slate-800 font-medium">{appt.date}</span> at <span className="text-slate-800 font-medium">{appt.time}</span>
                        </p>
                      </div>
                      <div className="text-xs text-slate-400 self-start md:self-center">
                        Preferred contact: <span className="font-medium text-slate-700 capitalize">{appt.contactMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Educational Updates */}
            <div className="bg-teal-50/55 border border-teal-100/50 backdrop-blur-md p-5 rounded-2xl flex items-start gap-3 text-xs text-teal-800">
              <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-teal-900 block mb-0.5">Educational Insights: Managing Panic</strong>
                <span>Whenever anxiety begins to accelerate, remember your body is simply triggering a harmless epinephrine discharge. Rather than fighting the chest tightness, drop your shoulders, lean back, and allow the wave to pass naturally.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profile Update */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-950 font-sans">Update Your Profile</h3>
              <p className="text-slate-500 text-xs">Maintain your secure, private patient info</p>
            </div>

            <form onSubmit={handleUpdateProfile} className="glass-panel p-6 md:p-8 rounded-[24px] space-y-4">
              {profileSuccessMsg && (
                <div className="bg-teal-50/85 backdrop-blur-xs text-teal-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-teal-200">
                  <Check className="w-4.5 h-4.5 text-teal-600" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={editFields.firstName}
                    onChange={(e) => setEditFields({ ...editFields, firstName: e.target.value })}
                    className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-semibold mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={editFields.lastName}
                    onChange={(e) => setEditFields({ ...editFields, lastName: e.target.value })}
                    className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editFields.email}
                    onChange={(e) => setEditFields({ ...editFields, email: e.target.value })}
                    className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-semibold mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={editFields.phone}
                    onChange={(e) => setEditFields({ ...editFields, phone: e.target.value })}
                    className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1.5">Home Address</label>
                <input
                  type="text"
                  value={editFields.address}
                  onChange={(e) => setEditFields({ ...editFields, address: e.target.value })}
                  className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1.5">Emergency Contact (Name & Phone)</label>
                <input
                  type="text"
                  value={editFields.emergencyContact}
                  onChange={(e) => setEditFields({ ...editFields, emergencyContact: e.target.value })}
                  className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800"
                />
              </div>

              <div className="pt-2">
                <button
                  id="save-profile-btn"
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow-lg shadow-teal-600/15 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Downloads */}
        {activeTab === "downloads" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-950 font-sans">Guides & Information Sheets</h3>
              <p className="text-slate-500 text-xs">Evidence-based printouts and workbooks to read Offline</p>
            </div>

            {downloadSuccessMsg && (
              <div className="bg-teal-50/85 backdrop-blur-xs text-teal-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-teal-200">
                <Check className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>{downloadSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INFO_SHEETS.map((sheet) => (
                <div key={sheet.id} className="glass-panel p-5 rounded-[24px] flex justify-between items-start gap-4 hover:border-white/90 transition">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50/80 border border-teal-200 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {sheet.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm pt-1">{sheet.title}</h4>
                    <p className="text-slate-500 text-xs leading-normal">{sheet.description}</p>
                    <span className="text-[10px] text-slate-400 block pt-1 font-medium">{sheet.fileSize}</span>
                  </div>
                  
                  <button
                    id={`download-sheet-${sheet.id}`}
                    onClick={() => {
                      setDownloadSuccessMsg(`Successfully started download for: "${sheet.title}" (Demo file transfer complete)`);
                      setTimeout(() => setDownloadSuccessMsg(""), 5000);
                    }}
                    className="p-2.5 bg-white/40 text-teal-800 hover:bg-teal-600 hover:text-white rounded-xl border border-white/60 hover:border-teal-500 transition shadow-sm cursor-pointer"
                    title="Download guide"
                  >
                    <Download className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Contact Support */}
        {activeTab === "support" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-950 font-sans">Contact Wellness Support</h3>
              <p className="text-slate-500 text-xs">Request help regarding your records or educational sheets</p>
            </div>

            <form onSubmit={handleSupportSubmit} className="glass-panel p-6 md:p-8 rounded-[24px] space-y-4">
              {supportSuccess && (
                <div className="bg-teal-50/85 backdrop-blur-xs text-teal-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-teal-200">
                  <Check className="w-4.5 h-4.5 text-teal-600" />
                  <span>Your message has been sent. Our team will get back to you shortly.</span>
                </div>
              )}

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1.5">How can we assist you today?</label>
                <textarea
                  required
                  rows={5}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Ask a technical question about your guides, log requests, or request further educational focus sheet options..."
                  className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition backdrop-blur-xs text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="pt-2">
                <button
                  id="submit-support-btn"
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow-lg shadow-teal-600/15 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Support Ticket
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
