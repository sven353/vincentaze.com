"""Generates the logo vector assets (SVG, PNG, favicons) and src/data/logo.ts.
Run: python3 brand/build/make_logo.py   (needs fonttools, pillow, playwright)
Wordmark letters are outlined from Montserrat (SIL OFL) so the SVGs need no font."""
import json, os, io
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONT = "/usr/share/fonts/truetype/google-fonts/ofl/montserrat/Montserrat[wght].ttf"
NAVY, GOLD, NEAR, GREY = "#151719", "#F2AD38", "#E8E5DF", "#C4C0B9"  # charcoal, amber, bone, fog (v6 palette)

def outline(text, wght, size, track=0.0):
    f = instancer.instantiateVariableFont(TTFont(FONT), {"wght": wght})
    gs, cmap, upm = f.getGlyphSet(), f.getBestCmap(), f["head"].unitsPerEm
    s = size / upm
    x = 0.0
    parts = []
    for ch in text:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, 0)))
        parts.append(pen.getCommands())
        x += gs[g].width * s + track * size
    return " ".join(p for p in parts if p), x - track * size

# Monogram, coordinates traced from concept 1 and rebuilt as clean geometry (origin shifted to 0,0)
dx, dy = 305, 335
def P(pts): return "M" + " L".join(f"{x-dx},{y-dy}" for x, y in pts) + "Z"
V = P([(305,335),(390,335),(492,553),(595,335),(680,335),(515,685),(470,685)])
A = P([(578,685),(745,335),(773,335),(940,685),(850,685),(759,494),(668,685)])
ARC = f"M{420-dx},{632-dy} Q{667-dx},{404-dy} {915-dx},{628-dy} Q{667-dx},{450-dy} {420-dx},{632-dy}Z"
MW, MH = 640, 353

name_d, name_w = outline("Vincent Azé", 600, 100, 0.02)
desc_d, desc_w = outline("Expert in difficult conversations", 400, 100, 0.03)

def mono_g(uid, ink, gap=14):
    return (f'<defs><mask id="{uid}" maskUnits="userSpaceOnUse" x="-40" y="-40" width="{MW+80}" height="{MH+80}">'
            f'<rect x="-40" y="-40" width="{MW+80}" height="{MH+80}" fill="#fff"/>'
            f'<path d="{ARC}" fill="#000" stroke="#000" stroke-width="{gap}" stroke-linejoin="round"/></mask></defs>'
            f'<g mask="url(#{uid})" fill="{ink}"><path d="{V}"/><path d="{A}"/></g>'
            f'<path d="{ARC}" fill="{GOLD}"/>')

