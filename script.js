const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

var a = navigator.userAgent || navigator.vendor || window.opera;
function isMobile() {
  if (
    /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  ) {
    return true;
  }

  return false;
}

let pCount = 5000;

if(isMobile()) pCount = 500;
// Configurable parameters
const config = {
	particleCount: pCount,
	textArray: ["С днём \nРождения!", "пупсик ;)", "(^_^)"],
	mouseRadius: 0.1,
	particleSize: 2,
	forceMultiplier: 0.001,
	returnSpeed: 0.005,
	velocityDamping: 0.95,
	colorMultiplier: 40000,
	saturationMultiplier: 1000,
	textChangeInterval: 5000,
	rotationForceMultiplier: 0.5
};

let currentTextIndex = 0;
let nextTextTimeout;
let textCoordinates = [];

const mouse = {
	x: -500,
	y: -500,
	radius: config.mouseRadius
};

const particles = [];
for (let i = 0; i < config.particleCount; i++) {
	particles.push({ x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0 });
}

const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_hue;
    attribute float a_saturation;
    varying float v_hue;
    varying float v_saturation;
    void main() {
        gl_PointSize = ${config.particleSize.toFixed(1)};
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_hue = a_hue;
        v_saturation = a_saturation;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying float v_hue;
    varying float v_saturation;
    void main() {
        float c = v_hue * 6.0;
        float x = 1.0 - abs(mod(c, 2.0) - 1.0);
        vec3 color;
        if (c < 1.0) color = vec3(1.0, x, 0.0);
        else if (c < 2.0) color = vec3(x, 1.0, 0.0);
        else if (c < 3.0) color = vec3(0.0, 1.0, x);
        else if (c < 4.0) color = vec3(0.0, x, 1.0);
        else if (c < 5.0) color = vec3(x, 0.0, 1.0);
        else color = vec3(1.0, 0.0, x);
        vec3 finalColor = mix(vec3(1.0), color, v_saturation);
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
	gl,
	gl.FRAGMENT_SHADER,
	fragmentShaderSource
);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
const saturationAttributeLocation = gl.getAttribLocation(
	program,
	"a_saturation"
);

const positionBuffer = gl.createBuffer();
const hueBuffer = gl.createBuffer();
const saturationBuffer = gl.createBuffer();

const positions = new Float32Array(config.particleCount * 2);
const hues = new Float32Array(config.particleCount);
const saturations = new Float32Array(config.particleCount);



function getTextCoordinates(text) {
	const ctx = document.createElement("canvas").getContext("2d");
	ctx.canvas.width = canvas.width;
	ctx.canvas.height = canvas.height;
	const fontSize = Math.min(canvas.width / 6, canvas.height / 6);
	ctx.font = `900 ${fontSize}px Arial`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	//ctx.fillText(text, canvas.width / 2, canvas.height / 2);

	const splitText = text.split('\n');
	splitText.forEach((line, index) => {
		let x = canvas.width / 2;
		let y = (canvas.height-splitText.length*fontSize/2) / 2 + index*fontSize;
		ctx.fillText(line, x, y);
	});

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	const coordinates = [];
	for (let y = 0; y < canvas.height; y += 4) {
		for (let x = 0; x < canvas.width; x += 4) {
			const index = (y * canvas.width + x) * 4;
			if (imageData[index + 3] > 128) {
				coordinates.push({
					x: (x / canvas.width) * 2 - 1,
					y: (y / canvas.height) * -2 + 1
				});
			}
		}
	}
	return coordinates;
}

function createParticles() {
	textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
	for (let i = 0; i < config.particleCount; i++) {
		const randomIndex = Math.floor(Math.random() * textCoordinates.length);
		const { x, y } = textCoordinates[randomIndex];
		particles[i].x = particles[i].baseX = x;
		particles[i].y = particles[i].baseY = y;
	}
}
function updateParticles() {
	for (let i = 0; i < config.particleCount; i++) {
		const particle = particles[i];
		const dx = mouse.x - particle.x;
		const dy = mouse.y - particle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const forceDirectionX = dx / distance;
		const forceDirectionY = dy / distance;
		const maxDistance = mouse.radius;
		const force = (maxDistance - distance) / maxDistance;
		const directionX = forceDirectionX * force * config.forceMultiplier;
		const directionY = forceDirectionY * force * config.forceMultiplier;

		const angle = Math.atan2(dy, dx);

		const rotationForceX = Math.sin(
			-Math.cos(angle * -1) *
				Math.sin(config.rotationForceMultiplier * Math.cos(force)) *
				Math.sin(distance * distance) *
				Math.sin(angle * distance)
		);

		const rotationForceY = Math.sin(
			Math.cos(angle * 1) *
				Math.sin(config.rotationForceMultiplier * Math.sin(force)) *
				Math.sin(distance * distance) *
				Math.cos(angle * distance)
		);

		if (distance < mouse.radius) {
			particle.vx -= directionX + rotationForceX;
			particle.vy -= directionY + rotationForceY;
		} else {
			particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
			particle.vy += (particle.baseY - particle.y) * config.returnSpeed;
		}

		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.vx *= config.velocityDamping;
		particle.vy *= config.velocityDamping;

		const speed = Math.sqrt(
			particle.vx * particle.vx + particle.vy * particle.vy
		);
		const hue = (speed * config.colorMultiplier) % 360;

		hues[i] = hue / 360;
		saturations[i] = Math.min(speed * config.saturationMultiplier, 1);
		positions[i * 2] = particle.x;
		positions[i * 2 + 1] = particle.y;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW);
}

function animate() {
	updateParticles();

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
	gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(hueAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
	gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(saturationAttributeLocation);
	gl.useProgram(program);
	gl.drawArrays(gl.POINTS, 0, config.particleCount);
	requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / canvas.width) * 2 - 1;
	mouse.y = (event.clientY / canvas.height) * -2 + 1;
});


canvas.addEventListener("touchmove", (e) => {
	mouse.x = (e.changedTouches[0].clientX / canvas.width) * 2 - 1;
	mouse.y = (e.changedTouches[0].clientY / canvas.height) * -2 + 1;
},
{passive: true});

canvas.addEventListener("mouseleave", () => {
	mouse.x = -500;
	mouse.y = -500;
});

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
	createParticles();
});

function changeText() {
	currentTextIndex = (currentTextIndex + 1) % config.textArray.length;
	const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
	for (let i = 0; i < config.particleCount; i++) {
		const randomIndex = Math.floor(Math.random() * newCoordinates.length);
		const { x, y } = newCoordinates[randomIndex];
		particles[i].baseX = x;
		particles[i].baseY = y;
	}
	nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
}

gl.clearColor(0, 0, 0, 0);
createParticles();
animate();
nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
