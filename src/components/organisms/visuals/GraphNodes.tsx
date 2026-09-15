import s from './Visuals.module.scss';

const LAYOUTS = ['hierarchic', 'organic', 'radial', 'tree'];

/**
 * Hierarchic layout, schematic. Nodes shrink and their borders fade from root
 * to leaves, so depth reads without any labels.
 */
export function GraphNodes() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.graph}>
        <div className={s.graphColRoot}>
          <span className={s.nodeRoot} />
        </div>

        <span className={s.edgeStrong} />

        <div className={s.graphColMid}>
          <span className={s.nodeMid} />
          <span className={s.nodeMid} />
        </div>

        <span className={s.edgeLine} />

        <div className={s.graphColLeaf}>
          <span className={s.nodeLeaf} />
          <span className={s.nodeLeaf} />
          <span className={s.nodeLeaf} />
        </div>
      </div>

      <div className={s.rowChips}>
        {LAYOUTS.map((layout, index) => (
          <span key={layout} className={index === 0 ? s.miniChipAccent : s.miniChip}>
            {layout}
          </span>
        ))}
      </div>
    </div>
  );
}
