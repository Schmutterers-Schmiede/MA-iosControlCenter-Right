export const PROTOTYPE_URLS: Record<string, string> = {
  amazon_nav_baseline: 'https://you.github.io/amazon-nav/?variant=baseline',
  amazon_nav_variant:  'https://you.github.io/amazon-nav/?variant=lefthand',
  settings_baseline:   'https://you.github.io/settings/?variant=baseline',
  settings_variant:    'https://you.github.io/settings/?variant=lefthand',
  control_center_baseline: 'https://schmutterers-schmiede.github.io/MA-iosControlCenter-Right/',
  control_center_variant:  'https://you.github.io/control-center/?variant=lefthand',
  onehand_baseline:    'https://you.github.io/onehand/?variant=baseline',
  onehand_variant:     'https://you.github.io/onehand/?variant=lefthand',
};

export const INSTRUCTIONS: Record<string, { title: string; text: string }> = {
  control_center: {
    title: "Control Center",
    text: "Try opening the control panel and toggling one setting. When you're done, tap 'Rate this' below.",
  },
  settings: {
    title: "Settings Menu",
    text: "Try toggling a few of the settings shown. When you're done, tap 'Rate this' below.",
  },
  amazon_nav: {
    title: "App Navigation",
    text: "Try navigating between two different sections using the menu. When you're done, tap 'Rate this' below.",
  },
  onehand: {
    title: "One-Handed Mode",
    text: "Try using the interface as you normally would with one hand. When you're done, tap 'Rate this' below.",
  },
};

export function getContext() {
  const params = new URLSearchParams(window.location.search);
  const pid = params.get('pid') ?? '';
  const order = (params.get('order') ?? '').split(',');
  const step = parseInt(params.get('step') ?? '0', 10);
  const pairIndex = Math.floor(step / 2);
  const isVariant = step % 2 === 1;
  const pair = order[pairIndex];
  return { pid, order, step, pair, isVariant };
}

export function nextUrl(ctx: ReturnType<typeof getContext>) {
  const nextStep = ctx.step + 1;
  if (nextStep >= 8) return `https://tally.so/r/FINAL_FORM_ID?pid=${ctx.pid}`;
  const nextPairIndex = Math.floor(nextStep / 2);
  const nextIsVariant = nextStep % 2 === 1;
  const nextPair = ctx.order[nextPairIndex];
  const key = `${nextPair}_${nextIsVariant ? 'variant' : 'baseline'}`;
  const base = PROTOTYPE_URLS[key];
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}pid=${ctx.pid}&order=${ctx.order.join(',')}&step=${nextStep}`;
}