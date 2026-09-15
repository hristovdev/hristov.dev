import { Fragment } from 'react';
import s from './Visuals.module.scss';

type Station = {
  name: string;
  value: string;
  unit: string;
  bars: readonly number[];
  bottleneck?: boolean;
};

/** Values transcribed from the design prototype. */
const STATIONS: readonly Station[] = [
  { name: 'cut 01', value: '92', unit: '%', bars: [60, 80, 45, 90] },
  { name: 'press 07', value: '78', unit: '%', bars: [50, 35, 70, 55] },
  { name: 'weld 12', value: '64', unit: '%', bars: [40, 65, 30, 50], bottleneck: true },
  { name: 'pack 04', value: '88', unit: '%', bars: [75, 60, 85, 70] },
];

const TILES = [
  { label: 'OEE', value: '64', unit: '%' },
  { label: 'CYCLE', value: '42', unit: 's' },
  { label: 'STOPS', value: '3', unit: '' },
] as const;

const OUTPUT = [48, 61, 44, 72, 39, 83, 57, 91, 52, 78, 63, 70];
const PEAK = Math.max(...OUTPUT);

/** Station-by-station view of a line, with the bottleneck drilled down. */
export function LineFlow() {
  return (
    <div className={s.stage} aria-hidden="true">
      <span className={s.label}>PRODUCTION LINE 3 · STATION FLOW</span>

      <div className={s.flow}>
        {STATIONS.map((station, index) => (
          <Fragment key={station.name}>
            {index > 0 ? (
              <span className={STATIONS[index]?.bottleneck ? s.arrowAccent : s.arrow}>→</span>
            ) : null}
            <div className={`${s.station} ${station.bottleneck ? s.stationActive : ''}`}>
              <span className={s.stationName}>{station.name}</span>
              <span className={s.stat}>
                {station.value}
                <span className={s.statUnit}>{station.unit}</span>
              </span>
              <span className={s.spark}>
                {station.bars.map((height, i) => (
                  <span key={i} className={s.sparkBar} style={{ height: `${height}%` }} />
                ))}
              </span>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={s.dash}>
        <div className={s.dashHead}>
          <span className={s.labelAccent}>WELD 12 · STATION DASHBOARD</span>
          <span className={s.dashNote}>bottleneck</span>
        </div>

        <div className={s.dashTiles}>
          {TILES.map((tile) => (
            <div key={tile.label} className={s.dashTile}>
              <span className={s.label}>{tile.label}</span>
              <span className={s.dashValue}>
                {tile.value}
                {tile.unit ? <span className={s.dashUnit}>{tile.unit}</span> : null}
              </span>
            </div>
          ))}
        </div>

        <div className={s.outputChart}>
          {OUTPUT.map((value, i) => (
            <span
              key={i}
              className={`${s.outputBar} ${value === PEAK ? s.outputBarPeak : ''}`}
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
