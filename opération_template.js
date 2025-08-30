const templates = {
    ats: [
      { image: "Assets/Cv/ats-classique.jpg", titre: "Classique", desc: "Structure claire et pro" },
      { image: "Assets/Cv/ats-minimaliste.jpg", titre: "Minimaliste", desc: "Simplicité et efficacité" }
    ],
    moderne: [
      { image: "Assets/Cv/moderne-contemporain.jpg", titre: "Contemporain", desc: "Lignes épurées et modernes" },
      { image: "Assets/Cv/moderne-elegant.jpg", titre: "Élégant", desc: "Pour postes à responsabilité" }
    ],
    creatif: [
      { image: "Assets/Cv/creatif-artistique.jpg", titre: "Artistique", desc: "Pour les métiers du design" },
      { image: "Assets/Cv/creatif-colore.jpg", titre: "Coloré", desc: "Met en avant l’originalité" }
    ]
  };

function renderCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    templates[category].forEach(cv => {
      container.innerHTML += `
        <div class="carousel-item">
          <div class="carousel-img">
            <img src="${cv.image}" alt="${cv.titre}">
          </div>
          <div class="carousel-content">
            <h3 class="text-xl font-bold mb-2">${cv.titre}</h3>
            <p class="text-gray-600 mb-4">${cv.desc}</p>
            <a href="#" class="font-semibold" style="color: var(--primary);">Voir le template →</a>
          </div>
        </div>
      `;
    });
  }

  // Générer chaque carrousel
  renderCarousel("ats", "carousel-ats");
  renderCarousel("moderne", "carousel-moderne");
  renderCarousel("creatif", "carousel-creatif");
