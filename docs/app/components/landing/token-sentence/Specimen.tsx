import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '@/lib/utils';
import type { Resolved } from './tokens';

/*
 * Web replicas of the ten rn-neo components, drawn only from the resolved
 * tokens. The math is ported from src/components/* and src/core/hooks/styles/*:
 * hard offset shadows, a divisor of 2 on pressed/checked/selected/focused
 * states, Pressable's s/4 sink that only runs when theme.animation is on,
 * Badge's own radius="full", and the Switch geometry derived from the border.
 * Radius and border width snap on device, so they snap here too.
 */

const SYSTEM_FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/** The library's shadow: `${s}px ${s}px 0 ${shadowColor}`. */
const hard = (s: number, color: string) => `${s}px ${s}px 0 ${color}`;

/** useBorderStyles: theme border width and color, theme radius unless the component overrides it. */
function edge(t: Resolved, radius: number = t.r): CSSProperties {
  return { borderStyle: 'solid', borderWidth: t.b, borderColor: t.border, borderRadius: radius };
}

// Transitions mirror each component's transitionProperty. The duration is the
// theme's animationDuration, set on the frame as --neo-dur.
const EASE = 'duration-[var(--neo-dur)] ease-in-out motion-reduce:transition-none';
const T_PRESSABLE = `transition-[box-shadow,transform,background-color] ${EASE}`;
const T_TOGGLE = `transition-[opacity,background-color,box-shadow] ${EASE}`;
const T_THUMB = `transition-[transform,background-color] ${EASE}`;
const T_CHECKBOX = `transition-[opacity,background-color,box-shadow,transform] ${EASE}`;
const T_INPUT = `transition-[box-shadow] ${EASE}`;

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--neo-fg)]';

/** Pressable: pressIn halves the shadow and shifts by the halved shadow / 2, only with theme.animation. */
function NeoPressable({
  t,
  children,
  onPress,
  className,
  ref,
}: {
  t: Resolved;
  children: ReactNode;
  onPress: () => void;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) {
  const [pressed, setPressed] = useState(false);
  const press = (down: boolean) => setPressed(down && t.animation);
  const s = pressed ? t.s / 2 : t.s;
  const shift = pressed ? s / 2 : 0;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onPress}
      onPointerDown={() => press(true)}
      onPointerUp={() => press(false)}
      onPointerLeave={() => press(false)}
      onPointerCancel={() => press(false)}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) press(true);
      }}
      onKeyUp={() => press(false)}
      onBlur={() => press(false)}
      className={cn('block cursor-pointer touch-manipulation select-none text-center', T_PRESSABLE, FOCUS, className)}
      style={{
        ...edge(t),
        background: t.primary,
        color: t.onPrimary,
        boxShadow: hard(s, t.shadow),
        transform: `translate(${shift}px, ${shift}px)`,
        padding: '12px 18px',
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  );
}

/** Switch md (48x28): thumb is 60% of the height, padding and travel come from the border width. */
function NeoSwitch({
  t,
  value,
  onChange,
  labelledBy,
}: {
  t: Resolved;
  value: boolean;
  onChange: (value: boolean) => void;
  labelledBy: string;
}) {
  const width = 48;
  const height = 28;
  const thumb = height * 0.6;
  const pad = (height - thumb - t.b * 2) * 0.5;
  const travel = width - t.b * 2 - pad * 2 - thumb;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!value)}
      className={cn(
        'flex shrink-0 cursor-pointer flex-col justify-center overflow-hidden',
        t.animation && T_TOGGLE,
        FOCUS,
      )}
      style={{
        ...edge(t),
        width,
        height,
        padding: pad,
        background: value ? t.primary : t.muted,
        boxShadow: hard(value ? t.s / 2 : t.s, t.shadow),
      }}
    >
      <span
        aria-hidden
        className={cn('block', t.animation && T_THUMB)}
        style={{
          width: thumb,
          height: thumb,
          borderRadius: Math.max(0, t.r - pad),
          background: t.onPrimary,
          transform: `translateX(${value ? travel : 0}px)`,
        }}
      />
    </button>
  );
}

