import React from "react";
import "./ProductVisuals.css";
import { OTT_RAINBOW } from "../productThemes";

/* ── Products scroll panel mockups ── */
export function PanelVisual({ id, accent, accent2, accent3 }) {
  if (id === 1) return (
    <div className="pv pv--vpn">
      <div className="pv__vpn-grid" />
      <div className="pv__vpn-phone">
        <div className="pv__vpn-notch" />
        <div className="pv__vpn-screen">
          <div className="pv__vpn-appbar">BYPASS365 VPN</div>
          <div className="pv__vpn-status">● NOT PROTECTED</div>
          <div className="pv__vpn-connect">
            <div className="pv__vpn-ring" />
            <span>⚡</span>
            <small>Tap to Connect</small>
          </div>
          <div className="pv__vpn-ip">
            <span>YOUR IP ADDRESS</span>
            <strong>103.21.58.142</strong>
            <em>📍 India • Exposed</em>
          </div>
        </div>
      </div>
      <div className="pv__vpn-badge" style={{ borderColor: accent + "55", color: accent2 }}>
        8 SERVERS • 4 CONTINENTS
      </div>
    </div>
  );

  if (id === 4) return (
    <div className="pv pv--ott">
      <div className="pv__ott-glow" style={{ background: `radial-gradient(circle, rgba(168,85,247,0.35), rgba(59,130,246,0.15) 50%, transparent 70%)` }} />
      <div className="pv__ott-screen">
        <div className="pv__ott-hero-bar" style={{ background: OTT_RAINBOW }}>
          <span>DRAMA</span>
        </div>
        <div className="pv__ott-hero-title">Hearts & Shadows</div>
        <div className="pv__ott-hero-meta">Drama • Romance • HD</div>
      </div>
      <div className="pv__ott-row">
        {[
          { name: "Romance", color: "#ec4899", emoji: "💔" },
          { name: "Family", color: "#f59e0b", emoji: "👨‍👩‍👧" },
          { name: "Thriller", color: "#6366f1", emoji: "🌙" },
          { name: "Classic", color: "#a855f7", emoji: "🎭" },
        ].map((p, i) => (
          <div key={i} className="pv__ott-card" style={{ borderColor: p.color + "55" }}>
            <div className="pv__ott-poster" style={{ background: `linear-gradient(160deg, ${p.color}cc, ${p.color}44)` }}>
              <span>{p.emoji}</span>
              <div className="pv__ott-play" style={{ background: OTT_RAINBOW }}>▶</div>
            </div>
            <span>{p.name}</span>
          </div>
        ))}
      </div>
      <div className="pv__ott-badge" style={{ color: accent2, borderColor: accent + "55" }}>Drama Series • HD • Binge Watch</div>
    </div>
  );

  if (id === 5) return (
    <div className="pv pv--quiz">
      <div className="pv__quiz-timer" style={{ borderColor: accent + "55", color: accent }}>
        ⏱ 00:28 <span>Q 7/10</span>
      </div>
      <div className="pv__quiz-podium">
        {[
          { rank: 2, name: "Alex", score: "8,420", h: "60%" },
          { rank: 1, name: "You", score: "9,150", h: "80%" },
          { rank: 3, name: "Sam", score: "7,890", h: "45%" },
        ].map((p, i) => (
          <div key={i} className="pv__quiz-bar-wrap">
            <div className="pv__quiz-bar" style={{ height: p.h, background: `linear-gradient(180deg, ${accent}, ${accent2})` }}>
              <span>{p.rank === 1 ? "👑" : p.rank}</span>
            </div>
            <strong>{p.name}</strong>
            <small>{p.score}</small>
          </div>
        ))}
      </div>
      <div className="pv__quiz-prize" style={{ color: accent2, borderColor: accent + "44" }}>📱 1st Place Wins iPhone</div>
    </div>
  );

  return null;
}

