// "What your browser reveals" demo for the home page.
// Reads only what any website can read, entirely in the visitor's browser.
// It makes NO network requests and stores nothing (no cookies, no localStorage).
(function () {
  "use strict";

  var button = document.getElementById("fp-reveal");
  if (!button) return;

  function browserName(ua) {
    var m;
    if ((m = ua.match(/Edg\/([\d]+)/))) return "Microsoft Edge " + m[1];
    if ((m = ua.match(/OPR\/([\d]+)/))) return "Opera " + m[1];
    if ((m = ua.match(/Firefox\/([\d]+)/))) return "Firefox " + m[1];
    if ((m = ua.match(/Chrome\/([\d]+)/))) return "Chrome " + m[1];
    if ((m = ua.match(/Version\/([\d.]+).*Safari/))) return "Safari " + m[1];
    return "Unknown browser";
  }

  function osName(ua) {
    var m;
    if ((m = ua.match(/iPhone OS ([\d_]+)/))) return "iOS " + m[1].replace(/_/g, ".");
    if ((m = ua.match(/iPad.*OS ([\d_]+)/))) return "iPadOS " + m[1].replace(/_/g, ".");
    if ((m = ua.match(/Android ([\d.]+)/))) return "Android " + m[1];
    if (/Mac OS X/.test(ua)) return navigator.maxTouchPoints > 1 ? "iPadOS (desktop mode)" : "macOS";
    if (/Windows NT 10/.test(ua)) return "Windows 10 or 11";
    if (/Windows/.test(ua)) return "Windows";
    if (/CrOS/.test(ua)) return "ChromeOS";
    if (/Linux/.test(ua)) return "Linux";
    return "Unknown";
  }

  function timeZone() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
      var off = -new Date().getTimezoneOffset();
      var sign = off >= 0 ? "+" : "−";
      off = Math.abs(off);
      var hh = Math.floor(off / 60);
      var mm = off % 60;
      return tz + " (UTC" + sign + hh + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "") + ")";
    } catch (e) {
      return "unknown";
    }
  }

  function gpu() {
    try {
      var c = document.createElement("canvas");
      var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return "not available";
      var ext = gl.getExtension("WEBGL_debug_renderer_info");
      var r = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      // Tidy common driver strings, e.g. "ANGLE (Apple, ANGLE Metal Renderer: Apple M1 Pro, Unspecified Version)"
      r = String(r).replace(/^ANGLE \((.*)\)$/, "$1");
      var m = r.match(/Renderer: ([^,]+)/);
      if (m) r = m[1];
      r = r.replace(/,? *(Unspecified Version|Direct3D11.*|vs_\d.*|OpenGL.*)$/i, "").replace(/\s*\(0x[0-9A-F]+\)/gi, "");
      // Drop a repeated vendor prefix, e.g. "NVIDIA, NVIDIA GeForce RTX 3060"
      r = r.replace(/^([^,]+), (.*)$/, function (all, vendor, rest) {
        return rest.toLowerCase().indexOf(vendor.toLowerCase()) !== -1 ? rest : all;
      });
      return r.trim() || "unknown";
    } catch (e) {
      return "blocked";
    }
  }

  // Draws some text and shapes; tiny rendering differences between devices change the result.
  function canvasHash() {
    try {
      var c = document.createElement("canvas");
      c.width = 240;
      c.height = 60;
      var x = c.getContext("2d");
      x.textBaseline = "top";
      x.font = "16px 'Arial'";
      x.fillStyle = "#822433";
      x.fillRect(100, 5, 80, 30);
      x.fillStyle = "#069";
      x.fillText("Sapienza fingerprint ✓ 🙂", 4, 12);
      x.fillStyle = "rgba(102, 204, 0, 0.6)";
      x.fillText("Sapienza fingerprint ✓ 🙂", 6, 16);
      return hash(c.toDataURL()).slice(0, 8);
    } catch (e) {
      return "blocked";
    }
  }

  // Checks which common fonts are installed by measuring text width.
  function fonts() {
    var list = ["Arial", "Calibri", "Cambria", "Comic Sans MS", "Consolas", "Courier New", "Garamond", "Georgia", "Helvetica Neue", "Impact",
      "Lucida Grande", "Menlo", "Monaco", "Palatino", "Roboto", "Segoe UI", "SF Pro Text", "Tahoma", "Times New Roman", "Trebuchet MS",
      "Ubuntu", "Verdana", "Avenir", "Futura", "Gill Sans"];
    var bases = ["monospace", "serif", "sans-serif"];
    var c = document.createElement("canvas").getContext("2d");
    var text = "mmmmmmmmmmlli10OQ";
    function width(f) {
      c.font = "72px " + f;
      return c.measureText(text).width;
    }
    var base = bases.map(width);
    var found = list.filter(function (name) {
      return bases.some(function (b, i) {
        return width("'" + name + "'," + b) !== base[i];
      });
    });
    return found;
  }

  // Small non-cryptographic hash (cyrb53), so it also works on plain http.
  function hash(str) {
    var h1 = 0xdeadbeef,
      h2 = 0x41c6ce57;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    var n = 4294967296 * (2097151 & h2) + (h1 >>> 0);
    return n.toString(16).padStart(14, "0");
  }

  function yesNo(v) {
    return v ? "yes" : "no";
  }

  function collect() {
    var ua = navigator.userAgent;
    var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]).join(", ");
    var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var fontList = fonts();
    var dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
    var gpc = navigator.globalPrivacyControl === true;

    return [
      { icon: "fa-globe", label: "Time zone", value: timeZone(), hint: "Gives away roughly where you are." },
      { icon: "fa-language", label: "Languages", value: langs, hint: "Your preferred languages, in order." },
      { icon: "fa-window-maximize", label: "Browser", value: browserName(ua) },
      { icon: "fa-laptop", label: "Operating system", value: osName(ua) },
      {
        icon: "fa-display",
        label: "Screen",
        value: screen.width + " × " + screen.height + " px, " + (window.devicePixelRatio || 1) + "× pixel density, " + screen.colorDepth + "-bit colour",
      },
      { icon: "fa-up-right-and-down-left-from-center", label: "Window size", value: window.innerWidth + " × " + window.innerHeight + " px" },
      { icon: "fa-microchip", label: "CPU cores", value: navigator.hardwareConcurrency ? String(navigator.hardwareConcurrency) : "hidden" },
      { icon: "fa-memory", label: "Memory", value: navigator.deviceMemory ? "about " + navigator.deviceMemory + " GB" : "hidden by your browser" },
      { icon: "fa-gamepad", label: "Graphics card", value: gpu(), hint: "Read through WebGL." },
      { icon: "fa-hand-pointer", label: "Touch screen", value: navigator.maxTouchPoints > 0 ? "yes (" + navigator.maxTouchPoints + " touch points)" : "no" },
      { icon: "fa-circle-half-stroke", label: "Prefers dark mode", value: yesNo(dark) },
      {
        icon: "fa-font",
        label: "Fonts installed",
        value: fontList.length + " of 25 common fonts checked",
        hint: fontList.length ? fontList.slice(0, 6).join(", ") + (fontList.length > 6 ? "…" : "") : "",
      },
      { icon: "fa-paintbrush", label: "Canvas drawing", value: canvasHash(), hint: "A hash of a small drawing. It comes out slightly different on different devices." },
      { icon: "fa-user-secret", label: "Do Not Track / GPC", value: (dnt ? "Do Not Track on" : "Do Not Track off") + ", " + (gpc ? "GPC on" : "GPC off") },
    ];
  }

  function render(items) {
    var grid = document.getElementById("fp-grid");
    grid.innerHTML = "";
    items.forEach(function (it) {
      var row = document.createElement("div");
      row.className = "fp-item";
      var dt = document.createElement("dt");
      var icon = document.createElement("i");
      icon.className = "fa-solid " + it.icon;
      icon.setAttribute("aria-hidden", "true");
      dt.appendChild(icon);
      dt.appendChild(document.createTextNode(" " + it.label));
      var dd = document.createElement("dd");
      dd.textContent = it.value;
      if (it.hint) {
        var small = document.createElement("span");
        small.className = "fp-hint";
        small.textContent = it.hint;
        dd.appendChild(small);
      }
      row.appendChild(dt);
      row.appendChild(dd);
      grid.appendChild(row);
    });

    var id = hash(
      items
        .filter(function (it) {
          return it.label !== "Window size";
        })
        .map(function (it) {
          return it.label + "=" + it.value;
        })
        .join("|")
    );
    document.getElementById("fp-id").textContent = id.slice(0, 4) + " " + id.slice(4, 8) + " " + id.slice(8, 12);
  }

  button.addEventListener("click", function () {
    var results = document.getElementById("fp-results");
    render(collect());
    results.hidden = false;
    button.innerHTML = '<i class="fa-solid fa-rotate" aria-hidden="true"></i> Check again';
  });
})();