def svg(w, h, body, title):
    pad = 0 if title == "Vincent Azé" and w == 64 else 30
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {-pad} {w+2*pad:.0f} {h+2*pad:.0f}" width="{w+2*pad:.0f}" height="{h+2*pad:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')

# Horizontal lockup: monogram left, wordmark right (cap height tuned to monogram)
SC = 1.5  # wordmark scale relative to the 100 unit outline
def horizontal(ink, uid, descriptor=False, gold=True):
    nw = name_w * SC
    pad = 48
    h = MH
    body = mono_g(uid, ink)
    tx = MW + pad
    ty = MH * (0.55 if descriptor else 0.65)
    body += f'<path transform="translate({tx},{ty}) scale({SC})" d="{name_d}" fill="{ink}"/>'
    width = tx + nw
    if descriptor:
        dsc = 0.62
        body += f'<path transform="translate({tx+2},{MH*0.92}) scale({dsc})" d="{desc_d}" fill="{ink}" opacity=".78"/>'
        width = max(width, tx + desc_w * dsc)
    return width, h, body

def stacked(ink, uid):
    nw = name_w * 0.9
    W = max(MW, nw, desc_w * 0.36)
    body = f'<g transform="translate({(W-MW)/2},0)">{mono_g(uid, ink)}</g>'
    body += f'<path transform="translate({(W-nw)/2},{MH+150}) scale(0.9)" d="{name_d}" fill="{ink}"/>'
    body += f'<path transform="translate({(W-desc_w*0.36)/2},{MH+215}) scale(0.36)" d="{desc_d}" fill="{ink}" opacity=".78"/>'
    return W, MH + 240, body

out = "brand/logo"
os.makedirs(out, exist_ok=True)
files = {}
def add(name, w, h, body, title, bg=None):
    s = svg(w, h, body, title)
    if bg: s = s.replace("</title>", f'</title><rect x="-60" y="-60" width="{w+120}" height="{h+120}" fill="{bg}"/>',1)
    files[name] = s
    open(f"{out}/{name}.svg", "w").write(s)

for tag, ink in (("on-light", NAVY), ("on-dark", NEAR)):
    w,h,b = horizontal(ink, f"m-{tag}-h"); add(f"vincent-aze-primary-{tag}", w, h, b, "Vincent Azé")
    w,h,b = horizontal(ink, f"m-{tag}-hd", True); add(f"vincent-aze-primary-descriptor-{tag}", w, h, b, "Vincent Azé, expert in difficult conversations")
    w,h,b = stacked(ink, f"m-{tag}-s"); add(f"vincent-aze-stacked-{tag}", w, h, b, "Vincent Azé, expert in difficult conversations")
    add(f"vincent-aze-monogram-{tag}", MW, MH, mono_g(f"m-{tag}-m", ink), "Vincent Azé monogram")

# single colour (monochrome): arc takes the same ink as the letters
for tag, ink in (("black", "#000000"), ("white", "#FFFFFF")):
    w,h,b = horizontal(ink, f"m-{tag}-h"); b = b.replace(GOLD, ink); add(f"vincent-aze-primary-mono-{tag}", w, h, b, "Vincent Azé")
    b = mono_g(f"m-{tag}-m", ink).replace(GOLD, ink); add(f"vincent-aze-monogram-mono-{tag}", MW, MH, b, "Vincent Azé monogram")

# Favicon: monogram on a navy rounded square
fav_body = (f'<rect width="64" height="64" rx="12" fill="{NAVY}"/>'
            f'<g transform="translate(6,{(64-MH*(52/MW))/2}) scale({52/MW})">{mono_g("fav", NEAR, 22)}</g>')
open("public/favicon.svg", "w").write(svg(64, 64, fav_body, "Vincent Azé").replace(' width="64" height="64"', ''))
files["favicon"] = svg(64, 64, fav_body, "Vincent Azé")

# logo.ts for the Astro component
open("src/data/logo.ts", "w").write("// Generated by brand/build/make_logo.py. Do not edit by hand.\n" + "export const logo = " + json.dumps({
    "mono": {"w": MW, "h": MH, "v": V, "a": A, "arc": ARC},
    "name": {"d": name_d, "w": name_w * SC, "scale": SC},
}, indent=1) + ";\n")

# PNG + ICO renders with Chromium
from playwright.sync_api import sync_playwright
def render(svg_text, w, h, path, scale=1, bg=None):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": int(w), "height": int(h)}, device_scale_factor=scale)
        pg.set_content(f'<body style="margin:0;background:{bg or "transparent"}">{svg_text.replace("<svg ", f"<svg style=\"width:{int(w)}px;height:{int(h)}px;display:block\" ",1)}</body>')
        pg.screenshot(path=path, omit_background=(bg is None)); b.close()
os.makedirs(f"{out}/png", exist_ok=True)
for name in ("vincent-aze-primary-on-light", "vincent-aze-primary-descriptor-on-light", "vincent-aze-stacked-on-light",
             "vincent-aze-monogram-on-light", "vincent-aze-primary-on-dark", "vincent-aze-primary-descriptor-on-dark",
             "vincent-aze-stacked-on-dark", "vincent-aze-monogram-on-dark", "vincent-aze-primary-mono-black",
             "vincent-aze-primary-mono-white", "vincent-aze-monogram-mono-black", "vincent-aze-monogram-mono-white"):
    s = files[name]
    import re
    m = re.search(r'viewBox="-?\d+ -?\d+ (\d+) (\d+)"', s); w, h = int(m[1]), int(m[2])
    k = 1200 / w
    render(s, w, h, f"{out}/png/{name}.png", scale=k)
render(files["favicon"], 64, 64, "public/favicon-512.png", scale=8)
render(files["favicon"], 64, 64, "public/apple-touch-icon.png", scale=180/64)
from PIL import Image
im = Image.open("public/favicon-512.png").convert("RGBA")
im.save("public/favicon.ico", sizes=[(16,16),(32,32),(48,48)])
Image.open("public/favicon-512.png").resize((32,32), Image.LANCZOS).save("public/favicon-32.png")
print("ok", len(files))
