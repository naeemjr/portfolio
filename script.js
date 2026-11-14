// I use this block to control the mobile navigation menu.
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// I list the Three.js canvases here so I can add a decorative scene to a section.
const ambientCanvas = document.querySelector("#ambient-canvas");
const profileCanvas = document.querySelector("#profile-canvas");
const certCanvas = document.querySelector("#cert-canvas");
const certCards = [...document.querySelectorAll(".certification-card")];
const certDialog = document.querySelector("#cert-dialog");
const certDialogTitle = document.querySelector("#cert-dialog-title");
const certDialogDetail = document.querySelector("#cert-dialog-detail");
const dialogClose = document.querySelector(".dialog-close");
const decorativeCanvases = [
  document.querySelector("#experience-canvas"),
  document.querySelector("#research-canvas"),
  document.querySelector("#projects-canvas"),
  document.querySelector("#contact-canvas"),
].filter(Boolean);

// I keep the visual effects optional so the site still works if WebGL or the CDN fails.
if (ambientCanvas || profileCanvas || certCanvas || decorativeCanvases.length) {
  import("https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js")
    .then(({ AmbientLight, DirectionalLight, DodecahedronGeometry, DoubleSide, IcosahedronGeometry, Mesh, MeshBasicMaterial, OctahedronGeometry, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, TetrahedronGeometry, TextureLoader, TorusGeometry, Vector2, WebGLRenderer }) => {
      const renderers = [];
      const pointer = { x: 0, y: 0 };

      const addDecorativeScene = (canvas, geometry, color, position, rotationSpeed, opacity) => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 5;
        const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        const form = new Mesh(
          geometry,
          new MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity }),
        );
        form.position.set(...position);
        scene.add(form);
        const resize = () => {
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        renderers.push({ resize, render: (time) => {
          form.rotation.x = time * rotationSpeed + pointer.y * .06;
          form.rotation.y = time * rotationSpeed * 1.4 + pointer.x * .08;
          renderer.render(scene, camera);
        }});
      };

      if (ambientCanvas) {
        const scene = new Scene();
        const camera = new PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 5;
        const renderer = new WebGLRenderer({ canvas: ambientCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        scene.add(new AmbientLight(0xffffff, 1));
        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(2, 3, 4);
        scene.add(light);
        const form = new Mesh(
          new IcosahedronGeometry(1.65, 2),
          new MeshBasicMaterial({ color: 0x2f679f, wireframe: true, transparent: true, opacity: .28 }),
        );
        form.position.set(1.25, .6, 0);
        scene.add(form);
        const resize = () => {
          const width = ambientCanvas.clientWidth;
          const height = ambientCanvas.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        renderers.push({ resize, render: (time) => {
          form.rotation.x = time * .00004 + pointer.y * .08;
          form.rotation.y = time * .00007 + pointer.x * .1;
          renderer.render(scene, camera);
        }});
      }

      if (profileCanvas) {
        const scene = new Scene();
        const camera = new PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.z = 4;
        const renderer = new WebGLRenderer({ canvas: profileCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        const form = new Mesh(
          new OctahedronGeometry(.95, 1),
          new MeshBasicMaterial({ color: 0xb32635, wireframe: true, transparent: true, opacity: .55 }),
        );
        form.position.set(.35, -.15, 0);
        scene.add(form);
        const resize = () => {
          const width = profileCanvas.clientWidth;
          const height = profileCanvas.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        renderers.push({ resize, render: (time) => {
          form.rotation.x = time * .00012 + pointer.y * .12;
          form.rotation.y = time * .00016 + pointer.x * .14;
          renderer.render(scene, camera);
        }});
      }

      if (decorativeCanvases[0]) {
        addDecorativeScene(decorativeCanvases[0], new TetrahedronGeometry(1.7, 2), 0xb32635, [-1.4, .1, 0], .00005, .24);
      }
      if (decorativeCanvases[1]) {
        addDecorativeScene(decorativeCanvases[1], new DodecahedronGeometry(1.55, 1), 0x2f679f, [1.4, .1, 0], .00004, .2);
      }
      if (decorativeCanvases[2]) {
        addDecorativeScene(decorativeCanvases[2], new TorusGeometry(1.15, .12, 12, 40), 0x2f679f, [1.8, -.2, 0], .00006, .2);
      }
      if (decorativeCanvases[3]) {
        addDecorativeScene(decorativeCanvases[3], new IcosahedronGeometry(1.35, 1), 0xb32635, [1.3, .1, 0], .00005, .22);
      }

      if (certCanvas) {
        const scene = new Scene();
        const camera = new PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 5.2;
        const renderer = new WebGLRenderer({ canvas: certCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        scene.add(new AmbientLight(0xffffff, 1.2));
        const textureLoader = new TextureLoader();
        const raycaster = new Raycaster();
        const canvasPointer = new Vector2();
        const coins = [];
        const badgeUrls = [
          "assets/cert-blue-team-level-1.png",
          "assets/cert-hackthebox.png",
          "assets/cert-cysa-plus.png",
          "assets/cert-security-plus.png",
          "assets/cert-pnpt.png",
        ];
        let selectedCoin = null;
        let lastPointer = { x: 0, y: 0 };
        let moved = false;
        badgeUrls.forEach((url, index) => {
          const texture = textureLoader.load(url);
          texture.colorSpace = "srgb";
          const coin = new Mesh(
            new PlaneGeometry(1.35, 1.35),
            new MeshBasicMaterial({ map: texture, transparent: true, alphaTest: .08, side: DoubleSide }),
          );
          coin.position.x = (index - 2) * 1.65;
          coin.position.y = Math.sin(index * 1.25) * .08;
          coin.userData.index = index;
          coin.userData.homeX = coin.position.x;
          coin.userData.homeY = coin.position.y;
          scene.add(coin);
          coins.push(coin);
        });

        const updateCanvasPointer = (event) => {
          const bounds = certCanvas.getBoundingClientRect();
          canvasPointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
          canvasPointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        };
        certCanvas.addEventListener("pointerdown", (event) => {
          updateCanvasPointer(event);
          raycaster.setFromCamera(canvasPointer, camera);
          selectedCoin = raycaster.intersectObjects(coins)[0]?.object || null;
          moved = false;
          lastPointer = { x: event.clientX, y: event.clientY };
          if (selectedCoin) certCanvas.setPointerCapture(event.pointerId);
        });
        certCanvas.addEventListener("pointermove", (event) => {
          if (!selectedCoin) return;
          const deltaX = event.clientX - lastPointer.x;
          const deltaY = event.clientY - lastPointer.y;
          if (Math.abs(deltaX) + Math.abs(deltaY) > 2) moved = true;
          selectedCoin.position.x += deltaX * .008;
          selectedCoin.position.y -= deltaY * .008;
          selectedCoin.rotation.y += deltaX * .012;
          selectedCoin.rotation.x += deltaY * .012;
          lastPointer = { x: event.clientX, y: event.clientY };
        });
        const releaseCoin = (event) => {
          if (selectedCoin && !moved) {
            const card = certCards[selectedCoin.userData.index];
            certDialogTitle.textContent = card.dataset.certTitle;
            certDialogDetail.textContent = card.dataset.certDetail;
            card.classList.add("is-active");
            certDialog.showModal();
          }
          if (selectedCoin) selectedCoin.userData.returning = true;
          selectedCoin = null;
          if (certCanvas.hasPointerCapture(event.pointerId)) certCanvas.releasePointerCapture(event.pointerId);
        };
        certCanvas.addEventListener("pointerup", releaseCoin);
        certCanvas.addEventListener("pointercancel", () => {
          if (selectedCoin) selectedCoin.userData.returning = true;
          selectedCoin = null;
        });

        const resize = () => {
          const width = certCanvas.clientWidth;
          const height = certCanvas.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        renderers.push({ resize, render: (time) => {
          coins.forEach((coin, index) => {
            if (coin !== selectedCoin) {
              coin.rotation.z = Math.sin(time * .0005 + index) * .025;
              coin.position.x += (coin.userData.homeX - coin.position.x) * .12;
              coin.position.y += (coin.userData.homeY - coin.position.y) * .12;
              coin.rotation.x += (0 - coin.rotation.x) * .12;
              coin.rotation.y += (0 - coin.rotation.y) * .12;
            }
          });
          renderer.render(scene, camera);
        }});
      }

      const resize = () => renderers.forEach((item) => item.resize());
      const animate = (time) => {
        renderers.forEach((item) => item.render(time));
        requestAnimationFrame(animate);
      };
      window.addEventListener("pointermove", (event) => {
        pointer.x = (event.clientX / window.innerWidth - .5) * 2;
        pointer.y = (event.clientY / window.innerHeight - .5) * -2;
      });
      window.addEventListener("resize", resize);
      resize();
      requestAnimationFrame(animate);
    })
    .catch(() => {
      if (ambientCanvas) ambientCanvas.hidden = true;
      if (profileCanvas) profileCanvas.hidden = true;
      if (certCanvas) certCanvas.hidden = true;
      decorativeCanvases.forEach((canvas) => {
        canvas.hidden = true;
      });
    });
}

// I keep the certification popup behavior here.
if (dialogClose && certDialog) {
  dialogClose.addEventListener("click", () => certDialog.close());
  certDialog.addEventListener("close", () => certCards.forEach((card) => card.classList.remove("is-active")));
  certDialog.addEventListener("click", (event) => {
    if (event.target === certDialog) certDialog.close();
  });
}

// I update the browser title as visitors move through my portfolio.
const pageTitleSections = {
  top: "Naeem Roussas Portfolio",
  about: "About — Naeem Roussas Portfolio",
  research: "Research — Naeem Roussas Portfolio",
  education: "Education — Naeem Roussas Portfolio",
  experience: "Experience — Naeem Roussas Portfolio",
  projects: "Projects — Naeem Roussas Portfolio",
  certifications: "Certifications — Naeem Roussas Portfolio",
  technical: "Technical / CTF — Naeem Roussas Portfolio",
  contact: "Contact — Naeem Roussas Portfolio",
};

if ("IntersectionObserver" in window) {
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && pageTitleSections[entry.target.id]) {
        document.title = pageTitleSections[entry.target.id];
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  Object.keys(pageTitleSections).forEach((id) => {
    const section = document.getElementById(id);
    if (section) titleObserver.observe(section);
  });
}

