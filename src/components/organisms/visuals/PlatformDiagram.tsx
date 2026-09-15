import s from './Visuals.module.scss';

/** Relative "maturity" bars on each sub-app, transcribed from the design. */
const APPS = [
  { name: 'app 1', width: 70 },
  { name: 'app 2', width: 55 },
  { name: 'app 3', width: 80 },
  { name: 'app 4', width: 60 },
  { name: 'app 5', width: 75 },
  { name: 'app 6', width: 50 },
];

/** One host application carrying infra, seven sub-apps, one shared library. */
export function PlatformDiagram() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.hostGroup}>
        <div className={s.hostBar}>
          <span className={s.hostTitle}>host application</span>
          <span className={s.hostDetail}>infra · auth · routing · theme</span>
        </div>

        <div className={s.ticks}>
          <span className={s.tickLine} />
          <span className={s.tickStrong} />
          <span className={s.tickLine} />
        </div>

        <div className={s.appGrid}>
          {APPS.map((app) => (
            <div key={app.name} className={s.appCell}>
              <span className={s.appName}>{app.name}</span>
              <span className={s.appBar} style={{ width: `${app.width}%` }} />
            </div>
          ))}

          <div className={s.appCellWide}>
            <span className={s.appNameAccent}>app 7 · client-facing</span>
            <span className={s.widgetRow}>
              {['widget', 'widget', 'widget'].map((label, i) => (
                <span key={i} className={s.widget}>
                  {label}
                </span>
              ))}
            </span>
            <span className={s.appNote}>federated modules</span>
          </div>
        </div>
      </div>

      <div className={s.libBar}>
        <span className={s.libTitle}>shared component library</span>
        <span className={s.libChips}>
          {['atoms', 'molecules', 'organisms'].map((label) => (
            <span key={label} className={s.libChip}>
              {label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
