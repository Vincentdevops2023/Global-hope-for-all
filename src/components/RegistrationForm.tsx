import { useState, FormEvent } from "react";
import { User, Mail, ShieldCheck, Lock, MapPin, Phone, Heart, Calendar, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { PatientProfile } from "../types";

export default function RegistrationForm({ onRegistered }: { onRegistered: (username: string) => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "prefer-not-to-say",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToPrivacy: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!formData.agreeToPrivacy) {
      setErrorMsg("You must accept the Privacy Policy to proceed.");
      return;
    }

    setIsLoading(true);

    // Simulate network latency
    setTimeout(() => {
      try {
        // Save user details to localStorage
        const existingUsers = localStorage.getItem("global_hope_patients");
        const users = existingUsers ? JSON.parse(existingUsers) : {};

        if (users[formData.username.toLowerCase()]) {
          setErrorMsg("Username is already taken. Please choose another.");
          setIsLoading(false);
          return;
        }

        const newProfile: PatientProfile = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          username: formData.username
        };

        // Store user profile + password
        users[formData.username.toLowerCase()] = {
          profile: newProfile,
          password: formData.password
        };

        localStorage.setItem("global_hope_patients", JSON.stringify(users));
        
        // Auto sign-in
        localStorage.setItem("global_hope_current_user", formData.username.toLowerCase());

        setSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          onRegistered(formData.username);
        }, 1500);

      } catch (err) {
        setErrorMsg("Failed to complete registration. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  if (success) {
    return (
      <div id="registration-success-card" className="glass-panel-heavy border-white/80 p-8 rounded-[40px] max-w-xl mx-auto shadow-2xl text-center my-6">
        <div className="mx-auto w-16 h-16 bg-teal-100/80 text-teal-800 rounded-full flex items-center justify-center mb-6 shadow-md border border-white/40">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-950 mb-3 font-sans">Account Created Successfully</h3>
        <p className="text-slate-600 text-sm mb-6">
          Welcome to the Global Hope For All patient network! We are setting up your personalized portal...
        </p>
        <div className="flex justify-center items-center gap-2 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-4.5 h-4.5 animate-spin" />
          <span>Redirecting to Patient Information Portal</span>
        </div>
      </div>
    );
  }

  return (
    <div id="registration-form-card" className="glass-panel-heavy rounded-[40px] shadow-2xl overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-950/85 via-blue-900/85 to-teal-800/85 text-white p-6 md:p-8 border-b border-white/20">
        <h3 className="text-xl md:text-2xl font-bold font-sans">Secure Patient Registration</h3>
        <p className="text-teal-100 text-xs md:text-sm mt-1.5 font-light">
          Join our secure portal to view scheduled appointments, update details, download stress guidelines, and consult with educators.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
        {errorMsg && (
          <div className="bg-red-50 text-red-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Name & DOB Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">First Name *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Last Name *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 backdrop-blur-xs"
            >
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>
        </div>

        {/* Address & Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Home Address</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="123 Wellness Way, Seattle, WA"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5">Emergency Contact (Name & Phone)</label>
            <div className="relative">
              <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Sarah Doe (+1 555-092-2342)"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
              />
            </div>
          </div>
        </div>

        {/* Username & Password credentials */}
        <div className="bg-white/30 backdrop-blur-md p-5 rounded-[24px] space-y-4 border border-white/50">
          <h4 className="text-slate-800 text-xs font-bold uppercase tracking-wider">Account Credentials</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">Username *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="johndoe88"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/50 focus:bg-white/75 border border-white/70 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/50 focus:bg-white/75 border border-white/70 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/50 focus:bg-white/75 border border-white/70 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3">
          <input
            id="privacy-agreement"
            type="checkbox"
            checked={formData.agreeToPrivacy}
            onChange={(e) => setFormData({ ...formData, agreeToPrivacy: e.target.checked })}
            className="mt-1 w-4 h-4 text-teal-700 bg-white/50 border-white/60 rounded focus:ring-teal-500 cursor-pointer"
          />
          <label htmlFor="privacy-agreement" className="text-slate-500 text-xs leading-normal cursor-pointer select-none">
            I agree to the <strong className="text-slate-800">Privacy Policy</strong>, <strong className="text-slate-800">Cookie Policy</strong>, and understand that my registration data is securely and confidentially stored. I agree that the material on this platform is strictly educational and does not constitute a doctor-patient therapeutic relationship.
          </label>
        </div>

        <button
          id="submit-registration-btn"
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 font-bold py-3.5 rounded-xl transition duration-150 shadow-lg shadow-teal-600/15 text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? "Creating Secure Account..." : "Complete Registration"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