/** Radio md: 22px box with padding md, so a 6px dot whose radius scales r / 22. The dot snaps. */
function NeoRadio({
  t,
  selected,
  onSelect,
  onKeyDown,
  ref,
  children,
}: {
  t: Resolved;
  selected: boolean;
  onSelect: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
}) {
  const size = 22;
  const inner = size - 8 * 2;

  return (
    <label className="inline-flex min-h-6 cursor-pointer items-center gap-2.5">
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        tabIndex={selected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className={cn('grid shrink-0 cursor-pointer place-items-center overflow-hidden', t.animation && T_TOGGLE, FOCUS)}
        style={{
          ...edge(t),
          width: size,
          height: size,
          background: selected ? t.primary : t.surface,
          boxShadow: hard(selected ? t.s / 2 : t.s, t.shadow),
        }}
      >
        <span
          aria-hidden
          className="block"
          style={{
            width: inner,
            height: inner,
            borderRadius: (t.r / size) * inner,
            background: selected ? t.onPrimary : 'transparent',
            transform: `scale(${selected ? 1 : 0})`,
          }}
        />
      </button>
      {children}
    </label>
  );
}

/** Checkbox md: checked or pressed halves the shadow; pressing shifts by that halved shadow (not gated on animation). */
function NeoCheckbox({
  t,
  checked,
  onChange,
  children,
}: {
  t: Resolved;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  const [pressed, setPressed] = useState(false);
  const s = checked || pressed ? t.s / 2 : t.s;
  const shift = pressed ? s : 0;

  return (
    <label className="flex min-h-6 cursor-pointer items-center gap-2.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onKeyDown={(e) => {
          if (e.key === ' ' && !e.repeat) setPressed(true);
        }}
        onKeyUp={() => setPressed(false)}
        onBlur={() => setPressed(false)}
        className={cn('grid shrink-0 cursor-pointer touch-manipulation place-items-center', t.animation && T_CHECKBOX, FOCUS)}
        style={{
          ...edge(t),
          width: 22,
          height: 22,
          background: checked ? t.primary : t.surface,
          boxShadow: hard(s, t.shadow),
          transform: `translate(${shift}px, ${shift}px)`,
        }}
      >
        {checked && (
          <svg aria-hidden viewBox="0 0 16 16" width={15} height={15}>
            <path
              d="M2.75 8.5 6.25 12l7-8"
              fill="none"
              stroke={t.onPrimary}
              strokeWidth={2.6}
              strokeLinecap="square"
            />
          </svg>
        )}
      </button>
      {children}
    </label>
  );
}

const PLANS = ['Solo', 'Team'] as const;

