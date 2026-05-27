"""
Optimize PNG images in the images/ folder: resize to max width and save with optimization.
Usage: python optimize_images.py
"""
from PIL import Image
import os

IMG_DIR = "images"
MAX_WIDTH = 1200  # pixels
PNG_QUALITY = 9  # compress level for PNG (0-9)

os.makedirs(IMG_DIR, exist_ok=True)

def optimize_png(path, max_width=MAX_WIDTH, compress_level=PNG_QUALITY):
    try:
        im = Image.open(path)
        # convert palette images to RGBA
        if im.mode in ("P", "L"):
            im = im.convert("RGBA")

        # Resize if too wide
        w, h = im.size
        if w > max_width:
            new_h = int(max_width * h / w)
            im = im.resize((max_width, new_h), Image.LANCZOS)

        # Save optimized
        im.save(path, optimize=True, compress_level=compress_level)
        return True
    except Exception as e:
        print(f"Failed to optimize {path}: {e}")
        return False

def main():
    png_files = [f for f in os.listdir(IMG_DIR) if f.lower().endswith('.png')]
    if not png_files:
        print('No PNG images found in images/ to optimize.')
        return

    print(f'Found {len(png_files)} PNG files. Optimizing...')
    for fn in png_files:
        path = os.path.join(IMG_DIR, fn)
        before = os.path.getsize(path)
        ok = optimize_png(path)
        after = os.path.getsize(path) if ok else before
        saved = before - after
        pct = (saved / before * 100) if before>0 else 0
        print(f"{fn}: {before/1024:.1f} KB -> {after/1024:.1f} KB ({pct:.1f}% saved)")

if __name__ == '__main__':
    main()
