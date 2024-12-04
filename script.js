document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de l\'Agence de Tourisme Spatial!');

    // Ajouter des étoiles animées
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        starsContainer.appendChild(star);
    }

    // Effet de parallaxe
    window.addEventListener('scroll', function() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const scrollTop = window.scrollY;
            star.style.transform = `translateY(${scrollTop * 0.5}px)`;
        });
    });

    // Créer l'effet de déformation avec p5.js
    const sketch = function(p) {
        let img;
        let distortionFactor = 0.01;

        p.preload = function() {
            img = p.loadImage('https://i.ibb.co/TkRnvPy/DALL-E-2024-11-18-09-16-17-A-highly-detailed-and-high-resolution-photograph-of-a-bright-blue-comet-s.jpg');
        };

        p.setup = function() {
            const container = document.getElementById('image-container');
            const canvas = p.createCanvas(img.width, img.height);
            canvas.parent(container);
        };

        p.draw = function() {
            p.background(0);
            p.image(img, 0, 0);

            p.loadPixels();
            for (let y = 0; y < p.height; y++) {
                for (let x = 0; x < p.width; x++) {
                    const index = (x + y * p.width) * 4;
                    const r = p.pixels[index];
                    const g = p.pixels[index + 1];
                    const b = p.pixels[index + 2];

                    const distortion = p.noise(x * distortionFactor, y * distortionFactor, p.frameCount * 0.01) * 10;
                    const newX = x + distortion;
                    const newY = y + distortion;

                    if (newX >= 0 && newX < p.width && newY >= 0 && newY < p.height) {
                        const newIndex = (Math.floor(newX) + Math.floor(newY) * p.width) * 4;
                        p.pixels[newIndex] = r;
                        p.pixels[newIndex + 1] = g;
                        p.pixels[newIndex + 2] = b;
                        p.pixels[newIndex + 3] = 255;
                    }
                }
            }
            p.updatePixels();
        };
    };

    new p5(sketch);
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}