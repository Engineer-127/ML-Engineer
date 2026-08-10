import { useEffect, useMemo, useState } from "react";

export default function GuidedLearningTrack({ title, subtitle, accent, storageKey, phases }) {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [open, setOpen] = useState(() => new Set([phases[0].id]));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(completed)), [completed, storageKey]);
  const allTasks = useMemo(() => phases.flatMap((phase) => phase.tasks), [phases]);
  const done = allTasks.filter((task) => completed[task.id]).length;
  const percent = Math.round((done / allTasks.length) * 100) || 0;
  const toggle = (id) => setCompleted((current) => ({ ...current, [id]: !current[id] }));
  const togglePhase = (id) => setOpen((current) => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const reset = () => {
    if (window.confirm(`Reset all progress for ${title}?`)) setCompleted({});
  };

  return (
    <main className="guided-track" style={{ "--track-accent": accent }}>
      <header className="guided-hero">
        <div className="guided-kicker">Interactive guided learning track</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="guided-stats">
          <strong>{percent}% complete</strong><span>{done}/{allTasks.length} tasks</span><span>{done * 25} XP</span>
        </div>
        <div className="guided-progress"><span style={{ width: `${percent}%` }} /></div>
      </header>

      <section className="guided-controls" aria-label="Track controls">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks and topics…" aria-label="Search tasks" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by completion">
          <option value="all">All tasks</option><option value="todo">To do</option><option value="done">Completed</option>
        </select>
        <button onClick={reset}>Reset progress</button>
      </section>

      {phases.map((phase) => {
        const filtered = phase.tasks.filter((task) => {
          const matchesText = `${task.title} ${task.detail} ${task.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
          return matchesText && (status === "all" || (status === "done" ? completed[task.id] : !completed[task.id]));
        });
        const phaseDone = phase.tasks.filter((task) => completed[task.id]).length;
        if (!filtered.length && (query || status !== "all")) return null;
        return (
          <section className="guided-phase" key={phase.id}>
            <button className="guided-phase-head" onClick={() => togglePhase(phase.id)} aria-expanded={open.has(phase.id)}>
              <span><small>{phase.label}</small><strong>{phase.title}</strong><em>{phase.goal}</em></span>
              <span>{phaseDone}/{phase.tasks.length} {open.has(phase.id) ? "▴" : "▾"}</span>
            </button>
            {open.has(phase.id) && <div className="guided-task-list">
              {filtered.map((task) => <article className={`guided-task ${completed[task.id] ? "is-done" : ""}`} key={task.id}>
                <button className="guided-check" onClick={() => toggle(task.id)} aria-label={`Mark ${task.title} ${completed[task.id] ? "incomplete" : "complete"}`}>{completed[task.id] ? "✓" : ""}</button>
                <div><h2>{task.title}</h2><p>{task.detail}</p><div className="guided-tags">{task.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <small>{task.time}</small>
              </article>)}
            </div>}
          </section>
        );
      })}
    </main>
  );
}
