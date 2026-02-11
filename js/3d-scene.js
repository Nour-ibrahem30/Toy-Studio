// 3D Scene with Three.js
class Hero3DScene {
    constructor() {
        this.container = document.getElementById('heroCanvas');
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.container, alpha: true, antialias: true });
        
        this.init();
        this.createGeometry();
        this.animate();
        this.handleResize();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.powerPreference = 'high-performance';
        this.renderer.antialias = window.devicePixelRatio === 1;
        this.camera.position.z = 5;

        // Lighting with red theme
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xEB3223, 1.5);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    createGeometry() {
        // Create abstract geometric shape with red theme
        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0xEB3223,
            wireframe: true,
            wireframeLinewidth: 2
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Add inner sphere with gradient effect
        const innerGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const innerMaterial = new THREE.MeshStandardMaterial({
            color: 0xEB3223,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xc72818,
            emissiveIntensity: 0.3
        });
        
        this.innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
        this.scene.add(this.innerMesh);

        // Add particles for extra effect
        this.createParticles();
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 50; // Reduced for better performance
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xEB3223,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Only animate if visible (performance optimization)
        if (this.isVisible()) {
            if (this.mesh) {
                this.mesh.rotation.x += 0.005;
                this.mesh.rotation.y += 0.005;
            }

            if (this.innerMesh) {
                this.innerMesh.rotation.x -= 0.003;
                this.innerMesh.rotation.y -= 0.003;
            }

            if (this.particles) {
                this.particles.rotation.y += 0.001;
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    isVisible() {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (!this.container) return;
            
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
    }
}

// Initialize 3D scene when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Hero3DScene();
    });
} else {
    new Hero3DScene();
}
