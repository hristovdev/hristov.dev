import s from './Visuals.module.scss';

/** Representative UI for the embeddable support chat — not a client screenshot. */
export function ChatWidget() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.chat}>
        <div className={s.bubbleIn}>Where can I export last month&apos;s report?</div>
        <div className={s.bubbleOut}>Top right of the toolbar — I&apos;ll walk you through it.</div>

        <div className={s.inputRow}>
          <span className={s.inputText}>Type a message…</span>
          <span className={s.sendDot} />
        </div>

        <div className={s.chatChips}>
          {['preact', 'zero deps', 'custom events'].map((chip) => (
            <span key={chip} className={s.chatChip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
