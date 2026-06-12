/* Index page specific JavaScript - hero and featured slideshows */

(function() {
    'use strict';

    function slideshow(slides, counterEl, opts) {
        opts = opts || {};
        var i = 0;
        var n = slides.length;
        function go(to) {
            i = ((to % n) + n) % n;
            for (var j = 0; j < slides.length; j++) slides[j].classList.remove('active');
            slides[i].classList.add('active');
            if (counterEl) counterEl.textContent = String(i+1).padStart(2,'0') + ' / ' + String(n).padStart(2,'0');
            if (opts.onUpdate) opts.onUpdate(i);
        }
        return { next: function() { go(i+1); }, prev: function() { go(i-1); } };
    }

    var heroData = [
        { title: 'Perspective', desc: 'A capstone collection investigating perception, movement, and distortion through experimental garment construction and a distinct, futuristic design voice.', link: 'senior-thesis.html' },
        { title: 'Expression', desc: 'Accessory design explorations in footwear and handbags, translating street expression and community spaces into refined, wearable art.', link: 'shoe-handbag.html' },
        { title: 'Rent The Runway X Stitched\u00A0Up', desc: 'Case study addressing post-COVID consumer needs through innovative collection design, strategically using excess inventory to give old garments a new life.', link: 'fsf-case-study.html' },
        { title: 'Stitched Up', desc: 'An exploration of textile manipulation and deconstructed garment construction through innovative upcycling.', link: 'stitched-up.html' },
        { title: 'Strange Beauty', desc: 'A collection challenging conventional beauty standards through unconventional silhouettes and styling.', link: 'strange-beauty.html' },
        { title: 'Renaissance Romance', desc: 'Romantic silhouettes and historical references reinterpreted through a modern design lens.', link: 'renaissance-romance.html' }
    ];

    var tEl = document.getElementById('heroTitle');
    var dEl = document.getElementById('heroDesc');
    var lEl = document.getElementById('heroLink');
    var heroSlides = document.querySelectorAll('.hero-slide');
    var heroCounter = document.getElementById('heroCounter');

    if (heroSlides.length && heroCounter) {
        var hero = slideshow(heroSlides, heroCounter, {
            onUpdate: function(i) {
                if (dEl) dEl.textContent = heroData[i].desc;
                if (lEl) lEl.href = heroData[i].link;
                if (tEl) {
                    if (i === 2) {
                        tEl.innerHTML = 'Rent The Runway X <span class="title-no-wrap">Stitched Up</span>';
                    } else {
                        tEl.textContent = heroData[i].title;
                    }
                }
            }
        });

        var heroNext = document.getElementById('heroNext');
        var heroPrev = document.getElementById('heroPrev');
        if (heroNext) heroNext.addEventListener('click', hero.next);
        if (heroPrev) heroPrev.addEventListener('click', hero.prev);

        var auto = setInterval(hero.next, 6000);
        var heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.addEventListener('mouseenter', function() { clearInterval(auto); });
            heroCard.addEventListener('mouseleave', function() { auto = setInterval(hero.next, 6000); });
        }
    }

    /* Featured slideshow */
    var featSlides = document.querySelectorAll('.feat-slide');
    var featNext = document.getElementById('featNext');
    var featPrev = document.getElementById('featPrev');

    if (featSlides.length && featNext && featPrev) {
        var feat = slideshow(featSlides, null);
        featNext.addEventListener('click', feat.next);
        featPrev.addEventListener('click', feat.prev);
    }
})();
