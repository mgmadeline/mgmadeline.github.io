/* Project page specific JavaScript - slideshow, view toggle, hero padding */

(function() {
    'use strict';

    function slideshow(slides, counterEl) {
        var i = 0;
        var n = slides.length;
        function go(to) {
            i = ((to % n) + n) % n;
            for (var j = 0; j < slides.length; j++) slides[j].classList.remove('active');
            slides[i].classList.add('active');
            if (counterEl) counterEl.textContent = String(i+1).padStart(2,'0') + ' / ' + String(n).padStart(2,'0');
        }
        return { next: function() { go(i+1); }, prev: function() { go(i-1); } };
    }

    var projectSlides = document.querySelectorAll('.project-slide');
    var projectCounter = document.getElementById('projectCounter');
    var projectSS = document.getElementById('projectSS');
    var projectNext = document.getElementById('projectNext');
    var projectPrev = document.getElementById('projectPrev');

    var ss;
    if (projectSlides.length && projectCounter) {
        ss = slideshow(projectSlides, projectCounter);
        if (projectNext) projectNext.addEventListener('click', function() { ss.next(); });
        if (projectPrev) projectPrev.addEventListener('click', function() { ss.prev(); });

        document.addEventListener('keydown', function(e) {
            if (projectSS && projectSS.style.display !== 'none') {
                if (e.key === 'ArrowRight') ss.next();
                if (e.key === 'ArrowLeft') ss.prev();
            }
        });
    }

    /* View toggle - Slideshow / Gallery */
    var toggle = document.getElementById('viewToggle');
    var ssEl = document.getElementById('projectSS');
    var galEl = document.getElementById('projectGallery');
    var controlsEl = document.getElementById('toolbarControls');

    if (toggle && ssEl && galEl) {
        var btns = toggle.querySelectorAll('.view-btn');
        btns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var view = btn.getAttribute('data-view');
                btns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

                if (view === 'slideshow') {
                    ssEl.style.display = '';
                    galEl.style.display = 'none';
                    if (controlsEl) {
                        controlsEl.style.visibility = '';
                        controlsEl.style.pointerEvents = '';
                    }
                } else {
                    ssEl.style.display = 'none';
                    galEl.style.display = '';
                    if (controlsEl) {
                        controlsEl.style.visibility = 'hidden';
                        controlsEl.style.pointerEvents = 'none';
                    }
                }
            });
        });
    }

    /* Adjust hero padding for fixed header */
    var hdr = document.getElementById('siteHeader');
    var hero = document.querySelector('.project-hero');

    if (hdr && hero) {
        function adjustHeroPadding() {
            hero.style.paddingTop = (hdr.offsetHeight + 40) + 'px';
        }
        adjustHeroPadding();
        window.addEventListener('resize', adjustHeroPadding);
    }
})();