export function Specimen({
  t,
  dark,
  onDarkChange,
  className,
}: {
  t: Resolved;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [plan, setPlan] = useState<(typeof PLANS)[number]>('Solo');
  const [notes, setNotes] = useState(true);
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wasOpen = useRef(false);

  // Focus the dialog's action on open; hand focus back to the trigger on close.
  useEffect(() => {
    if (open) doneRef.current?.focus();
    else if (wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const onRadioKey = (index: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (index + dir + PLANS.length) % PLANS.length;
    setPlan(PLANS[next]);
    radioRefs.current[next]?.focus();
  };

  // aria-modal: keep Tab inside the dialog, Escape closes it.
  const onDialogKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === 'Tab') {
      const items = e.currentTarget.querySelectorAll<HTMLElement>('button, [href], input');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  const label = { fontSize: 14, lineHeight: '18px', color: t.onSurface } satisfies CSSProperties;

  return (
    <div
      role="group"
      aria-label="Live preview: a sign-up screen built from all ten rn-neo components"
      className={cn(
        'relative w-[calc(100%-12px)] overflow-hidden border-2 border-border shadow-[12px_12px_0_0_var(--border)]',
        className,
      )}
      style={
        {
          background: t.background,
          color: t.onBackground,
          fontFamily: SYSTEM_FONT,
          '--neo-dur': `${t.duration}ms`,
          '--neo-fg': t.onBackground,
          '--neo-muted': t.muted,
        } as CSSProperties
      }
    >
      {/* Box: the screen */}
      <div inert={open} className="p-[18px] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {/* Text fontSize 2xl, bold */}
            <p style={{ fontSize: 24, lineHeight: '28px', fontWeight: 700 }}>Sign up</p>
            <p className="mt-1" style={{ fontSize: 14, lineHeight: '18px' }}>
              Pick a plan. You can change it later.
            </p>
          </div>
          {/* Badge: radius defaults to full, border follows the theme, no shadow */}
          <span
            className="inline-flex shrink-0 items-center"
            style={{
              ...edge(t, 9999),
              background: t.primary,
              color: t.onPrimary,
              padding: '4px 8px',
              fontSize: 14,
              lineHeight: '17px',
            }}
          >
            Beta
          </span>
        </div>

        {/* Card: surface, border and shadow on */}
        <div
          className="mt-5 grid gap-4"
          style={{
            ...edge(t),
            background: t.surface,
            color: t.onSurface,
            boxShadow: hard(t.s, t.shadow),
            padding: 18,
          }}
        >
          <div className="grid gap-2">
            <label htmlFor={`${id}-email`} style={{ ...label, fontWeight: 600 }}>
              Email
            </label>
            {/* Input: transparent background, shadow halves while focused */}
            <input
              id={`${id}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="you@studio.dev"
              autoComplete="off"
              spellCheck={false}
              className={cn(
                'block w-full min-w-0 bg-transparent placeholder:text-[color:var(--neo-muted)]',
                T_INPUT,
                FOCUS,
              )}
              style={{
                ...edge(t),
                color: t.onBackground,
                caretColor: t.onBackground,
                boxShadow: hard(focused ? t.s / 2 : t.s, t.shadow),
                padding: 8,
                fontSize: 16,
                lineHeight: '20px',
              }}
            />
          </div>

          <div className="grid gap-2">
            <span id={`${id}-plan`} style={{ ...label, fontWeight: 600 }}>
              Plan
            </span>
            <div role="radiogroup" aria-labelledby={`${id}-plan`} className="flex gap-6" style={label}>
              {PLANS.map((p, i) => (
                <NeoRadio
                  key={p}
                  t={t}
                  selected={plan === p}
                  onSelect={() => setPlan(p)}
                  onKeyDown={onRadioKey(i)}
                  ref={(el) => {
                    radioRefs.current[i] = el;
                  }}
                >
                  {p}
                </NeoRadio>
              ))}
            </div>
          </div>

          <div style={label}>
            <NeoCheckbox t={t} checked={notes} onChange={setNotes}>
              Email me release notes
            </NeoCheckbox>
          </div>

          <div className="flex items-center justify-between gap-3" style={label}>
            <span id={`${id}-dark`}>Dark mode</span>
            <NeoSwitch t={t} value={dark} onChange={onDarkChange} labelledBy={`${id}-dark`} />
          </div>
        </div>

        {/* Pressable + Text color="onPrimary" */}
        <NeoPressable t={t} ref={triggerRef} onPress={() => setOpen(true)} className="mt-6 w-full">
          Create account
        </NeoPressable>
      </div>

      {/* Dialog: drawn inside the frame, fades like Modal animationType="fade" */}
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 animate-in fade-in duration-200 motion-reduce:animate-none">
          <div aria-hidden className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-dialog-title`}
            aria-describedby={`${id}-dialog-body`}
            onKeyDown={onDialogKey}
            className="relative w-full max-w-[420px]"
            style={{
              ...edge(t),
              background: t.surface,
              color: t.onSurface,
              boxShadow: hard(t.s, t.shadow),
              padding: 18,
            }}
          >
            <p id={`${id}-dialog-title`} style={{ fontSize: 20, lineHeight: '24px', fontWeight: 700, marginBottom: 12 }}>
              You&rsquo;re in
            </p>
            <p id={`${id}-dialog-body`} className="text-pretty" style={{ fontSize: 14, lineHeight: '20px' }}>
              We sent a confirmation link to {email.trim() || 'your inbox'}. The {plan.toLowerCase()} plan
              is ready when you are.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <NeoPressable t={t} ref={doneRef} onPress={() => setOpen(false)}>
                Done
              </NeoPressable>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
