import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Smartphone, Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("input"); // input, otp, success
  const [loginMethod, setLoginMethod] = useState("phone");
  const { login, isLoggedIn } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const sendOTP = () => {
    if (loginMethod === "phone") {
      if (phoneNumber.length === 10) {
        // Simulate OTP send
        setStep("otp");
        alert(`OTP sent to +91 ${phoneNumber}`);
      } else {
        alert("Please enter a valid 10-digit phone number");
      }
    } else {
      if (email.includes("@")) {
        setStep("otp");
        alert(`OTP sent to ${email}`);
      } else {
        alert("Please enter a valid email address");
      }
    }
  };

  const verifyOTP = () => {
    if (otp === "123456") {
      setStep("success");
      setTimeout(() => {
        // Redirect to home page
        window.location.href = "/";
      }, 2000);
    } else {
      alert("Invalid OTP. Please try 123456 for demo");
    }
  };

  const loginWithPassword = () => {
    if (email.includes("@") && password.length >= 6) {
      setStep("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      alert("Please enter valid email and password (min 6 characters)");
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://cdn.builder.io/api/v1/assets/cb420c754f164cb09479ca8042848804/1754575128006-fef9ca?format=webp&width=800" 
                alt="DRIPZOID" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          {step === "success" ? (
            /* Success State */
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold mb-4">Welcome to DRIPZOID!</h1>
              <p className="text-muted-foreground mb-6">
                Login successful. Redirecting to homepage...
              </p>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  {step === "input" ? "Welcome Back" : "Verify OTP"}
                </h1>
                <p className="text-muted-foreground">
                  {step === "input" 
                    ? "Sign in to your DRIPZOID account" 
                    : `We've sent a 6-digit code to ${loginMethod === "phone" ? `+91 ${phoneNumber}` : email}`
                  }
                </p>
              </div>

              {step === "input" ? (
                /* Input Step */
                <Tabs value={loginMethod} onValueChange={setLoginMethod} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Phone
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="phone" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-border rounded-l-lg bg-muted text-muted-foreground">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 px-3 py-2 border border-border rounded-r-lg"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={sendOTP}
                      className="w-full bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground"
                      disabled={phoneNumber.length !== 10}
                    >
                      Send OTP
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <Link to="/terms" className="text-neon-blue hover:underline">Terms of Service</Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-neon-blue hover:underline">Privacy Policy</Link>
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="space-y-3">
                      <Button 
                        onClick={loginWithPassword}
                        className="w-full bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground"
                        disabled={!email.includes("@") || password.length < 6}
                      >
                        Sign In
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>

                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">OR</span>
                      </div>

                      <Button 
                        onClick={sendOTP}
                        variant="outline"
                        className="w-full"
                        disabled={!email.includes("@")}
                      >
                        Send OTP Instead
                      </Button>
                    </div>

                    <div className="text-center">
                      <Link to="/forgot-password" className="text-sm text-neon-blue hover:underline">
                        Forgot your password?
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                /* OTP Verification Step */
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter 6-digit OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-3 py-2 border border-border rounded-lg text-center text-lg tracking-widest"
                      placeholder="123456"
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      For demo, use: 123456
                    </p>
                  </div>

                  <Button 
                    onClick={verifyOTP}
                    className="w-full bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground"
                    disabled={otp.length !== 6}
                  >
                    Verify & Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      onClick={() => setStep("input")}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Back
                    </button>
                    
                    <button className="text-neon-blue hover:underline">
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sign Up Link */}
          {step === "input" && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-neon-blue hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
