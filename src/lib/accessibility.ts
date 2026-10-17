// Shared by the inline script in the root layout (which runs before the page
// paints) and by the React store in hooks/use-accessibility.ts.

export const ACCESSIBILITY_CLASS = "accessibility";
export const ACCESSIBILITY_KEY = "acessibilidade";
export const ZOOM_KEY = "acessibilidade-zoom";
export const ZOOM_STEPS = [100, 125, 150, 175] as const;

export type ZoomStep = (typeof ZOOM_STEPS)[number];

// Restores the mode saved in localStorage before hydration, so a reload in
// accessibility mode doesn't flash the normal theme first.
export const accessibilityInitScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem(${JSON.stringify(ACCESSIBILITY_KEY)})!=="1")return;d.classList.add(${JSON.stringify(ACCESSIBILITY_CLASS)});var z=Number(localStorage.getItem(${JSON.stringify(ZOOM_KEY)}));if(${JSON.stringify(ZOOM_STEPS.slice(1))}.indexOf(z)>-1)d.style.fontSize=z+"%";}catch(e){}})();`;
