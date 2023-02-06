var clock = new THREE.Clock();
var escenario, lienzo, camara;
var controls, keyboard = new KeyboardState();

var personaje;
var cuerpo;
var light;

// varible de estado del personaje
var pos = new THREE.Vector3(-250,0,0);
var angle = 0;
var speed = 0;

init();
animate();
crearPiso();
crearPersonaje();
crearLaberinto();
function init()
{
	var width = window.innerWidth;
	var height = window.innerHeight;

	lienzo = new THREE.WebGLRenderer({antialias: true});
	lienzo.outputEncoding = THREE.sRGBEncoding;
	lienzo.shadowMap.enabled = true;
	lienzo.shadowMap.type = THREE.PCFSoftShadowMap;
	lienzo.setPixelRatio(window.devicePixelRatio);
	lienzo.setSize (width, height);
	document.body.appendChild (lienzo.domElement);

	escenario = new THREE.Scene();

    var loader = new THREE.CubeTextureLoader();
	var texture = loader.load([
        
        'Mundo/posx.jpg',
        'Mundo/negx.jpg',
        'Mundo/posy.jpg',
        'Mundo/negy.jpg',
        'Mundo/posz.jpg',
        'Mundo/negz.jpg',
        
    ]);
    escenario.background = texture;
	


	camara = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt (new THREE.Vector3(0,0,0));
	
	
	// add control here (after the camera is defined)
	//controls = new THREE.OrbitControls (camera, render.domElement);
}
function crearPersonaje() {
	textura = new THREE.TextureLoader().load('imagenes/cuerpo.jpg');
	var SG = new THREE.SphereGeometry( 50, 32, 16 );
	var material = new THREE.MeshStandardMaterial( { map: textura} );
	cuerpo = new THREE.Mesh( SG, material );
	cuerpo.position.y = 50;
	cuerpo.castShadow = true;
	textojos = new THREE.TextureLoader().load('imagenes/cabeza.png');
	var SG1 = new THREE.SphereGeometry( 25, 32, 16, 0, 2*Math.PI, 0, 0.6 * Math.PI );
	var material1 = new THREE.MeshStandardMaterial( { map: textojos} );
	var cabeza = new THREE.Mesh( SG1, material1 );
	//sphere1.rotation.y = Math.PI / 2;
	cabeza.position.y = 100;
	cabeza.castShadow = true;
	personaje = new THREE.Group();
	personaje.add(cuerpo, cabeza)
	escenario.add(personaje);

	light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-500, 1500, 1550);
    light.target.position.set(-500, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 8198;
    light.shadow.mapSize.height = 8198;
    light.shadow.camera.near = 1.0;
    light.shadow.camera.far = 5000.0;
    light.shadow.camera.left = 5000;
    light.shadow.camera.right = -5000;
    light.shadow.camera.top = 5000;
    light.shadow.camera.bottom = -5000;
    escenario.add(light);

	light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    escenario.add(light);

    
}
function crearPiso() {
    geometriaPlano = new THREE.PlaneGeometry(3000, 1000, 10, 10);
    texturaPlano = new THREE.TextureLoader().load('imagenes/piso.jpg');
    texturaPlano.wrapS = texturaPlano.wrapT = THREE.RepeatWrapping;
    texturaPlano.repeat.set(5, 5);

    materialPlano = new THREE.MeshStandardMaterial({ map: texturaPlano, side: THREE.DoubleSide });
    terreno = new THREE.Mesh(geometriaPlano, materialPlano);
	terreno.castShadow = false;
    terreno.receiveShadow = true;
	terreno.position.x = 1000;
    terreno.rotation.x = Math.PI / 2;
    escenario.add(terreno);
}
function crearLaberinto() {
	texturaPared = new THREE.TextureLoader().load('imagenes/txtPared.webp');

	var gPared0 = new THREE.BoxBufferGeometry( 2000, 150, 50 );
    var mPared0 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared0 = new THREE.Mesh( gPared0, mPared0 );
	Pared0.castShadow = true;
	Pared0.receiveShadow = true;
	Pared0.position.x = 500;
	Pared0.position.y = 75;
	Pared0.position.z = -525;
    
	var gPared1 = new THREE.BoxBufferGeometry( 2000, 150, 50 );
    var mPared1 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared1 = new THREE.Mesh( gPared1, mPared1 );
	Pared1.castShadow = true;
	Pared1.receiveShadow = true;
	Pared1.position.x = 500;
	Pared1.position.y = 75;
	Pared1.position.z = 525;
	
	var gPared2 = new THREE.BoxBufferGeometry( 600, 150, 300 );
    var mPared2 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared2 = new THREE.Mesh( gPared2, mPared2 );
	Pared2.castShadow = true;
	Pared2.receiveShadow = true;
	Pared2.rotation.y = Math.PI/2
	Pared2.position.y = 75;
	Pared2.position.x = 650;

	var gPared3 = new THREE.BoxBufferGeometry( 1000, 150, 50 );
    var mPared3 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared3 = new THREE.Mesh( gPared3, mPared3 );
	Pared3.castShadow = true;
	Pared3.receiveShadow = true;
	Pared3.rotation.y = Math.PI/2
	Pared3.position.y = 75;
	Pared3.position.x = -525;

	var gPared4 = new THREE.BoxBufferGeometry( 800, 150, 50 );
    var mPared4 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared4 = new THREE.Mesh( gPared4, mPared4 );
	Pared4.castShadow = true;
	Pared4.receiveShadow = true;
	Pared4.rotation.y = Math.PI/2
	Pared4.position.y = 75;
	Pared4.position.x = 1025;
	Pared4.position.z = 100;

	var gPared5 = new THREE.BoxBufferGeometry( 200, 150, 50 );
    var mPared5 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared5 = new THREE.Mesh( gPared5, mPared5 );
	Pared5.castShadow = true;
	Pared5.receiveShadow = true;
	Pared5.rotation.y = Math.PI/2
	Pared5.position.y = 75;
	Pared5.position.x = 525;
	Pared5.position.z = 400;

	var gPared6 = new THREE.BoxBufferGeometry( 100, 150, 600 );
    var mPared6 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared6 = new THREE.Mesh( gPared6, mPared6 );
	Pared6.castShadow = true;
	Pared6.receiveShadow = true;
	Pared6.position.y = 75;
	Pared6.position.x = 1300;

	var gPared7 = new THREE.BoxBufferGeometry( 50, 150, 800 );
    var mPared7 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared7 = new THREE.Mesh( gPared7, mPared7 );
	Pared7.castShadow = true;
	Pared7.receiveShadow = true;
	Pared7.position.y = 75;
	Pared7.position.x = 1550;
	Pared7.position.z = -100;

	var gPared8 = new THREE.BoxBufferGeometry( 200, 150, 50 );
    var mPared8 = new THREE.MeshStandardMaterial({map: texturaPared});
    var Pared8 = new THREE.Mesh( gPared8, mPared8 );
	Pared8.castShadow = true;
	Pared8.receiveShadow = true;
	Pared8.position.y =75;
	Pared8.position.x = 1450;
	Pared8.position.z = 275;

	var gprueba = new THREE.PlaneGeometry(200, 200);
    var mprueba = new THREE.MeshStandardMaterial({ color: 0xff8000});
    var prueba = new THREE.Mesh(gprueba, mprueba);
	prueba.position.y = 75;
	prueba.position.x = 1450;
	prueba.position.z = -300;
    escenario.add(prueba);

    escenario.add(Pared0);
	escenario.add(Pared1);
	escenario.add(Pared2);
	escenario.add(Pared3);
	escenario.add(Pared4);
	escenario.add(Pared5);
	escenario.add(Pared6);
	escenario.add(Pared7);
	escenario.add(Pared8);
}
var EstarPlano0 = false;
var EstarPlano1 = false;
var EstarPlano2 = false;
var EstarPlano3 = false;
function Nocolision(dir, pos){
	//. PLANO0 -500, -500 - > 500, 500
	//. (-450, -450) -> (450, 450) QUITAMOS 50 POR EL PERSONAJE
	if(pos.x > -450 && pos.z > -450 && pos.x < 450 && pos.z < 450){
		EstarPlano0 = true;
		EstarPlano1 = false;
		EstarPlano2 = false;
		EstarPlano3 = false;
		return true;
	}
	// BOTTOM
	else if((pos.x < -450 && dir.x >= 0 && pos.z > -450 && pos.z < 450 && EstarPlano0))
		return true;
	// LEFT && EstarPlano0
	else if((pos.z < -450 && dir.z >= 0 && pos.x > -450 && pos.x < 450 && EstarPlano0))
		return true;
	// TOP && EstarPlano0
	else if((pos.x > 450 && dir.x <= 0 && pos.z > -450 && pos.z < 450  && EstarPlano0))
		return true;
	// RIGTH && EstarPlano0
	else if((pos.z > 450 && dir.z <= 0 && pos.x > -450 && pos.x < 450 && EstarPlano0))
		return true;
	//ESQUINAS
	// BOTTOM-LEFT && EstarPlano0
	else if((pos.x < -450 && pos.z < -450 && dir.x >= 0 && dir.z >= 0 && EstarPlano0))
		return true;
	// TOP-LEFT && EstarPlano0
	else if((pos.x > 450 && pos.z < -450 && dir.z >= 0 && EstarPlano0))
		return true;
	// BOTTOM-RIGTH && EstarPlano0
	else if((pos.x < -450  && pos.z > 450 && dir.x >= 0 && dir.z <=0 && EstarPlano0))
		return true;
	// TOP-RIGTH && EstarPlano0
	else if((pos.x > 450  && pos.z > 450 && dir.x <= 0 && dir.z <=0 && EstarPlano0))
		return true;

	//. PLANO1 450, -500 - > 1000, -300 
	//. 450, -450 - > 950, -350 QUITAMOS 50 POR EL PERSONAJE
	else if(pos.x > 450 && pos.z > -450 && pos.x < 950 && pos.z < -350){
		EstarPlano1 = true;
		EstarPlano0 = false;
		EstarPlano2 = false;
		EstarPlano3 = false;
		return true;
	}	
	// BOTTOM
	else if((pos.x < 450 && dir.x > 0 && pos.z > -450 && pos.z < -350 && EstarPlano1))
		return true;
	// LEFT
	else if((pos.z < -450 && dir.z > 0 && pos.x > 450 && pos.x < 950 && EstarPlano1))
		return true;
	// TOP
	else if((pos.x > 950 && dir.x < 0 && pos.z > -450 && pos.z < -350 && EstarPlano1))
		return true;
	// RIGTH
	else if((pos.z > -350 && dir.z < 0 && pos.x > 450 && pos.x < 950 && EstarPlano1))
		return true;
	//ESQUINAS
	// BOTTOM-LEFT && EstarPlano1
	else if((pos.x < 450 && pos.z < -450 && dir.z >= 0 && EstarPlano1))
		return true;
	// TOP-LEFT && EstarPlano1
	else if((pos.x > 950 && pos.z < -450 && dir.x <= 0 && dir.z >= 0 && EstarPlano1))
		return true;
	// BOTTOM-RIGTH && EstarPlano1
	else if((pos.x < 450  && pos.z > -350 && dir.z <=0 && EstarPlano1))
		return true;
	// TOP-RIGTH && EstarPlano1
	else if((pos.x > 950  && pos.z > -350 && dir.x <= 0 && EstarPlano1))
		return true;

	//. PLANO2 800, -300 - > 1000, 500 
	//. 850, -350 - > 950, 450 QUITAMOS 50 POR EL PERSONAJE
	else if(pos.x > 850 && pos.z > -350 && pos.x < 950 && pos.z < 450){
		EstarPlano2 = true;
		EstarPlano0 = false;
		EstarPlano1 = false;
		EstarPlano3 = false;
		return true;
	}	
	// BOTTOM
	else if((pos.x < 850 && dir.x > 0 && pos.z > -350 && pos.z < 450 && EstarPlano2))
		return true;
	// LEFT
	else if((pos.z < -350 && dir.z > 0 && pos.x > 850 && pos.x < 950 && EstarPlano2))
		return true;
	// TOP
	else if((pos.x > 950 && dir.x < 0 && pos.z > -350 && pos.z < 450 && EstarPlano2))
		return true;
	// RIGTH
	else if((pos.z > 450 && dir.z < 0 && pos.x > 850 && pos.x < 950 && EstarPlano2))
		return true;
	//ESQUINAS
	// BOTTOM-LEFT && EstarPlano2
	else if((pos.x < 850 && pos.z < -350 && dir.x >= 0 && EstarPlano2))
		return true;
	// TOP-LEFT && EstarPlano2
	else if((pos.x > 950 && pos.z < -350 && dir.x <= 0 && EstarPlano2))
		return true;
	// BOTTOM-RIGTH && EstarPlano2
	else if((pos.x < 850  && pos.z > 450 && dir.z <=0 && EstarPlano2))
		return true;
	// TOP-RIGTH && EstarPlano2
	else if((pos.x > 950  && pos.z > 450 && dir.x <= 0 && dir.z <=0 && EstarPlano2))
		return true;

	//. PLANO3 550, 300 - > 800, 500 
	//. 600, 350 - > 850, 450 QUITAMOS 50 POR EL PERSONAJE
	else if(pos.x > 600 && pos.z > 350 && pos.x < 850 && pos.z < 450){
		EstarPlano3 = true;
		EstarPlano0 = false;
		EstarPlano1 = false;
		EstarPlano2 = false;
		return true;
	}	
	// BOTTOM
	else if((pos.x < 600 && dir.x > 0 && pos.z > 350 && pos.z < 450 && EstarPlano3))
		return true;
	// LEFT
	else if((pos.z < 350 && dir.z > 0 && pos.x > 600 && pos.x < 850 && EstarPlano3))
		return true;
	// TOP
	else if((pos.x > 850 && dir.x < 0 && pos.z > 350 && pos.z < 450 && EstarPlano3))
		return true;
	// RIGTH
	else if((pos.z > 450 && dir.z < 0 && pos.x > 600 && pos.x < 850 && EstarPlano3))
		return true;
	//ESQUINAS
	// BOTTOM-LEFT && EstarPlano3
	else if((pos.x < 600 && pos.z < 350 && dir.x >= 0 && dir.z >= 0 && EstarPlano3))
		return true;
	// TOP-LEFT && EstarPlano3
	else if((pos.x > 850 && pos.z < 350 && dir.z >= 0 && EstarPlano3))
		return true;
	// BOTTOM-RIGTH && EstarPlano3
	else if((pos.x < 600  && pos.z > 450 && dir.x >=0 && dir.z <=0 && EstarPlano3))
		return true;
	// TOP-RIGTH && EstarPlano3
	else if((pos.x > 850  && pos.z > 450 && dir.z <=0 && EstarPlano3))
		return true;
	else
	    return false	
}
function animate()
{
	var dt = clock.getDelta();
	
	var dir = new THREE.Vector3(5,0,0);
	dir.multiplyScalar (dt*speed);	//dir *= dt*speed;
	dir.applyAxisAngle (new THREE.Vector3(0,1,0), angle);
	console.log(pos);
	//if(Nocolision(dir, pos)) 
	pos.add (dir);
	
	if (personaje != undefined) {
		
		personaje.position.set(pos.x, pos.y, pos.z);
		
		personaje.rotation.y = (angle+Math.PI/2);

		// posicion de camara
		var relativeCameraOffset = new THREE.Vector3 (0, 150,-300);

		var cameraOffset = relativeCameraOffset.applyMatrix4( personaje.matrixWorld );

		camara.position.x = cameraOffset.x;
		camara.position.y = cameraOffset.y;
		camara.position.z = cameraOffset.z;
		camara.lookAt( personaje.position );
	}
	
	requestAnimationFrame ( animate );  
	update();
	render();  
	
}

var pausa  = false;
function update()
{
	//controls.update();
	keyboard.update();
	speed = 0;
    //if ( keyboard.up("enter") ) pausa = !pausa;
		
	if(!pausa){
		speed = 0;
		if (cuerpo != undefined)
			cuerpo.rotation.x += 0.05;         
		if ( keyboard.pressed("a") ) 
			angle += 0.03;
						
		if ( keyboard.pressed("d") )  
			angle -= 0.03;               
		if ( keyboard.pressed("w") ) {
			speed = 100;
			cuerpo.rotation.x += 0.1;
			}
	}
	

           	
}

function render()
{
	lienzo.render (escenario, camara);
}