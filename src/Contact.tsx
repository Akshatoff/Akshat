import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function ContactOS() {
  // Window states: open, minimized, or maximized
  const [windows, setWindows] = useState({
    terminal: { open: true, zIndex: 3 },
    manifest: { open: true, zIndex: 2 },
  });

  const [topWindow, setTopWindow] = useState("terminal");

  // Terminal execution states
  const [terminalHistory, setTerminalHistory] = useState([
    "SYS_INIT: Core protocols loaded successfully.",
    "Type 'help' for a list of available system parameters.",
    "Ready for user input...",
    "",
  ]);
  const [inputVal, setInputVal] = useState("");
  const [contactStep, setContactStep] = useState(0); // 0 = idle, 1 = name, 2 = email, 3 = msg
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const terminalEndRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const bringToFront = (winName) => {
    setTopWindow(winName);
    setWindows((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key].zIndex = key === winName ? 10 : 2;
      });
      return updated;
    });
  };

  const toggleWindow = (winName, action) => {
    setWindows((prev) => ({
      ...prev,
      [winName]: { ...prev[winName], open: action === "open" },
    }));
    if (action === "open") bringToFront(winName);
  };

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const trimmedInput = inputVal.trim();
    const cmd = trimmedInput.toLowerCase();
    let response = [];

    // If currently running the sequential contact form setup
    if (contactStep > 0) {
      handleContactWizard(trimmedInput);
      return;
    }

    // Normal OS Terminal Commands
    switch (cmd) {
      case "help":
        response = [
          `> ${trimmedInput}`,
          "Available Commands:",
          "  contact  - Initiate secure routing communication array.",
          "  matrix   - Break down localized visual temporal physics.",
          "  sudo     - Request administrative overwrite privileges.",
          "  clear    - Flush local display cache buffers.",
        ];
        break;
      case "clear":
        setTerminalHistory([]);
        setInputVal("");
        return;
      case "contact":
        setContactStep(1);
        response = [
          `> ${trimmedInput}`,
          "--- INITIALIZING COMMUNICATIONS PROTOCOL ---",
          "Please enter your identification sequence (Your Name):",
        ];
        break;
      case "matrix":
        response = [
          `> ${trimmedInput}`,
          "WAKE UP, NEO...",
          "The matrix has you.",
          "Follow the white rabbit.",
        ];
        break;
      case "sudo":
        response = [
          `> ${trimmedInput}`,
          "sys_error: User not in the sudoers file. This incident will be reported.",
        ];
        break;
      case "":
        response = [">"];
        break;
      default:
        response = [
          `> ${trimmedInput}`,
          `command_not_found: '${trimmedInput}' is unresolvable. Type 'help'.`,
        ];
    }

    setTerminalHistory((prev) => [...prev, ...response]);
    setInputVal("");
  };

  const handleContactWizard = (value) => {
    if (contactStep === 1) {
      setFormData((p) => ({ ...p, name: value }));
      setTerminalHistory((prev) => [
        ...prev,
        `Name: ${value}`,
        "Enter your digital network return node (Your Email):",
      ]);
      setContactStep(2);
    } else if (contactStep === 2) {
      setFormData((p) => ({ ...p, email: value }));
      setTerminalHistory((prev) => [
        ...prev,
        `Email: ${value}`,
        "Compile transmission payloads (Type your Message):",
      ]);
      setContactStep(3);
    } else if (contactStep === 3) {
      const finalData = { ...formData, message: value };
      setTerminalHistory((prev) => [
        ...prev,
        `Message: ${value}`,
        "PACKET TRANSMISSION COMPLETE. ENGAGING HYPER-ROUTING...",
        `Thank you, ${finalData.name}. Connection pipeline established successfully.`,
      ]);
      console.log("Transmission Received:", finalData); // Connect your database or service here
      setContactStep(0);
      setFormData({ name: "", email: "", message: "" });
    }
    setInputVal("");
  };

  return (
    <div className="os-viewport">
      <div className="grid-bg-os"></div>

      {/* --- DESKTOP LAYER --- */}
      <div className="desktop-surface">
        <div className="desktop-icon" onClick={() => toggleWindow("terminal", "open")}>
          <div className="icon-graphic terminal-icon"></div>
          <span className="icon-label">Secure_Terminal.sh</span>
        </div>

        <div className="desktop-icon" onClick={() => toggleWindow("manifest", "open")}>
          <div className="icon-graphic manifest-icon"></div>
          <span className="icon-label">System_Manifest.log</span>
        </div>
      </div>

      {/* --- WINDOW 1: SYSTEM MANIFEST (EASTER EGG BACKDROP) --- */}
      {windows.manifest.open && (
        <div
          className="os-window manifest-window"
          style={{ zIndex: windows.manifest.zIndex }}
          onClick={() => bringToFront("manifest")}
        >
          <div className="window-header">
            <span className="window-title">System_Manifest.log</span>
            <div className="window-controls">
              <button className="control-btn close" onClick={() => toggleWindow("manifest", "close")}></button>
            </div>
          </div>
          <div className="window-content markdown-body">
            <p className="highlight-text">// CORE SYSTEM METRICS</p>
            <p>&gt; LOC: New Delhi, India // Node Latency: Stable</p>
            <p>&gt; RUNTIME: 6+ Years Continuous Front-End Development</p>
            <br />
            <p className="highlight-text">// SUBSYSTEM ARRAYS RECOVERED</p>
            <p>[OK] React / Next.js Framework Compilers</p>
            <p>[OK] GSAP High-Fidelity Physics Engine</p>
            <p>[OK] Algorithmic Optimization Module (C++ / Python / SQL)</p>
            <br />
            <p className="highlight-text">// ONGOING SUBROUTINES</p>
            <p>&gt; Prepping academic modules [JEE Target Parameter Active]</p>
            <p>&gt; Serving modern design agency platforms</p>
          </div>
        </div>
      )}

      {/* --- WINDOW 2: INTERACTIVE TERMINAL (CONTACT MAIN) --- */}
      {windows.terminal.open && (
        <div
          className="os-window terminal-window"
          style={{ zIndex: windows.terminal.zIndex }}
          onClick={() => bringToFront("terminal")}
        >
          <div className="window-header">
            <span className="window-title">root@akshat:~</span>
            <div className="window-controls">
              <button className="control-btn close" onClick={() => toggleWindow("terminal", "close")}></button>
            </div>
          </div>
          <div className="window-content terminal-body">
            <div className="terminal-log">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="terminal-line">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            <div className="terminal-input-row">
              <span className="prompt-symbol">akshat_os_core#</span>
              <input
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* --- TASKBAR BOTTOM FOOTER --- */}
      <div className="os-taskbar">
        <div className="taskbar-left">
          <span className="os-start-button">⚡ CORE_OS</span>
        </div>
        <div className="taskbar-right">
          <span className="digital-clock">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} New Delhi
          </span>
        </div>
      </div>
    </div>
  );
}