/* ── Modal hero mockups (larger) ── */
export function ModalVisual({ id, accent, accent2, accent3 }) {
  if (id === 1) return (
    <div className="pmv pmv--vpn">
      <div className="pmv__vpn-grid" />
      <div className="pmv__vpn-stars" />
      <div className="pmv__vpn-wrap">
        <div className="pmv__vpn-phone">
          <div className="pmv__vpn-notch" />
          <div className="pmv__vpn-screen">
            <div className="pmv__vpn-appbar">
              <span className="pmv__vpn-logo" style={{ background: `linear-gradient(135deg, ${accent}, ${accent3})` }}>⚡</span>
              BYPASS365 VPN
            </div>
            <div className="pmv__vpn-pill">● NOT PROTECTED</div>
            <div className="pmv__vpn-connect">
              <div className="pmv__vpn-ring pmv__vpn-ring--1" style={{ borderColor: accent + "66" }} />
              <div className="pmv__vpn-ring pmv__vpn-ring--2" style={{ borderColor: accent3 + "44" }} />
              <div className="pmv__vpn-btn" style={{ background: `linear-gradient(135deg, ${accent}, ${accent3})` }}>⚡</div>
              <small>Tap to Connect</small>
            </div>
            <div className="pmv__vpn-ip">
              <span>YOUR IP ADDRESS</span>
              <strong>103.21.58.142</strong>
              <em>📍 India • Exposed</em>
            </div>
          </div>
        </div>
        <div className="pmv__vpn-chips">
          {["AES-256", "WireGuard", "Kill Switch", "Zero Logs"].map((c, i) => (
            <span key={i} style={{ borderColor: accent + "44", color: accent2 }}>{c}</span>
          ))}
        </div>
      </div>
      <div className="pmv__vpn-badge" style={{ borderColor: accent + "55", color: accent2 }}>
        ● 8 SERVERS • 4 CONTINENTS • WINDOWS & ANDROID
      </div>
    </div>
  );

  if (id === 4) return (
    <div className="pmv pmv--ott">
      <div className="pmv__ott-glow" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.3), rgba(59,130,246,0.12) 55%, transparent 70%)` }} />
      <div className="pmv__ott-layout">
        <div className="pmv__ott-featured" style={{ background: `linear-gradient(135deg, rgba(239,68,68,0.55) 0%, rgba(245,158,11,0.45) 25%, rgba(34,197,94,0.4) 50%, rgba(59,130,246,0.45) 75%, rgba(168,85,247,0.5) 100%)` }}>
          <span className="pmv__ott-now" style={{ background: OTT_RAINBOW }}>DRAMA</span>
          <h4>Hearts & Shadows</h4>
          <p>Drama • Romance • Emotional Story</p>
          <div className="pmv__ott-progress"><div style={{ width: "38%", background: OTT_RAINBOW }} /></div>
        </div>
        <div className="pmv__ott-strip">
          {[
            { name: "Romance", emoji: "💔", color: "#ec4899" },
            { name: "Family", emoji: "👨‍👩‍👧", color: "#f59e0b" },
            { name: "Thriller", emoji: "🌙", color: "#6366f1" },
            { name: "Classic", emoji: "🎭", color: "#a855f7" },
          ].map((n, i) => (
            <div key={i} className="pmv__ott-tile" style={{ borderColor: n.color + "55" }}>
              <div className="pmv__ott-tile-bg" style={{ background: `linear-gradient(135deg, ${n.color}88, ${n.color}22)` }} />
              <span>{n.emoji}</span>
              <small>{n.name}</small>
              <div className="pmv__ott-tile-play" style={{ background: OTT_RAINBOW }}>▶</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pmv__ott-badge" style={{ color: accent2, borderColor: accent + "55" }}>Drama Series • HD Streaming • Binge Watch</div>
    </div>
  );

  if (id === 5) return (
    <div className="pmv pmv--quiz">
      <div className="pmv__quiz-glow" style={{ background: `radial-gradient(circle, ${accent}22, transparent 70%)` }} />
      <div className="pmv__quiz-board">
        <div className="pmv__quiz-q" style={{ borderColor: accent + "44" }}>
          <span style={{ color: accent }}>QUESTION 7</span>
          <p>Which planet is known as the Red Planet?</p>
          <div className="pmv__quiz-options">
            {["Venus", "Mars ✓", "Jupiter", "Saturn"].map((o, i) => (
              <div key={i} className={i === 1 ? "pmv__quiz-opt pmv__quiz-opt--correct" : "pmv__quiz-opt"} style={i === 1 ? { borderColor: accent, background: accent + "18" } : {}}>{o}</div>
            ))}
          </div>
        </div>
        <div className="pmv__quiz-rank" style={{ borderColor: accent3 + "44" }}>
          <h5 style={{ color: accent2 }}>🏆 Live Leaderboard</h5>
          {[["🥇", "You", "9,150"], ["🥈", "Alex", "8,420"], ["🥉", "Sam", "7,890"]].map(([medal, name, score], i) => (
            <div key={i} className="pmv__quiz-row"><span>{medal}</span><span>{name}</span><strong style={{ color: accent }}>{score}</strong></div>
          ))}
        </div>
      </div>
      <div className="pmv__quiz-badge" style={{ color: accent2, borderColor: accent + "44" }}>📱 1st Place Wins iPhone • 300+ Questions</div>
    </div>
  );

  return null;
}
