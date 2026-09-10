import styles from './CodeWatermark.module.css';

/**
 * Three columns of real code drifting behind the hero at very low opacity.
 *
 * Each column's content is repeated twice so the -50% translate loops
 * seamlessly. Hidden below 900px and under reduced-motion.
 */

const QUERY_COLUMN = `const { data, isPending } = useQuery({
  queryKey: ['stations', plantId],
  queryFn: () => api.stations(plantId),
  staleTime: 30_000,
  select: (rows) => rows.filter(r => r.active),
});

const columnDefs: ColDef<Station>[] = [
  { field: 'code', pinned: 'left', width: 96 },
  { field: 'oee', valueFormatter: pct, sort: 'desc' },
  { field: 'cycle', headerName: 'Cycle (s)' },
  { field: 'stops', cellRenderer: StopsCell },
];

export function StationGrid({ plantId }: Props) {
  if (isPending) return <GridSkeleton rows={12} />;
  return <AgGridReact rowData={data} columnDefs={columnDefs} />;
}
`;

const TEST_COLUMN = `test('operator can drill into a station', async ({ page }) => {
  await page.goto('/lines/A3');
  await page.getByRole('button', { name: 'Press 07' }).click();
  await expect(page.getByTestId('oee')).toHaveText('62%');
});

describe('formatCycle', () => {
  it('rounds to one decimal', () => {
    expect(formatCycle(12.34)).toBe('12.3s');
  });

  it('falls back when the feed drops', () => {
    expect(formatCycle(undefined)).toBe('—');
  });
});
`;

const CONFIG_COLUMN = `export default defineConfig({
  source: { entry: { index: './src/index.tsx' } },
  output: { target: 'web', distPath: { root: 'dist' } },
  performance: { chunkSplit: { strategy: 'split-by-experience' } },
});

const theme = createTheme({
  palette: { mode, primary: { main: '#ff3650' } },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none' } },
    },
  },
});
`;

const COLUMNS = [QUERY_COLUMN, TEST_COLUMN, CONFIG_COLUMN];

export function CodeWatermark() {
  return (
    <div className={styles.outer} aria-hidden="true">
      <div className={styles.inner}>
        {COLUMNS.map((code, index) => (
          <div key={index} className={styles.column}>
            <div className={styles.scroll}>
              <pre className={styles.code}>{code}</pre>
              <pre className={styles.code}>{code}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
