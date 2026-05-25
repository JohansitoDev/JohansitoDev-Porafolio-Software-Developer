
        const pdfFiles = {
            git: "Manual_Git_Esencial_Johan_Mancebo-v2.pdf",
            ciber: "Libro_Completo_Ciberseguridad_Defensiva_Johan_Mancebo.pdf"
        };

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null;

        const scale = window.innerWidth < 640 ? 0.8 : 1.3,
              canvas = document.getElementById('pdfRenderCanvas'),
              ctx = canvas.getContext('2d');

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        function renderPage(num) {
            pageIsRendering = true;
            document.getElementById('pageNum').textContent = num;

            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                page.render(renderCtx).promise.then(() => {
                    pageIsRendering = false;
                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });
            });
        }

        function queueRenderPage(num) {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        }

        // Paginación
        function prevPage() {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        }

        function nextPage() {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        }

        function openSecureReader(key) {
            const fileUrl = pdfFiles[key];
            const title = key === 'git' ? "Git Esencial: Aprende los Comandos Básicos" : "Blue Team Operative: Ciberseguridad Defensiva";
            
            document.getElementById('readerBookTitle').innerText = title;
            document.getElementById('secureReaderModal').style.display = 'flex';
            document.body.classList.add('modal-active');

            pdfjsLib.getDocument(fileUrl).promise.then(pdfDoc_ => {
                pdfDoc = pdfDoc_;
                document.getElementById('pageCount').textContent = pdfDoc.numPages;
                pageNum = 1;
                renderPage(pageNum);
            }).catch(err => {
                alert("Error al cargar el archivo de lectura protegido.");
            });
        }

        function closeSecureReader() {
            document.getElementById('secureReaderModal').style.display = 'none';
            document.body.classList.remove('modal-active');
            pdfDoc = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // SEGURIDAD: Bloqueo de atajos (Ctrl+P, Ctrl+S, Ctrl+U, F12)
        window.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                return false;
            }
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
        });

        function scrollCarousel(direction) {
            const carousel = document.getElementById('bookCarousel');
            carousel.scrollBy({ left: 300 * direction, behavior: 'smooth' });
        }

        // Datos del Modal de Proyectos
        const modalData = {
            ciberseguridad: {
                title: "APK Vulnerability & Malware Lab",
                category: "Ciberseguridad / Blue Team",
                img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Ingeniería inversa avanzada con Jadx-GUI, Apktool y scripts propios en Python. Mapeo estricto contra el framework OWASP Mobile Top 10 y hardening modular del entorno.",
                sec: "Validación de criptografía asimétrica local, análisis minucioso de intenciones (Intents), ofuscación avanzada de código Smali mediante ProGuard y detección activa de fugas en logs de depuración de memoria."
            },
            backend: {
                title: "Secure Auth & Log API Engine",
                category: "Desarrollo Backend",
                img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Construcción de arquitectura limpia basada en Node.js/Express, resistencia de datos relacionales blindada y control estricto de sesiones mediante JSON Web Tokens asimétricos.",
                sec: "Implementación de Rate Limiting por IP para evitar denegación de servicios, hashing iterativo Argon2id para contraseñas y middleware de sanitización profunda contra inyecciones XSS y SQLi."
            },
            frontend: {
                title: "UI Custom Analytical Dashboard",
                category: "Diseño Frontend",
                img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Maquetación modular estructurada con Tailwind CSS y Vanilla JavaScript optimizado, logrando un rendimiento perfecto de 100/100 en las métricas de carga de Google Lighthouse.",
                sec: "Protección estricta de políticas de seguridad de contenido (CSP) a nivel de renderizado, sanitización de inserciones dinámicas en el DOM y mitigación absoluta de secuestros de clics (Clickjacking)."
            },
            movil: {
                title: "Reporta RD Engine Core",
                category: "Desarrollo Móvil",
                img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Despliegue del núcleo nativo para dispositivos móviles, integrando llamadas seguras a APIs geográficas estatales, almacenamiento local cifrado de variables y sincronización asíncrona de reportes.",
                sec: "Protección del canal de transporte mediante SSL/TLS Pinning forzado en la app para anular ataques Man-in-the-Middle (MitM), verificación de firmas del sistema y detección automática de dispositivos rooteados."
            },
            videojuego: {
                title: "Canvas Retro RPG Core Engine",
                category: "Videojuegos Web",
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Algoritmia pura aplicada en HTML5 Canvas con bucles de renderizado asíncronos (RequestAnimationFrame). Manejo de matrices para renderizado de mapas por cuadrícula sin latencia.",
                sec: "Validación de variables críticas del estado de la partida en memoria protegida dentro del Sandbox web, evitando la alteración o inyección maliciosa de scripts JS mediante consola externa."
            },
            ar: {
                title: "A-Frame Spatial AR Interactive Viewer",
                category: "Realidad Aumentada Web",
                img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=80",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tech: "Uso avanzado del estándar WebXR integrado mediante A-Frame, procesando matrices de transformación tridimensionales en tiempo real directamente sobre el hardware gráfico del dispositivo.",
                sec: "Configuración restrictiva de permisos de hardware bajo entornos obligatorios HTTPS, sanitización de assets externos glTF y aislamiento de datos de la cámara del usuario para garantizar privacidad absoluta."
            }
        };

        function openModal(key) {
            const data = modalData[key];
            if (!data) return;
            document.getElementById('modalVideo').src = data.video;
            document.getElementById('modalImg').src = data.img;
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalCategory').innerText = data.category;
            document.getElementById('modalTech').innerText = data.tech;
            document.getElementById('modalSec').innerText = data.sec;
            document.getElementById('projectModal').style.display = 'flex';
            document.body.classList.add('modal-active');
        }

        function closeModal() {
            document.getElementById('modalVideo').src = "";
            document.getElementById('projectModal').style.display = 'none';
            document.body.classList.remove('modal-active');
        }

        window.onclick = function(event) {
            const pModal = document.getElementById('projectModal');
            if (event.target === pModal) closeModal();
        }

        function filterProjects(category) {
            const items = document.querySelectorAll('.project-item');
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            if(event) event.target.classList.add('active');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // CANVAS METEOROS BACKGROUND
        const canvasBg = document.getElementById('meteorBackground');
        const ctxBg = canvasBg.getContext('2d');
        let width = canvasBg.width = window.innerWidth;
        let height = canvasBg.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvasBg.width = window.innerWidth;
            height = canvasBg.height = window.innerHeight;
        });

        const meteorCount = 20;
        const meteors = [];

        class Meteor {
            constructor() { this.reset(); this.y = Math.random() * height; }
            reset() {
                this.x = Math.random() * width * 1.3;
                this.y = -20;
                this.length = Math.random() * 80 + 40;
                this.speed = Math.random() * 2 + 1.5;
                this.thickness = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.x -= this.speed * 0.7;
                this.y += this.speed;
                if (this.y > height || this.x < -100) this.reset();
            }
            draw() {
                ctxBg.save();
                ctxBg.beginPath();
                let gradient = ctxBg.createLinearGradient(this.x, this.y, this.x + this.length * 0.7, this.y - this.length);
                gradient.addColorStop(0, `rgba(245, 158, 11, ${this.alpha})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctxBg.strokeStyle = gradient;
                ctxBg.lineWidth = this.thickness;
                ctxBg.moveTo(this.x, this.y);
                ctxBg.lineTo(this.x + this.length * 0.7, this.y - this.length);
                ctxBg.stroke();
                ctxBg.restore();
            }
        }

        for (let i = 0; i < meteorCount; i++) meteors.push(new Meteor());
        function render() {
            ctxBg.fillStyle = 'rgba(4, 4, 2, 0.3)';
            ctxBg.fillRect(0, 0, width, height);
            for (let i = 0; i < meteors.length; i++) {
                meteors[i].update();
                meteors[i].draw();
            }
            requestAnimationFrame(render);
        }
        render();
    
