// Guillermo & Nadja: two small cats that now and then wander along the bottom of the page.
//
// - Rare: at most one appearance per page view, on ~35% of page views, max 3 per browser session.
// - Off for visitors who ask their system for reduced motion.
// - A "hide cats" button appears while they are on screen; the choice is remembered in this browser.
// - Testing: add ?cats (random scene) or ?cats=stroll|visit|nap|chase|meet to any URL.
//   From the console: cats.show("nap"), cats.hide(), cats.unhide().
// No network requests, no tracking.
(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ---------------------------------------------------------------------------
  // The cats
  // ---------------------------------------------------------------------------
  var CATS = {
    guillermo: {
      name: "Guillermo",
      base: "#e9a45e",
      dark: "#cf8442", // far-side legs
      light: "#f8dfba",
      muzzle: "#f8dfba",
      nose: "#ee9aa3",
      ear: "#f3b8b2",
      eye: "#c9b84f",
      lid: "#9a5a26",
      paw: "#f8dfba",
      tailMark: "#c77a36",
      tailDash: "3 4",
      coat: {
        walk:
          '<ellipse cx="48" cy="46" rx="22" ry="5" fill="#f8dfba"/>' +
          '<g stroke="#c77a36" stroke-width="2.4" stroke-linecap="round" fill="none">' +
          '<path d="M30 25 q3 7 -1 14"/><path d="M38 24 q3 7 -1 15"/><path d="M46 24 q3 7 -1 15"/>' +
          '<path d="M54 24 q3 7 -1 14"/><path d="M62 25 q3 6 -1 12"/>' +
          '<path d="M74 14 l1 5"/><path d="M78 13.5 v5"/><path d="M82 14.5 l-1 4"/></g>',
        sit:
          '<ellipse cx="39" cy="46" rx="6" ry="13" fill="#f8dfba"/>' +
          '<g stroke="#c77a36" stroke-width="2.2" stroke-linecap="round" fill="none">' +
          '<path d="M11 54 q7 -4 13 0"/><path d="M10 60 q7 -4 14 0"/><path d="M12 66 q6 -3 12 0"/>' +
          '<path d="M22 34 q4 -2 7 0"/><path d="M21 40 q4 -2 7 0"/>' +
          '<path d="M32 12 l.6 4.5"/><path d="M36 11 v5"/><path d="M40 12 l-.6 4.5"/></g>',
        sleep:
          '<g stroke="#c77a36" stroke-width="2.2" stroke-linecap="round" fill="none">' +
          '<path d="M22 17 q2 6 -1 11"/><path d="M30 16 q2 6 -1 12"/><path d="M38 16 q2 6 -1 12"/>' +
          '<path d="M46 16 q2 6 -1 12"/><path d="M62 15 l.6 4"/><path d="M66 14.5 v4"/><path d="M70 15 l-.6 4"/></g>',
      },
    },
    nadja: {
      name: "Nadja",
      base: "#2d231d",
      dark: "#1d1612",
      light: "#f1ece4",
      muzzle: "#3a2c24",
      nose: "#4a3530",
      ear: "#7a5450",
      eye: "#d0cc5f",
      lid: "#c9a36a",
      paw: "#2d231d",
      tailMark: "#a8672f",
      tailDash: "2 8",
      coat: {
        // Soft, mottled tortoiseshell: many small semi-transparent patches.
        walk:
          '<g opacity=".72"><ellipse cx="34" cy="30" rx="7" ry="3.5" fill="#a8672f" transform="rotate(-15 34 30)"/>' +
          '<ellipse cx="41" cy="27" rx="3" ry="2" fill="#b8763a"/><ellipse cx="53" cy="41" rx="6" ry="2.5" fill="#6e4524"/>' +
          '<ellipse cx="62" cy="29" rx="4.5" ry="2.5" fill="#a8672f" transform="rotate(20 62 29)"/><ellipse cx="24" cy="39" rx="3.5" ry="3" fill="#6e4524"/>' +
          '<ellipse cx="46" cy="34" rx="2.5" ry="1.5" fill="#8a5528"/><ellipse cx="57" cy="35" rx="2" ry="1.2" fill="#a8672f"/>' +
          '<ellipse cx="29" cy="44" rx="2.5" ry="1.5" fill="#8a5528"/></g>' +
          '<ellipse cx="83" cy="21" rx="4" ry="9" fill="#a8672f" opacity=".85"/>',
        sit:
          '<ellipse cx="40.5" cy="20" rx="5.5" ry="11" fill="#a8672f" opacity=".85"/><ellipse cx="44" cy="14" rx="2.5" ry="3.5" fill="#6e4524" opacity=".8"/>' +
          '<g opacity=".72"><ellipse cx="27" cy="38" rx="3.5" ry="6" fill="#a8672f" transform="rotate(15 27 38)"/>' +
          '<ellipse cx="19" cy="59" rx="5" ry="3.5" fill="#6e4524"/><ellipse cx="33" cy="59" rx="3" ry="4.5" fill="#8a5528"/>' +
          '<ellipse cx="30" cy="50" rx="2.5" ry="1.6" fill="#a8672f"/><ellipse cx="22" cy="50" rx="2" ry="1.4" fill="#b8763a"/>' +
          '<ellipse cx="13" cy="64" rx="2.5" ry="2" fill="#a8672f"/><ellipse cx="35" cy="34" rx="2" ry="3" fill="#8a5528"/></g>',
        sleep:
          '<g opacity=".72"><ellipse cx="28" cy="22" rx="6" ry="3" fill="#a8672f" transform="rotate(-10 28 22)"/>' +
          '<ellipse cx="46" cy="30" rx="7" ry="3" fill="#6e4524"/><ellipse cx="54" cy="21" rx="4" ry="2.4" fill="#a8672f"/>' +
          '<ellipse cx="37" cy="25" rx="2.5" ry="1.5" fill="#b8763a"/><ellipse cx="20" cy="30" rx="3" ry="2" fill="#8a5528"/></g>' +
          '<ellipse cx="69" cy="22" rx="4" ry="7" fill="#a8672f" opacity=".85"/>',
      },
    },
  };

  var SCALE = 0.9; // screen pixels per drawing unit

  // ---------------------------------------------------------------------------
  // Drawing helpers (simple flat SVG)
  // ---------------------------------------------------------------------------
  function tail(d, path) {
    return (
      '<path d="' + path + '" stroke="' + d.base + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="' + path + '" stroke="' + d.tailMark + '" stroke-width="5" fill="none" stroke-dasharray="' + d.tailDash + '"/>'
    );
  }

  // Each ear: [baseX1, baseY1, tipX, tipY, baseX2, baseY2]; the inner ear is a smaller copy.
  function ears(d, list) {
    return list
      .map(function (e) {
        var cx = (e[0] + e[2] + e[4]) / 3,
          cy = (e[1] + e[3] + e[5]) / 3;
        var inner = [0, 2, 4]
          .map(function (i) {
            return (cx + (e[i] - cx) * 0.55).toFixed(1) + "," + (cy + (e[i + 1] - cy) * 0.55).toFixed(1);
          })
          .join(" ");
        return (
          '<polygon points="' + e[0] + "," + e[1] + " " + e[2] + "," + e[3] + " " + e[4] + "," + e[5] + '" fill="' + d.base + '"/>' +
          '<polygon points="' + inner + '" fill="' + d.ear + '"/>'
        );
      })
      .join("");
  }

  function eye(d, cx, cy, pupilShift) {
    return (
      '<g class="cat-eye"><ellipse cx="' + cx + '" cy="' + cy + '" rx="2.1" ry="2.5" fill="' + d.eye + '"/>' +
      '<ellipse cx="' + (cx + (pupilShift || 0)) + '" cy="' + cy + '" rx=".75" ry="1.9" fill="#161210"/></g>'
    );
  }

  function whiskers(list) {
    return (
      '<g stroke="#d8cfc3" stroke-width=".5" stroke-linecap="round" opacity=".75">' +
      list
        .map(function (w) {
          return '<line x1="' + w[0] + '" y1="' + w[1] + '" x2="' + w[2] + '" y2="' + w[3] + '"/>';
        })
        .join("") +
      "</g>"
    );
  }

  var POSES = {
    // Side view, walking to the right.
    walk: {
      w: 100,
      h: 62,
      draw: function (d, u) {
        return (
          '<defs><clipPath id="' + u + '-w"><ellipse cx="46" cy="36" rx="28" ry="12"/><circle cx="78" cy="24" r="11"/></clipPath></defs>' +
          '<g class="cat-tail" style="transform-origin:21px 34px">' + tail(d, "M21 34 C 8 30, 3 18, 9 7") + "</g>" +
          '<rect class="leg leg-a" x="24" y="38" width="6" height="22" rx="3" fill="' + d.dark + '"/>' +
          '<rect class="leg leg-b" x="66" y="38" width="6" height="22" rx="3" fill="' + d.dark + '"/>' +
          '<g class="cat-bob">' +
          ears(d, [[69, 18, 70, 5, 77, 13], [77, 13, 84, 3, 88, 16]]) +
          '<ellipse cx="46" cy="36" rx="28" ry="12" fill="' + d.base + '"/>' +
          '<circle cx="78" cy="24" r="11" fill="' + d.base + '"/>' +
          '<g clip-path="url(#' + u + '-w)">' + d.coat.walk + "</g>" +
          '<ellipse cx="85" cy="28" rx="5.5" ry="4" fill="' + d.muzzle + '"/>' +
          '<ellipse cx="84.5" cy="32" rx="3" ry="1.5" fill="' + d.light + '"/>' +
          eye(d, 83, 21, 0.5) +
          '<circle cx="90.2" cy="26.4" r="1.4" fill="' + d.nose + '"/>' +
          whiskers([[88, 28, 99, 25], [88, 29, 99, 30.5]]) +
          "</g>" +
          '<rect class="leg leg-b" x="30" y="40" width="6.5" height="20" rx="3" fill="' + d.base + '"/>' +
          '<rect class="leg leg-a" x="72" y="40" width="6.5" height="20" rx="3" fill="' + d.base + '"/>'
        );
      },
    },
    // Body in profile, head turned towards the viewer.
    sit: {
      w: 64,
      h: 76,
      draw: function (d, u) {
        return (
          '<defs><clipPath id="' + u + '-s"><ellipse cx="24" cy="58" rx="15" ry="15"/><ellipse cx="32" cy="46" rx="13" ry="22"/>' +
          '<circle cx="36" cy="22" r="12"/></clipPath></defs>' +
          '<rect x="36" y="50" width="6" height="24" rx="3" fill="' + d.dark + '"/>' +
          '<ellipse cx="24" cy="58" rx="15" ry="15" fill="' + d.base + '"/>' +
          '<ellipse cx="32" cy="46" rx="13" ry="22" fill="' + d.base + '"/>' +
          ears(d, [[25, 17, 24, 3, 33, 11], [39, 11, 48, 3, 47, 17]]) +
          '<circle cx="36" cy="22" r="12" fill="' + d.base + '"/>' +
          '<g clip-path="url(#' + u + '-s)">' + d.coat.sit + "</g>" +
          '<rect x="42" y="52" width="6.5" height="22" rx="3" fill="' + d.base + '"/>' +
          '<ellipse cx="36" cy="27.5" rx="5.5" ry="3.6" fill="' + d.muzzle + '"/>' +
          eye(d, 31.5, 21, 0) +
          eye(d, 40.5, 21, 0) +
          '<path d="M34.5 25 h3 l-1.5 1.8z" fill="' + d.nose + '"/>' +
          '<ellipse cx="36" cy="31" rx="2.6" ry="1.4" fill="' + d.light + '"/>' +
          whiskers([[31, 28, 21, 26], [31, 29, 21, 30.5], [41, 28, 51, 26], [41, 29, 51, 30.5]]) +
          '<g class="cat-tail" style="transform-origin:14px 70px">' + tail(d, "M14 70 C 26 77, 48 77, 58 70") + "</g>"
        );
      },
    },
    // Curled up, asleep.
    sleep: {
      w: 84,
      h: 40,
      draw: function (d, u) {
        return (
          '<defs><clipPath id="' + u + '-z"><ellipse cx="40" cy="27" rx="30" ry="11"/><circle cx="66" cy="24" r="10"/></clipPath></defs>' +
          '<g class="cat-breathe">' +
          ears(d, [[57, 19, 58, 8, 64, 15], [67, 15, 74, 7, 76, 19]]) +
          '<ellipse cx="40" cy="27" rx="30" ry="11" fill="' + d.base + '"/>' +
          '<circle cx="66" cy="24" r="10" fill="' + d.base + '"/>' +
          '<g clip-path="url(#' + u + '-z)">' + d.coat.sleep + "</g>" +
          '<ellipse cx="66.5" cy="28" rx="4.2" ry="3" fill="' + d.muzzle + '"/>' +
          '<g stroke="' + d.lid + '" stroke-width=".9" fill="none" stroke-linecap="round">' +
          '<path d="M60.5 23.5 q2 1.6 4 0"/><path d="M68.5 23.5 q2 1.6 4 0"/></g>' +
          '<path d="M65.3 26.2 h2.4 l-1.2 1.4z" fill="' + d.nose + '"/>' +
          '<ellipse cx="56" cy="35" rx="4" ry="2.4" fill="' + d.paw + '"/>' +
          "</g>" +
          tail(d, "M12 29 C 8 41, 48 41, 60 35")
        );
      },
    },
  };

  function drawCat(d, pose, uid) {
    var P = POSES[pose];
    return (
      '<svg class="cat-svg" viewBox="0 0 ' + P.w + " " + P.h + '" width="' + P.w * SCALE + '" height="' + P.h * SCALE +
      '" focusable="false" aria-hidden="true">' + P.draw(d, uid) + "</svg>"
    );
  }

  // ---------------------------------------------------------------------------
  // Stage and sprites
  // ---------------------------------------------------------------------------
  var stage = null,
    hideBtn = null,
    running = false;
  var OFF = 100 * SCALE + 10; // how far off-screen a cat starts/ends

  function width() {
    return document.documentElement.clientWidth;
  }
  function wait(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  function store(kind, key, value) {
    try {
      var s = window[kind];
      if (value === undefined) return s.getItem(key);
      if (value === null) s.removeItem(key);
      else s.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  function footerHeight() {
    var f = document.querySelector("footer.fixed-bottom");
    return f ? f.getBoundingClientRect().height : 0;
  }

  function placeStage() {
    var h = footerHeight();
    if (stage) stage.style.bottom = h + "px";
    if (hideBtn) hideBtn.style.bottom = h + 8 + "px";
  }

  function Cat(key) {
    var self = this;
    this.d = CATS[key];
    this.uid = "cat-" + key + "-" + Math.random().toString(36).slice(2, 7);
    this.el = document.createElement("div");
    this.el.className = "cat-sprite";
    this.el.title = this.d.name;
    this.flip = document.createElement("div");
    this.flip.className = "cat-flip";
    this.el.appendChild(this.flip);
    this.x = 0;
    this.dir = 1;
    this.p = null;
    this.w = 0;
    stage.appendChild(this.el);
    this.el.addEventListener("click", function () {
      self.say(pick(["♥", "prrr…", "mrrp?", self.d.name + " says hi", "♥ ♥"]), 1800);
    });
  }

  Cat.prototype.place = function (x) {
    this.x = x;
    this.el.style.transform = "translateX(" + x + "px)";
  };

  // Changes pose, keeping the cat centred where it was.
  Cat.prototype.pose = function (p, run) {
    if (p !== this.p) {
      var newW = POSES[p].w * SCALE;
      if (this.p) this.place(this.x + (this.w - newW) / 2);
      this.flip.innerHTML = drawCat(this.d, p, this.uid);
      this.p = p;
      this.w = newW;
    }
    this.el.classList.toggle("cat-walk", p === "walk");
    this.el.classList.toggle("cat-run", !!run);
  };

  Cat.prototype.face = function (dir) {
    this.dir = dir;
    this.flip.style.transform = dir < 0 ? "scaleX(-1)" : "";
  };

  Cat.prototype.walkTo = function (x, speed) {
    var self = this;
    speed = speed || 70;
    this.face(x > this.x ? 1 : -1);
    this.pose("walk", speed > 140);
    var from = this.x;
    var dur = (Math.abs(x - from) / speed) * 1000;
    this.x = x;
    var a = this.el.animate([{ transform: "translateX(" + from + "px)" }, { transform: "translateX(" + x + "px)" }], {
      duration: dur,
      easing: "linear",
      fill: "forwards",
    });
    return a.finished.then(function () {
      self.el.style.transform = "translateX(" + x + "px)";
      a.cancel();
    });
  };

  Cat.prototype.say = function (text, ms) {
    var b = document.createElement("span");
    b.className = "cat-bubble";
    b.textContent = text;
    this.el.appendChild(b);
    setTimeout(function () {
      b.remove();
    }, ms || 2000);
  };

  Cat.prototype.zzz = function (on) {
    if (on) {
      this.z = document.createElement("span");
      this.z.className = "cat-zzz";
      this.z.textContent = "z z z";
      this.z.style[this.dir > 0 ? "right" : "left"] = "0";
      this.el.appendChild(this.z);
    } else if (this.z) {
      this.z.remove();
      this.z = null;
    }
  };

  function offLeft() {
    return -OFF;
  }
  function offRight() {
    return width() + 10;
  }

  // ---------------------------------------------------------------------------
  // Scenes
  // ---------------------------------------------------------------------------
  function enter(c) {
    var fromLeft = Math.random() < 0.5;
    c.place(fromLeft ? offLeft() : offRight());
    return fromLeft;
  }
  function leave(c, speed) {
    return c.walkTo(Math.random() < 0.5 ? offLeft() : offRight(), speed);
  }

  var SCENES = {
    // Walks across the screen.
    stroll: function () {
      var c = new Cat(pick(["guillermo", "nadja"]));
      var fromLeft = enter(c);
      return c.walkTo(fromLeft ? offRight() : offLeft(), rand(55, 75));
    },

    // Walks in, sits down to look at you for a while, leaves.
    visit: function () {
      var c = new Cat(pick(["guillermo", "nadja"]));
      enter(c);
      return c
        .walkTo(rand(0.15, 0.75) * width(), rand(60, 75))
        .then(function () {
          c.pose("sit");
          return wait(rand(1500, 2500));
        })
        .then(function () {
          if (Math.random() < 0.6) c.say(pick(["mrrp?", "…", "♥"]), 1800);
          return wait(rand(3500, 5500));
        })
        .then(function () {
          return leave(c);
        });
    },

    // Walks in, sits, falls asleep on the footer, wakes up, leaves.
    nap: function () {
      var c = new Cat(pick(["guillermo", "nadja"]));
      enter(c);
      return c
        .walkTo(rand(0.2, 0.7) * width(), rand(55, 70))
        .then(function () {
          c.pose("sit");
          return wait(1800);
        })
        .then(function () {
          c.pose("sleep");
          c.zzz(true);
          return wait(rand(9000, 13000));
        })
        .then(function () {
          c.zzz(false);
          c.pose("sit");
          return wait(1500);
        })
        .then(function () {
          return leave(c);
        });
    },

    // One dashes across, the other chases.
    chase: function () {
      var first = pick(["guillermo", "nadja"]);
      var a = new Cat(first),
        b = new Cat(first === "guillermo" ? "nadja" : "guillermo");
      var fromLeft = Math.random() < 0.5;
      var start = fromLeft ? offLeft() : offRight(),
        end = fromLeft ? offRight() : offLeft();
      a.place(start);
      b.place(start);
      var runA = a.walkTo(end, 230);
      return wait(500).then(function () {
        return Promise.all([runA, b.walkTo(end, 255)]);
      });
    },

    // They come from opposite sides, sit together for a moment, go their ways.
    meet: function () {
      var g = new Cat("guillermo"),
        n = new Cat("nadja");
      var mid = width() / 2;
      g.place(offLeft());
      n.place(offRight());
      return Promise.all([g.walkTo(mid - 100 * SCALE - 4, 65), n.walkTo(mid + 4, 62)])
        .then(function () {
          g.pose("sit");
          n.pose("sit");
          g.face(1);
          n.face(-1);
          return wait(1200);
        })
        .then(function () {
          g.say("♥", 2200);
          return wait(rand(3500, 5000));
        })
        .then(function () {
          return Promise.all([g.walkTo(offLeft(), 70), n.walkTo(offRight(), 70)]);
        });
    },
  };

  var WEIGHTS = { stroll: 3, visit: 3, nap: 2, chase: 1.5, meet: 1.5 };

  function randomScene() {
    var total = 0,
      k;
    for (k in WEIGHTS) total += WEIGHTS[k];
    var r = Math.random() * total;
    for (k in WEIGHTS) {
      r -= WEIGHTS[k];
      if (r <= 0) return k;
    }
    return "stroll";
  }

  // ---------------------------------------------------------------------------
  // Running, hiding
  // ---------------------------------------------------------------------------
  function cleanup() {
    if (stage) stage.remove();
    if (hideBtn) hideBtn.remove();
    stage = hideBtn = null;
    running = false;
    window.removeEventListener("resize", placeStage);
  }

  function show(name) {
    if (running) return;
    running = true;
    stage = document.createElement("div");
    stage.id = "cat-stage";
    stage.setAttribute("aria-hidden", "true");
    document.body.appendChild(stage);

    // Bottom-right corner: a short note about who they are, plus the "hide" button.
    hideBtn = document.createElement("div");
    hideBtn.className = "cats-ui";
    var note = document.createElement("span");
    note.className = "cats-note";
    note.textContent = "Yes, I have two cats! Guillermo and Nadja.";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cats-hide";
    btn.textContent = "hide the cats";
    btn.addEventListener("click", hide);
    hideBtn.appendChild(note);
    hideBtn.appendChild(btn);
    document.body.appendChild(hideBtn);
    setTimeout(function () {
      note.classList.add("is-gone");
    }, 7000);

    placeStage();
    window.addEventListener("resize", placeStage);

    var scene = SCENES[name] ? name : randomScene();
    SCENES[scene]().then(cleanup, cleanup);
  }

  function hide() {
    store("localStorage", "cats-hidden", "1");
    cleanup();
  }

  window.cats = {
    show: show,
    hide: hide,
    unhide: function () {
      store("localStorage", "cats-hidden", null);
    },
    // For tweaking the drawings: cats.draw("nadja", "sit") returns the SVG markup.
    draw: function (key, pose) {
      return drawCat(CATS[key], pose, "preview-" + key + "-" + pose);
    },
  };

  // ---------------------------------------------------------------------------
  // When to appear
  // ---------------------------------------------------------------------------
  var forced = new URLSearchParams(window.location.search).get("cats");
  if (forced !== null) {
    setTimeout(function () {
      show(forced);
    }, 600);
    return;
  }

  if (store("localStorage", "cats-hidden") === "1") return;
  var seen = parseInt(store("sessionStorage", "cats-seen") || "0", 10);
  if (seen >= 3 || Math.random() > 0.35) return;

  setTimeout(function go() {
    if (document.hidden) {
      document.addEventListener("visibilitychange", go, { once: true });
      return;
    }
    store("sessionStorage", "cats-seen", String(seen + 1));
    show();
  }, rand(12000, 30000));
})();
