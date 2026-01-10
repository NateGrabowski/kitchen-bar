#!/usr/bin/env python3
"""
Kitchen Bar Build Manual - HTML to PDF Converter

Uses Playwright/Chromium for high-quality PDF generation with:
- Proper page numbers via CSS counters
- Headers and footers via @page rules
- High-quality SVG vector rendering
- Letter size pages with appropriate margins

Usage:
    python convert-to-pdf.py                    # Convert default HTML
    python convert-to-pdf.py input.html         # Convert specific HTML file
    python convert-to-pdf.py input.html out.pdf # Specify output path

Requirements:
    pip install playwright
    python -m playwright install chromium
"""

import sys
import asyncio
from pathlib import Path
from datetime import datetime

def check_dependencies():
    """Check if Playwright is available."""
    try:
        from importlib.metadata import version
        playwright_version = version('playwright')
        return playwright_version
    except ImportError:
        print("ERROR: Playwright is not installed.")
        print("Install it with:")
        print("  pip install playwright")
        print("  python -m playwright install chromium")
        sys.exit(1)

async def convert_html_to_pdf_async(html_path: Path, pdf_path: Path) -> bool:
    """
    Convert HTML file to PDF using Playwright/Chromium.

    Args:
        html_path: Path to input HTML file
        pdf_path: Path to output PDF file

    Returns:
        True if successful, False otherwise
    """
    from playwright.async_api import async_playwright

    print(f"Converting: {html_path}")
    print(f"Output:     {pdf_path}")
    print("-" * 50)

    try:
        print("Launching Chromium browser...")
        start_time = datetime.now()

        async with async_playwright() as p:
            # Launch headless Chromium
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            # Navigate to the HTML file
            file_url = html_path.as_uri()
            print(f"Loading HTML: {file_url}")
            await page.goto(file_url, wait_until='networkidle')

            # Wait for any fonts/images to load
            await page.wait_for_timeout(1000)

            print("Generating PDF (this may take a minute for large documents)...")

            # Generate PDF with print-quality settings
            # Note: Chromium uses @page CSS rules from the HTML for margins,
            # headers, and footers when preferCSSPageSize is True
            await page.pdf(
                path=str(pdf_path),
                format='Letter',
                print_background=True,
                prefer_css_page_size=True,  # Use @page { size: } from CSS
                margin={
                    'top': '0.75in',
                    'right': '0.75in',
                    'bottom': '1in',
                    'left': '0.75in'
                },
                # Header template (shown on each page)
                display_header_footer=True,
                header_template='''
                    <div style="font-size: 9px; color: #666; font-family: Georgia, serif;
                                width: 100%; text-align: center; padding-top: 5px;">
                        Kitchen Bar Cabinet - Build Manual
                    </div>
                ''',
                # Footer template with page numbers
                footer_template='''
                    <div style="font-size: 9px; color: #333; font-family: Arial, sans-serif;
                                width: 100%; text-align: center; padding-bottom: 5px;">
                        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
                    </div>
                ''',
            )

            await browser.close()

        elapsed = (datetime.now() - start_time).total_seconds()
        file_size = pdf_path.stat().st_size / 1024 / 1024  # MB

        print(f"\nSuccess!")
        print(f"  Time:      {elapsed:.1f} seconds")
        print(f"  File size: {file_size:.2f} MB")
        print(f"  Output:    {pdf_path}")

        return True

    except Exception as e:
        print(f"\nERROR: PDF generation failed")
        print(f"  {type(e).__name__}: {e}")

        # Provide helpful hints for common errors
        if "browser" in str(e).lower() or "chromium" in str(e).lower():
            print("\nHint: Browser error. Try reinstalling Chromium:")
            print("  python -m playwright install chromium")
        elif "permission" in str(e).lower():
            print("\nHint: Permission error. Close any PDF viewers that have the file open.")
        elif "timeout" in str(e).lower():
            print("\nHint: Timeout error. The HTML may be too complex or have missing resources.")

        return False

def convert_html_to_pdf(html_path: Path, pdf_path: Path) -> bool:
    """Synchronous wrapper for async PDF conversion."""
    return asyncio.run(convert_html_to_pdf_async(html_path, pdf_path))

def main():
    """Main entry point."""
    print("=" * 50)
    print("Kitchen Bar Build Manual - PDF Converter")
    print("=" * 50)

    # Check dependencies
    version = check_dependencies()
    print(f"Playwright version: {version}")
    print("Renderer: Chromium (headless)\n")

    # Determine paths
    script_dir = Path(__file__).parent
    publication_dir = script_dir / "publication"

    # Default input/output paths
    default_html = publication_dir / "kitchen-bar-build-manual.html"
    default_pdf = publication_dir / "kitchen-bar-build-manual.pdf"

    # Parse command line arguments
    if len(sys.argv) >= 2:
        html_path = Path(sys.argv[1]).resolve()
    else:
        html_path = default_html

    if len(sys.argv) >= 3:
        pdf_path = Path(sys.argv[2]).resolve()
    else:
        # Put PDF next to HTML file
        pdf_path = html_path.with_suffix('.pdf')

    # Validate input file
    if not html_path.exists():
        print(f"ERROR: HTML file not found: {html_path}")
        print("\nDid you run build-pdf.py first to generate the HTML?")
        print("  python build-pdf.py")
        sys.exit(1)

    # Ensure output directory exists
    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    # Convert
    success = convert_html_to_pdf(html_path, pdf_path)

    if success:
        print("\n" + "=" * 50)
        print("PDF generation complete!")
        print("=" * 50)
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
