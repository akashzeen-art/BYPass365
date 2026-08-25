import React from "react";
import { motion } from "framer-motion";
import { servers, serversMeta } from "../data";
import "./Servers.css";

function loadColor(load) {
  if (load < 40) return "#10b981";
  if (load < 60) return "#00d4ff";
  return "#f59e0b";
}

export default function Servers() {
  return (
    <section className="servers" id="servers">
      <div className="servers__orb" />
      <div className="servers__orb servers__orb--2" />

      <div className="servers__inner">
        <motion.div
          className="servers__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="servers__eyebrow">Global Network</span>
          <h2 className="servers__title">
            {serversMeta.headline.split(". ")[0]}.{" "}
            <span className="glow-text">{serversMeta.headline.split(". ")[1]}</span>
          </h2>
          <p className="servers__sub">{serversMeta.subheadline}</p>

          <div className="servers__status-bar">
            <span className="servers__status-dot" />
            <span>{serversMeta.statusLine}</span>
          </div>
        </motion.div>

        <div className="servers__grid">
          {servers.map((s, i) => {
            const color = loadColor(s.load);
            return (
              <motion.article
                key={s.id}
                className="servers__card glass"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="servers__card-top">
                  <div className="servers__card-identity">
                    <span className="servers__flag" aria-hidden>{s.flag}</span>
                    <div>
                      <h3 className="servers__name">{s.name}</h3>
                      <p className="servers__region">{s.region}</p>
                    </div>
                  </div>
                  <div className="servers__online">
                    <span className="servers__online-dot" />
                    {s.status}
                  </div>
                </div>

                <div className="servers__ping">
                  <span className="servers__ping-value" style={{ color }}>{s.ping}ms</span>
                  <span className="servers__ping-label">latency</span>
                </div>

                <div className="servers__load">
                  <div className="servers__load-meta">
                    <span>SERVER LOAD</span>
                    <strong style={{ color }}>{s.load}%</strong>
                  </div>
                  <div className="servers__load-track">
                    <motion.div
                      className="servers__load-fill"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.load}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
