/* Shared JavaScript for Madeline McCarthy portfolio */

(function() {
    'use strict';

    /* Image fallback - try alternate extensions if image fails to load */
    var allExts = ['.jpg','.jpeg','.png','.webp','.gif','.svg','.JPG','.JPEG','.PNG','.WEBP','.GIF'];
    document.querySelectorAll('img[src]').forEach(function(img) {
        var base = img.src.replace(/\.[^/.]+$/, '');
        var cur = (img.src.match(/\.[^/.]+$/) || [])[0];
        var exts = allExts.filter(function(e) { return e !== cur; });
        var i = 0;
        img.onerror = function() {
            if (i < exts.length) img.src = base + exts[i++];
        };
    });

    /* Hamburger menu - only init if elements exist (project pages and index) */
    var hdr = document.getElementById('siteHeader');
    var menuBtn = document.getElementById('hamburger');
    var menuNav = document.getElementById('headerNav');
    var mobileMenuBreakpoint = 1200;  /* match CSS breakpoint where hamburger shows */

    if (menuBtn && menuNav) {
        function isMobileMenuViewport() {
            return window.innerWidth <= mobileMenuBreakpoint;
        }

        function setMobileMenu(open) {
            menuNav.classList.toggle('open', open);
            if (hdr) hdr.classList.toggle('menu-open', open);
            document.body.classList.toggle('menu-open', open && isMobileMenuViewport());
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }

        menuBtn.addEventListener('click', function() {
            setMobileMenu(!menuNav.classList.contains('open'));
        });

        menuNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { setMobileMenu(false); });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuNav.classList.contains('open')) {
                setMobileMenu(false);
            }
        });

        document.addEventListener('click', function(e) {
            if (!menuNav.classList.contains('open') || !isMobileMenuViewport()) return;
            if (menuNav.contains(e.target) || menuBtn.contains(e.target)) return;
            setMobileMenu(false);
        });

        window.addEventListener('resize', function() {
            if (!isMobileMenuViewport() && menuNav.classList.contains('open')) {
                setMobileMenu(false);
            }
        });
    }
})();
