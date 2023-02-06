var clock = new THREE.Clock();
var escenario, lienzo, camara;
var orbitcontrols, keyboard = new KeyboardState();

var personaje;
var cuerpo;
var light;

var textureLoader = new THREE.TextureLoader();

var BBPared0;
var BBPared1;
var BBPared2;
var BBPerson;
var BBPared0ZI;

// Varible de estado del personaje
var pos = new THREE.Vector3( -600,0,0);
var angle = 0;
var speed = 0;


// TEXTURA DE PAREDES LAB 0
var pBaseColorLab0 = textureLoader.load("imagenes/txtLab0/Gravel025_1K_Color.jpg");
var pNormalMapLab0 = textureLoader.load("imagenes/txtLab0/Gravel025_1K_NormalGL.jpg");
var pHeightMapLab0 = textureLoader.load("imagenes/txtLab0/Gravel025_1K_Displacement.jpg");
var pRoughMapLab0  = textureLoader.load("imagenes/txtLab0/Gravel025_1K_Roughness.jpg")
var pAmbientOcclusionLab0 = textureLoader.load("imagenes/txtLab0/Gravel025_1K_AmbientOcclusion.jpg");

// TEXTURA DE PAREDE LAB 1
var pBaseColorLab1 = textureLoader.load("imagenes/txtLab1/Bricks076C_1K_Color.jpg");
var pNormalMapLab1 = textureLoader.load("imagenes/txtLab1/Bricks076C_1K_NormalGL.jpg");
var pHeightMapLab1 = textureLoader.load("imagenes/txtLab1/Bricks076C_1K_Displacement.jpg");
var pRoughMapLab1  = textureLoader.load("imagenes/txtLab1/Bricks076C_1K_Roughness.jpg")
var pAmbientOcclusionLab1 = textureLoader.load("imagenes/txtLab1/Bricks076C_1K_AmbientOcclusion.jpg");

var BBArbol2;
var BBArbol1;


init();
animate();
crearPisos();
crearPersonaje();
crearZonaInicio();
crearLaberinto0();
crearZonaMedia();
crearLaberinto1();
crearZonaFinal();
//CargarModelosGLTF();
//CargarModeloFBX();
CargarModeloOBJArco1();
//CargarModeloOBJArco2();
CargarModeloFBXArco3();
CargarModeloFBXArco4();
CargarModeloFBXArbol0();
CargarModeloOBJArbol1();
function init()
{
	var width = window.innerWidth;
	var height = window.innerHeight;

	lienzo = new THREE.WebGLRenderer({antialias: true});
	lienzo.shadowMap.enabled = true;
	lienzo.shadowMap.type = THREE.PCFSoftShadowMap; 
	lienzo.setPixelRatio(window.devicePixelRatio);
	lienzo.outputEncoding = THREE.sRGBEncoding;
	lienzo.setSize (width, height);
	document.body.appendChild (lienzo.domElement);

	escenario = new THREE.Scene();

    var loader = new THREE.CubeTextureLoader();
	var texture = loader.load([
        
        'Mundo/posx (2).jpg',
        'Mundo/negx (2).jpg',
        'Mundo/posy (2).jpg',
        'Mundo/negy (2).jpg',
        'Mundo/posz (2).jpg',
        'Mundo/negz (2).jpg',
        
    ]);
    escenario.background = texture;
	


	camara = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt (new THREE.Vector3(0,0,0));

	light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-500, 1500, 1550);
    light.target.position.set(-500, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 8198;
    light.shadow.mapSize.height = 8198;
    light.shadow.camera.near = 1.0;
    light.shadow.camera.far = 5000.0;
    light.shadow.camera.left = 10000;
    light.shadow.camera.right = -5000;
    light.shadow.camera.top = 5000;
    light.shadow.camera.bottom = -5000;
    escenario.add(light);

	light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    escenario.add(light);
	
	
	// agregamos control de camra con mouse
	orbitcontrols = new THREE.OrbitControls (camara, lienzo.domElement)
	orbitcontrols.enableDamping = true;
	orbitcontrols.enablePan = true;
	orbitcontrols.update();
}
function crearPersonaje() {
	textura = new THREE.TextureLoader().load('imagenes/cuerpo.jpg');
	var gCuerpo = new THREE.SphereGeometry( 50, 32, 16 );
	var mCuerpo = new THREE.MeshStandardMaterial( { map: textura} );
	cuerpo = new THREE.Mesh( gCuerpo, mCuerpo );
	cuerpo.position.y = 50;
	cuerpo.receiveShadow = true;
	cuerpo.castShadow = true;

	textojos = new THREE.TextureLoader().load('imagenes/cabeza.png');
	var gCabeza = new THREE.SphereGeometry( 25, 32, 16, 0, 2*Math.PI, 0, 0.6 * Math.PI );
	var mCabeza = new THREE.MeshStandardMaterial( { map: textojos} );
	var cabeza = new THREE.Mesh( gCabeza, mCabeza );
	cabeza.position.y = 100;
	cabeza.receiveShadow = true;
	cabeza.castShadow = true;

	var gAntena0 = new THREE.CylinderGeometry( 1, 1, 25, 32 );
	var mAntena0 = new THREE.MeshStandardMaterial( {color: 0xE3D6B2} );
	var Antena0 = new THREE.Mesh( gAntena0, mAntena0 );
	Antena0.position.y = 135;
	Antena0.position.z = -15;
	Antena0.receiveShadow = true;
	Antena0.castShadow = true;

	var gAntena1 = new THREE.CylinderGeometry( 1, 1, 10, 32 );
	var mAntena1 = new THREE.MeshStandardMaterial( {color: 0x000000} );
	var Antena1 = new THREE.Mesh( gAntena1, mAntena1 );
	Antena1.position.y = 130;
	Antena1.position.x = 5;
	Antena1.position.z = -15;
	Antena1.receiveShadow = true;
	Antena1.castShadow = true;

	personaje = new THREE.Group();
	personaje.add(cuerpo, cabeza, Antena0, Antena1);
	BBPerson = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPerson.setFromObject(personaje);
	console.log(BBPerson);
	escenario.add(personaje);
    
}
function CargarModeloFBX(){
	var loader = new THREE.FBXLoader();
	loader.load( 'Modelo/marci/source/marci.fbx', function ( object ) {
		object.scale.setScalar(0.01);
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = false;
			}
		} );
		console.log(object.position);
		escenario.add( object );
	},
	(xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
	 );
}
function CargarModeloOBJArco1(){
	var loader = new THREE.OBJLoader();
	loader.load('Modelo/Arcos/Arco1/source/arch-palmyra.obj', function(object) {
	object.traverse(function(child) {

		if (child.isMesh) {
			child.material.map = textureLoader.load("Modelo/Arcos/Arco1/textures/arch-palmyra.jpeg");
			child.castShadow = true;
			child.receiveShadow = true;
		}

	});
	// queen is a mesh
	var object0 = object.clone();
	object0.scale.setScalar(25);
	object0.position.y = -20;
	object0.position.x = -200;

	object.scale.setScalar(25);
	object.position.x = 2000;
	object.position.y = -20;
	escenario.add(object0);
	escenario.add(object);

	});
}
function CargarModeloOBJArco2(){
	var loader = new THREE.OBJLoader();
	loader.load('Modelo/Arcos/Arco2/source/BlockH.obj', function(object) {
	object.traverse(function(child) {

		if (child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = true;
			
			child.material.map = textureLoader.load("Modelo/Arcos/Arco2/textures/Block_color.jpg");
		}

	});
	object.scale.setScalar(25);
	object.position.x = -250;
	object.position.y = 160;
	object.position.z = -485;
	escenario.add(object);

	});
}
function CargarModeloFBXArco3(){
	var loader = new THREE.FBXLoader();
	loader.load( 'Modelo/Arcos/Arco3/source/torii.fbx', function ( object ) {
		object.traverse( function ( child  ) {
			if ( child.isMesh  ) {
				child.material.map = textureLoader.load("Modelo/Arcos/Arco3/textures/torii_torii_BaseColor.png");
				child.material.normalMap = textureLoader.load("Modelo/Arcos/Arco3/textures/torii_torii_Normal.png");
				child.material.aoMap = textureLoader.load("Modelo/Arcos/Arco3/textures/torii_torii_AmbientOcclusion.png");
				child.material.roughnessMap = textureLoader.load("Modelo/Arcos/Arco3/textures/torii_torii_Roughness.png");

				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		object.position.x = 3000;
		object.scale.setScalar(0.6);
		escenario.add( object );
	},
	(xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loadedgaaa')
    },
    (error) => {
        console.log(error)
    }
	 );
}
function CargarModeloFBXArco4(){
	var loader = new THREE.FBXLoader();
	loader.load( 'Modelo/Arcos/Arco4/source/arch.fbx', function ( object ) {
		object.traverse( function ( child  ) {
			if ( child.isMesh  ) {
				child.material.map = textureLoader.load("Modelo/Arcos/Arco4/textures/arch_Material.002_BaseColor.png");
				child.material.normalMap = textureLoader.load("Modelo/Arcos/Arco4/textures/arch_Material.002_Normal.png");
				child.material.displacementMap = textureLoader.load("Modelo/Arcos/Arco4/textures/arch_Material.002_Metallic.png");
				child.material.roughnessMap = textureLoader.load("Modelo/Arcos/Arco4/textures/arch_Material.002_Roughness.png");
			
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		object.scale.setScalar(1.7);
		object.position.x = 5470;
		object.rotation.y = Math.PI/2;
		escenario.add( object );
	},
	(xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loadedgaaa')
    },
    (error) => {
        console.log(error)
    }
	 );
}
function CargarModeloFBXArbol0(){
	var loader = new THREE.FBXLoader();
	loader.load( 'Modelo/Arboles/Arbol0/source/oak 01.fbx', function ( object ) {
		object.scale.setScalar(5);
		object.traverse( function ( child  ) {
			if ( child.isMesh  ) {
				
				child.castShadow = true;
				child.receiveShadow = false;
			}
		} );
		object.position.x = 2400;
		object.position.z = 300;

		BBArbol1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		BBArbol1.setFromObject(object);
		BBArbol1.min.x += 60;
		BBArbol1.min.z += 60;
		BBArbol1.max.x -= 60;
		BBArbol1.max.z -= 60;

		escenario.add( object );
	},
	(xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loadedgaaa')
    },
    (error) => {
        console.log(error)
    }
	 );
}
function CargarModeloOBJArbol1(){
	var loader = new THREE.OBJLoader();
	loader.load('Modelo/Arboles/Arbol1/source/DeadTree_LoPoly.obj', function(object) {
	object.traverse(function(child) {

		if (child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = true;
			console.log( child.geometry.attributes.uv );
			child.material.map = textureLoader.load("Modelo/Arboles/Arbol1/textures/DeadTree_LoPoly_DeadTree_Diffuse.png");
			child.material.normalMap = textureLoader.load("Modelo/Arboles/Arbol1//textures/DeadTree_LoPoly_DeadTree_Normal.png");
		}

	});
	object.scale.setScalar(3);
	object.position.x = -700;
	BBArbol2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBArbol2.setFromObject(object);
	BBArbol2.min.x += 60;
	BBArbol2.min.z += 60;
	BBArbol2.max.x -= 60;
	BBArbol2.max.z -= 60;
	escenario.add(object);

	});
}
//'./Modelo/Arcos/ancient_arch.glb'
function CargarModelosGLTF(){
	// Instantiate a loader
	const loader = new THREE.GLTFLoader();

	// Optional: Provide a DRACOLoader instance to decode compressed mesh data
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath( '/three.js-master/examples/js/libs/draco' );
	loader.setDRACOLoader( dracoLoader );

	// Load a glTF resource
	loader.load(
		// resource URL
		'./Modelo/Arcos/ancient_arch.glb',
		// called when the resource is loaded
		function ( gltf ) {

			escenario.add( gltf.scene );

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( error );

		}
	);
}
function CargarModeloOBJ(){
	// instantiate a loader
	const loader = new THREE.OBJLoader();

	// load a resource
	loader.load(
	// resource URL
	'Modelo/Arcos/Arco2/source/entrance.obj',
	// called when resource is loaded
	function ( object ) {
		object.scale.setScalar(1);
		object.rotation.y = Math.PI/2;
		escenario.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( error );

	}
	);
}
function crearPisos() {
	// PISO -1
    var sandBaseColor = textureLoader.load("imagenes/txtPiso/Sand 002_COLOR.jpg");
    var sandNormalMap = textureLoader.load("imagenes/txtPiso/Sand 002_NRM.jpg");
    var sandHeightMap = textureLoader.load("imagenes/txtPiso/Sand 002_DISP.jpg");
    var sandAmbientOcclusion = textureLoader.load("imagenes/txtPiso/Sand 002_OCC.jpg");

    var gPisoMU = new THREE.PlaneGeometry(1000, 1000, 512, 512);
    var mPisoMU = new THREE.MeshStandardMaterial(
        {
            map: sandBaseColor, normalMap: sandNormalMap,
            displacementMap: sandHeightMap, displacementScale: 0.1,
            aoMap: sandAmbientOcclusion, 
			side: THREE.DoubleSide 
        })
    wrapAndRepeatTexture(mPisoMU.map)
    wrapAndRepeatTexture(mPisoMU.normalMap)
    wrapAndRepeatTexture(mPisoMU.displacementMap)
    wrapAndRepeatTexture(mPisoMU.aoMap)

    var PisoMU = new THREE.Mesh(gPisoMU, mPisoMU);
	PisoMU.castShadow = false;
    PisoMU.receiveShadow = true;
	PisoMU.position.x = -700;
    PisoMU.rotation.x = Math.PI / 2;


	// PISO 0

    var gPiso0 = new THREE.PlaneGeometry(2200, 2200, 512, 512);
    var mPiso0 = new THREE.MeshStandardMaterial(
        {
            map: sandBaseColor, normalMap: sandNormalMap,
            displacementMap: sandHeightMap, displacementScale: 0.1,
            aoMap: sandAmbientOcclusion, 
			side: THREE.DoubleSide 
        })
    wrapAndRepeatTexture(mPiso0.map)
    wrapAndRepeatTexture(mPiso0.normalMap)
    wrapAndRepeatTexture(mPiso0.displacementMap)
    wrapAndRepeatTexture(mPiso0.aoMap)

    var Piso0 = new THREE.Mesh(gPiso0, mPiso0);
	Piso0.castShadow = false;
    Piso0.receiveShadow = true;
	Piso0.position.x = 900;
    Piso0.rotation.x = Math.PI / 2;
	
	// PISO 1
	var p1BaseColor = textureLoader.load("imagenes/txtPiso1/Stone_Path_006_basecolor.jpg");
    var p1NormalMap = textureLoader.load("imagenes/txtPiso1/Stone_Path_006_normal.jpg");
    var p1HeightMap = textureLoader.load("imagenes/txtPiso1/Stone_Path_006_height.png");
	var p1RoughMap  = textureLoader.load("imagenes/txtPiso1/Stone_Path_006_roughness.jpg")
    var p1AmbientOcclusion = textureLoader.load("imagenes/txtPiso1/Stone_Path_006_ambientOcclusion.jpg");

    var gPiso1 = new THREE.PlaneGeometry(2600, 2600, 512, 512);
    var mPiso1 = new THREE.MeshStandardMaterial(
        {
            map: p1BaseColor, normalMap: p1NormalMap,
            displacementMap: p1HeightMap, displacementScale: 0.1,
			roughnessMap : p1RoughMap,
            aoMap: p1AmbientOcclusion, 
			side: THREE.DoubleSide 
        })
    wrapAndRepeatTexture(mPiso1.map)
    wrapAndRepeatTexture(mPiso1.normalMap)
    wrapAndRepeatTexture(mPiso1.displacementMap)
	wrapAndRepeatTexture(mPiso1.roughnessMap)
    wrapAndRepeatTexture(mPiso1.aoMap)

    var Piso1 = new THREE.Mesh(gPiso1, mPiso1);
	Piso1.castShadow = false;
    Piso1.receiveShadow = true;
	Piso1.position.x = 4100;
    Piso1.rotation.x = Math.PI / 2;

	// PISO GRASS0
	var pgBaseColor = textureLoader.load("imagenes/txtPisoGrass/Grass001_1K_Color.jpg");
    var pgNormalMap = textureLoader.load("imagenes/txtPisoGrass/Grass001_1K_NormalGL.jpg");
    var pgHeightMap = textureLoader.load("imagenes/txtPisoGrass/Grass001_1K_Displacement.jpg");
	var pgRoughMap  = textureLoader.load("imagenes/txtPisoGrass/Grass001_1K_Roughness.jpg")
    var pgAmbientOcclusion = textureLoader.load("imagenes/txtPisoGrass/Grass001_1K_AmbientOcclusion.jpg");

    var gPisog = new THREE.PlaneGeometry(800, 1000, 512, 512);
    var mPisog = new THREE.MeshStandardMaterial(
        {
            map: pgBaseColor, normalMap: pgNormalMap,
            displacementMap: pgHeightMap, displacementScale: 0.1,
			roughnessMap : pgRoughMap,
            aoMap: pgAmbientOcclusion, 
			side: THREE.DoubleSide 
        })
    wrapAndRepeatTexture(mPisog.map)
    wrapAndRepeatTexture(mPisog.normalMap)
    wrapAndRepeatTexture(mPisog.displacementMap)
	wrapAndRepeatTexture(mPisog.roughnessMap)
    wrapAndRepeatTexture(mPisog.aoMap)

    var PisoG = new THREE.Mesh(gPisog, mPisog);
	PisoG.castShadow = false;
    PisoG.receiveShadow = true;
	PisoG.position.x = 2400;
	PisoG.position.y = -0.5;
    PisoG.rotation.x = Math.PI / 2;
	

	// PISO CAMINO
	var pcBaseColor = textureLoader.load("imagenes/txtCamino/PavingStones050_1K_Color.jpg");
    var pcNormalMap = textureLoader.load("imagenes/txtCamino/PavingStones050_1K_NormalGL.jpg");
    var pcHeightMap = textureLoader.load("imagenes/txtCamino/PavingStones050_1K_Displacement.jpg");
	var pcRoughMap  = textureLoader.load("imagenes/txtCamino/PavingStones050_1K_Roughness.jpg")
    var pcAmbientOcclusion = textureLoader.load("imagenes/txtCamino/PavingStones050_1K_AmbientOcclusion.jpg");

    var gPisoc = new THREE.PlaneGeometry(800, 200, 512, 512);
    var mPisoc = new THREE.MeshStandardMaterial(
        {
            map: pcBaseColor, normalMap: pcNormalMap,
            displacementMap: pcHeightMap, displacementScale: 0.1,
			roughnessMap : pcRoughMap,
            aoMap: pcAmbientOcclusion, 
			side: THREE.DoubleSide 
        })

    var PisoC = new THREE.Mesh(gPisoc, mPisoc);
	PisoC.castShadow = false;
    PisoC.receiveShadow = true;
	PisoC.position.x = 2400;
    PisoC.rotation.x = Math.PI / 2;

	var gPisoc1 = new THREE.PlaneGeometry(500, 500, 512, 512);
    var mPisoc1 = new THREE.MeshStandardMaterial(
        {
            map: pcBaseColor, normalMap: pcNormalMap,
            displacementMap: pcHeightMap, displacementScale: 0.1,
			roughnessMap : pcRoughMap,
            aoMap: pcAmbientOcclusion, 
			side: THREE.DoubleSide 
        })

    var Pisoc1 = new THREE.Mesh(gPisoc1, mPisoc1);
	Pisoc1.castShadow = false;
    Pisoc1.receiveShadow = true;
	Pisoc1.position.x = 5650;
    Pisoc1.rotation.x = Math.PI / 2;

	escenario.add(PisoMU);
    escenario.add(Piso0);
	escenario.add(Piso1);
	escenario.add(PisoG);
	escenario.add(PisoC);
	escenario.add(Pisoc1);
}

function wrapAndRepeatTexture (map) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.repeat.x = 2;
	map.repeat.y = 2;
}
function wrapAndRepeatTextureLab0 (map, dx, dz) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping
	map.repeat.x = dx/300;
	map.repeat.y = dz/300;
}
function crearPared(dx, dy, dz, posx, posy, posz){

		var gPared = new THREE.BoxBufferGeometry( dx, dy, dz );
		var mPared = new THREE.MeshStandardMaterial(
			{
				map: pBaseColorLab0, normalMap: pNormalMapLab0,
				displacementMap: pHeightMapLab0, displacementScale: 0.1,
				roughnessMap : pRoughMapLab0,
				aoMap: pAmbientOcclusionLab0, 
				side: THREE.DoubleSide 
			})
		wrapAndRepeatTextureLab0(mPared.map, dx, dz)
		wrapAndRepeatTextureLab0(mPared.normalMap, dx, dz)
		wrapAndRepeatTextureLab0(mPared.displacementMap, dx, dz)
		wrapAndRepeatTextureLab0(mPared.roughnessMap, dx, dz)
		wrapAndRepeatTextureLab0(mPared.aoMap, dx, dz)
	
		var Pared = new THREE.Mesh( gPared, mPared );
		Pared.castShadow = true;
		Pared.receiveShadow = true;
		Pared.position.x = posx;
		Pared.position.y = posy;
		Pared.position.z = posz;
		
		return Pared;
}
function crearZonaInicio() {

	//. PAREDES HORIZONTALES .....................................
	var Pared0ZI = crearPared(1000, 150, 400, -700, 75, -700);
	BBPared0ZI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared0ZI.setFromObject(Pared0ZI);
	escenario.add(Pared0ZI);

	var Pared1ZI = crearPared(1000, 150, 400, -700, 75, 700);
	BBPared1ZI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared1ZI.setFromObject(Pared1ZI);
	escenario.add(Pared1ZI)

	var Pared2ZI = crearPared(400, 150, 1800, -1400, 75, 0);
	BBPared2ZI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared2ZI.setFromObject(Pared2ZI);
	escenario.add(Pared2ZI);
}
function crearLaberinto0() {

	//. PAREDES HORIZONTALES .....................................
	var Pared0 = crearPared(1800, 150, 200, 900, 75, -1000);
	BBPared0 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared0.setFromObject(Pared0);

	var Pared1 = crearPared(1000, 150, 200, 700, 75, -600);
	BBPared1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared1.setFromObject(Pared1);

	var Pared2 = crearPared(400, 150, 200, 200, 75, -200);
	BBPared2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared2.setFromObject(Pared2);

	var Pared3 = crearPared(800, 150, 200, 1400, 75, -200);
	BBPared3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared3.setFromObject(Pared3);

	var Pared4 = crearPared(800, 150, 200, 400, 75, 200);
	BBPared4 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared4.setFromObject(Pared4);

	var Pared5 = crearPared(400, 150, 200, 1600, 75, 200);
	BBPared5 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared5.setFromObject(Pared5);

	var Pared6 = crearPared(600, 150, 200, 900, 75, 600);
	BBPared6 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared6.setFromObject(Pared6);

	var Pared7 = crearPared(1800, 150, 200, 900, 75, 1000);
	BBPared7 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared7.setFromObject(Pared7);

	escenario.add(Pared0);
	escenario.add(Pared1);
	escenario.add(Pared2);
	escenario.add(Pared3);
	escenario.add(Pared4);
	escenario.add(Pared5);
	escenario.add(Pared6);
	escenario.add(Pared7);

	//. PAREDES VERTICALES .....................................

	var Pared8 = crearPared(200, 150, 1000, -100, 75, -600);
	BBPared8 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared8.setFromObject(Pared8);

	var Pared9 = crearPared(200, 150, 1000, -100, 75, 600);
	BBPared9 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared9.setFromObject(Pared9);

	var Pared10 = crearPared(200, 150, 200, 300, 75, -400);
	BBPared10 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared10.setFromObject(Pared10);

	var Pared11 = crearPared(200, 150, 400, 300, 75, 500);
	BBPared11 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared11.setFromObject(Pared11);

	var Pared12 = crearPared(200, 150, 400, 700, 75, -100);
	BBPared12 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared12.setFromObject(Pared12);

	var Pared13 = crearPared(200, 150, 600, 1100, 75, 200);
	BBPared13 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared13.setFromObject(Pared13);

	var Pared14 = crearPared(200, 150, 400, 1500, 75, -500);
	BBPared14 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared14.setFromObject(Pared14);

	var Pared15 = crearPared(200, 150, 400, 1500, 75, 700);
	BBPared15 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared15.setFromObject(Pared15);

	var Pared16 = crearPared(200, 150, 1000, 1900, 75, -600);
	BBPared16 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared16.setFromObject(Pared16);

	var Pared17 = crearPared(200, 150, 1000, 1900, 75, 600);
	BBPared17 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared17.setFromObject(Pared17);

	escenario.add(Pared8);
	escenario.add(Pared9);
	escenario.add(Pared10);
	escenario.add(Pared11);
	escenario.add(Pared12);
	escenario.add(Pared13);
	escenario.add(Pared14);
	escenario.add(Pared15);
	escenario.add(Pared16);
	escenario.add(Pared17);
}


function crearParedesLab1(dx, dy, dz, posx, posy, posz){

    var gPared = new THREE.BoxBufferGeometry( dx, dy, dz );
    var mPared = new THREE.MeshStandardMaterial(
        {
            map: pBaseColorLab1, normalMap: pNormalMapLab1,
            displacementMap: pHeightMapLab1, displacementScale: 0.1,
			roughnessMap : pRoughMapLab1,
            aoMap: pAmbientOcclusionLab1, 
			side: THREE.DoubleSide 
        })
		wrapAndRepeatTextureLab1(mPared.map, dx, dz)
		wrapAndRepeatTextureLab1(mPared.normalMap, dx, dz)
		wrapAndRepeatTextureLab1(mPared.displacementMap, dx, dz)
		wrapAndRepeatTextureLab1(mPared.roughnessMap, dx, dz)
		wrapAndRepeatTextureLab1(mPared.aoMap, dx, dz)
    

	var Pared = new THREE.Mesh( gPared, mPared );
	Pared.castShadow = true;
	Pared.receiveShadow = true;
	Pared.position.x = posx;
	Pared.position.y = posy;
	Pared.position.z = posz;
    
	return Pared;
}

function wrapAndRepeatTextureLab1 (map, dx, dz) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping
	map.repeat.x = dx/300;
	map.repeat.y = dz/300;
}

function crearZonaMedia() {

	//. PAREDES HORIZONTALES .....................................
	var Pared0ZM = crearParedesLab1(800, 150, 400, 2400, 75, -700);
	BBPared0ZM = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared0ZM.setFromObject(Pared0ZM);
	escenario.add(Pared0ZM);

	var Pared1ZM = crearParedesLab1(800, 150, 400, 2400, 75, 700);
	BBPared1ZM = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared1ZM.setFromObject(Pared1ZM);
	escenario.add(Pared1ZM)
}

function crearLaberinto1() {

	//. PAREDES HORIZONTALES .....................................
	var Pared0Lab1 = crearParedesLab1(2200, 150, 200, 4100, 75, -1200);
    BBPared0Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared0Lab1.setFromObject(Pared0Lab1);
	
	var Pared1Lab1 = crearParedesLab1(1000, 150, 200, 3700, 75, -800);
    BBPared1Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared1Lab1.setFromObject(Pared1Lab1);

	var Pared2Lab1 = crearParedesLab1(600, 150, 200, 4700, 75, -800);
    BBPared2Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared2Lab1.setFromObject(Pared2Lab1);

	var Pared3Lab1 = crearParedesLab1(400, 150, 200, 3400, 75, -400);
    BBPared3Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared3Lab1.setFromObject(Pared3Lab1);

	var Pared4Lab1 = crearParedesLab1(1200, 150, 200, 4600, 75, -400);
    BBPared4Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared4Lab1.setFromObject(Pared4Lab1);

	var Pared5Lab1 = crearParedesLab1(1200, 150, 200, 4400, 75, 0);
    BBPared5Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared5Lab1.setFromObject(Pared5Lab1);

	var Pared6Lab1 = crearParedesLab1(800, 150, 200, 4200, 75, 400);
    BBPared6Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared6Lab1.setFromObject(Pared6Lab1);
	
	var Pared7Lab1 = crearParedesLab1(400, 150, 200, 4000, 75, 800);
    BBPared7Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared7Lab1.setFromObject(Pared7Lab1);

	var Pared8Lab1 = crearParedesLab1(400, 150, 200, 4800, 75, 800);
    BBPared8Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared8Lab1.setFromObject(Pared8Lab1);
	
	var Pared9Lab1 = crearParedesLab1(2200, 150, 200, 4100, 75, 1200);
    BBPared9Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared9Lab1.setFromObject(Pared9Lab1);
	
	escenario.add(Pared0Lab1);
	escenario.add(Pared1Lab1);	
	escenario.add(Pared2Lab1);
	escenario.add(Pared3Lab1);
	escenario.add(Pared4Lab1);
	escenario.add(Pared5Lab1);
	escenario.add(Pared6Lab1);
	escenario.add(Pared7Lab1);
	escenario.add(Pared8Lab1);
	escenario.add(Pared9Lab1);

	//. PAREDES VERTICALES .....................................

	var Pared10Lab1 = crearParedesLab1(200, 150, 1200, 2900, 75, -700);
	BBPared10Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared10Lab1.setFromObject(Pared10Lab1);

	var Pared11Lab1 = crearParedesLab1(200, 150, 1200, 2900, 75, 700);
	BBPared11Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared11Lab1.setFromObject(Pared11Lab1);
	
	var Pared12Lab1 = crearParedesLab1(200, 150, 1200, 3300, 75, 300);
	BBPared12Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared12Lab1.setFromObject(Pared12Lab1);

	var Pared13Lab1 = crearParedesLab1(200, 150, 1400, 3700, 75, 200);
	BBPared13Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared13Lab1.setFromObject(Pared13Lab1);

	var Pared14Lab1 = crearParedesLab1(200, 150, 200, 4100, 75, -600);
	BBPared14Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared14Lab1.setFromObject(Pared14Lab1);

	var Pared15Lab1 = crearParedesLab1(200, 150, 200, 4500, 75, -1000);
	BBPared15Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared15Lab1.setFromObject(Pared15Lab1);

	var Pared16Lab1 = crearParedesLab1(200, 150, 600, 4500, 75, 800);
	BBPared16Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared16Lab1.setFromObject(Pared16Lab1);

	var Pared17Lab1 = crearParedesLab1(200, 150, 400, 4900, 75, 300);
	BBPared17Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared17Lab1.setFromObject(Pared17Lab1);

	var Pared18Lab1 = crearParedesLab1(200, 150, 1200, 5300, 75, -700);
	BBPared18Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared18Lab1.setFromObject(Pared18Lab1);

	var Pared19Lab1 = crearParedesLab1(200, 150, 1200, 5300, 75, 700);
	BBPared19Lab1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared19Lab1.setFromObject(Pared19Lab1);

	escenario.add(Pared19Lab1);
	escenario.add(Pared18Lab1);
	escenario.add(Pared17Lab1);
	escenario.add(Pared16Lab1);
	escenario.add(Pared15Lab1);
	escenario.add(Pared14Lab1);
	escenario.add(Pared13Lab1)
	escenario.add(Pared12Lab1);
	escenario.add(Pared10Lab1);
	escenario.add(Pared11Lab1);
}
function crearZonaFinal() {

	//. PAREDES HORIZONTALES .....................................
	var Pared0FI = crearParedesLab1(500, 150, 400, 5650, 75, -400);
	BBPared0FI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared0FI.setFromObject(Pared0FI);
	escenario.add(Pared0FI);

	var Pared1FI = crearParedesLab1(500, 150, 400, 5650, 75, 400);
	BBPared1FI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	BBPared1FI.setFromObject(Pared1FI);
	escenario.add(Pared1FI)
}
function Detener(BBPared, dir){
	if( (BBPerson.min.z <= BBPared.min.z) &&
		(BBPerson.max.z <= BBPared.max.z) && 
		(BBPerson.min.x >= BBPared.min.x) && 
		(BBPerson.max.x <= BBPared.max.x) ){
		if(dir.z <= 0)
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z >= BBPared.min.z) &&
		(BBPerson.max.z >= BBPared.max.z) && 
		(BBPerson.min.x >= BBPared.min.x) && 
		(BBPerson.max.x <= BBPared.max.x) ){
		if(dir.z >= 0)
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z >= BBPared.min.z) &&
		(BBPerson.max.z <= BBPared.max.z) && 
		(BBPerson.min.x <= BBPared.min.x) && 
		(BBPerson.max.x <= BBPared.max.x) ){
		if(dir.x <= 0)
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z >= BBPared.min.z) &&
		(BBPerson.max.z <= BBPared.max.z) && 
		(BBPerson.min.x >= BBPared.min.x) && 
		(BBPerson.max.x >= BBPared.max.x) ){
		if(dir.x >= 0)
			return false;
		else
			return true;
	}
	// ESQUINASAA
	else if( (BBPerson.min.z <= BBPared.min.z) &&
		(BBPerson.max.z <= BBPared.max.z) && 
		(BBPerson.min.x <= BBPared.min.x) && 
		(BBPerson.max.x <= BBPared.max.x) ){
		if((dir.x >= 0 && dir.z <= 0) || (dir.x <= 0 && dir.z >= 0) || (dir.x <= 0 && dir.z <= 0))
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z >= BBPared.min.z) &&
		(BBPerson.max.z >= BBPared.max.z) && 
		(BBPerson.min.x <= BBPared.min.x) && 
		(BBPerson.max.x <= BBPared.max.x) ){
		if((dir.x <= 0 && dir.z <= 0) || (dir.x >= 0 && dir.z >= 0) || (dir.x <= 0 && dir.z >= 0))
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z <= BBPared.min.z) &&
		(BBPerson.max.z <= BBPared.max.z) && 
		(BBPerson.min.x >= BBPared.min.x) && 
		(BBPerson.max.x >= BBPared.max.x) ){
		if((dir.x <= 0 && dir.z <= 0) || (dir.x >= 0 && dir.z >= 0) || (dir.x >= 0 && dir.z <= 0))
			return false;
		else
			return true;
	}
	else if( (BBPerson.min.z >= BBPared.min.z) &&
		(BBPerson.max.z >= BBPared.max.z) && 
		(BBPerson.min.x >= BBPared.min.x) && 
		(BBPerson.max.x >= BBPared.max.x) ){
		if((dir.x >= 0 && dir.z <= 0) || (dir.x <= 0 && dir.z >= 0) || (dir.x >= 0 && dir.z >= 0))
			return false;
		else
			return true;
	}
	else
		return true;
}
function checkCollisions(dir){
	
	// ZON INI
	if(BBPerson.intersectsBox(BBPared0ZI)){
		if(BBPerson.intersectsBox(BBPared2ZI)){
			if((dir.x >= 0 && dir.z >= 0))
				return false;
			else
				return true;
		}
		else if(BBPerson.intersectsBox(BBPared8)){
			if((dir.x <= 0 && dir.z >= 0))
				return false;
			else
				return true;
		}
		else
			return Detener(BBPared0ZI, dir);
	}
	else if(BBPerson.intersectsBox(BBPared1ZI)){
		if(BBPerson.intersectsBox(BBPared2ZI)){
			if((dir.x >= 0 && dir.z <= 0))
				return false;
			else
				return true;
		}
		else if(BBPerson.intersectsBox(BBPared9)){
			if((dir.x <= 0 && dir.z <= 0))
				return false;
			else
				return true;
		}
		else
			return Detener(BBPared1ZI, dir);
	}
	else if(BBPerson.intersectsBox(BBPared2ZI)){
		return Detener(BBPared2ZI, dir);
	}
	
	else if(BBArbol2 != undefined && BBPerson.intersectsBox(BBArbol2) ){
		return Detener(BBArbol2, dir);
	}
	// LAB 1
	else if(BBPerson.intersectsBox(BBPared0)){
		return Detener(BBPared0, dir);
	}
	else if(BBPerson.intersectsBox(BBPared1)){
		return Detener(BBPared1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared2)){
		return Detener(BBPared2, dir);
	}
	else if(BBPerson.intersectsBox(BBPared3)){
		return Detener(BBPared3, dir);
	}
	else if(BBPerson.intersectsBox(BBPared4)){
		return Detener(BBPared4, dir);
	}
	else if(BBPerson.intersectsBox(BBPared5)){
		return Detener(BBPared5, dir);
	}
	else if(BBPerson.intersectsBox(BBPared6)){
		return Detener(BBPared6, dir);
	}
	else if(BBPerson.intersectsBox(BBPared7)){
		return Detener(BBPared7, dir);
	}
	else if(BBPerson.intersectsBox(BBPared8)){
		return Detener(BBPared8, dir);
	}
	else if(BBPerson.intersectsBox(BBPared9)){
		return Detener(BBPared9, dir);
	}
	else if(BBPerson.intersectsBox(BBPared10)){
		return Detener(BBPared10, dir);
	}
	else if(BBPerson.intersectsBox(BBPared11)){
		return Detener(BBPared11, dir);
	}
	else if(BBPerson.intersectsBox(BBPared12)){
		return Detener(BBPared12, dir);
	}
	else if(BBPerson.intersectsBox(BBPared13)){
		return Detener(BBPared13, dir);
	}
	else if(BBPerson.intersectsBox(BBPared14)){
		return Detener(BBPared14, dir);
	}
	else if(BBPerson.intersectsBox(BBPared15)){
		return Detener(BBPared15, dir);
	}
	else if(BBPerson.intersectsBox(BBPared16)){
		return Detener(BBPared16, dir);
	}
	else if(BBPerson.intersectsBox(BBPared17)){
		return Detener(BBPared17, dir);
	}

	// ZON MED
	if(BBPerson.intersectsBox(BBPared0ZM)){
		return Detener(BBPared0ZM, dir);
	}
	else if(BBPerson.intersectsBox(BBPared1ZM)){
		return Detener(BBPared1ZM, dir);
	}
	else if(BBArbol1 != undefined && BBPerson.intersectsBox(BBArbol1) ){
		return Detener(BBArbol1, dir);
	}

	// LAB 2
	else if(BBPerson.intersectsBox(BBPared0Lab1)){
		return Detener(BBPared0Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared1Lab1)){
		return Detener(BBPared1Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared2Lab1)){
		return Detener(BBPared2Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared3Lab1)){
		return Detener(BBPared3Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared4Lab1)){
		return Detener(BBPared4Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared5Lab1)){
		return Detener(BBPared5Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared6Lab1)){
		return Detener(BBPared6Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared7Lab1)){
		return Detener(BBPared7Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared8Lab1)){
		return Detener(BBPared8Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared9Lab1)){
		return Detener(BBPared9Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared10Lab1)){
		return Detener(BBPared10Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared11Lab1)){
		return Detener(BBPared11Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared12Lab1)){
		return Detener(BBPared12Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared13Lab1)){
		return Detener(BBPared13Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared14Lab1)){
		return Detener(BBPared14Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared15Lab1)){
		return Detener(BBPared15Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared16Lab1)){
		return Detener(BBPared16Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared17Lab1)){
		return Detener(BBPared17Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared18Lab1)){
		return Detener(BBPared18Lab1, dir);
	}
	else if(BBPerson.intersectsBox(BBPared19Lab1)){
		return Detener(BBPared19Lab1, dir);
	}
	// ZON FIN
	if(BBPerson.intersectsBox(BBPared0FI)){
		return Detener(BBPared0FI, dir);
	}
	else if(BBPerson.intersectsBox(BBPared1FI)){
		return Detener(BBPared1FI, dir);
	}
	else
		return false;
}
// (B) CONFIRM
function ContinuarLab2() {
	if (confirm("Subir de nivel?")) { 
		return true; 
	}
	else
		return false;
  }
var meta = 2200;
var mouse = true;
function animate()
{
	var dt = clock.getDelta();
	
	var dir = new THREE.Vector3(5,0,0);
	dir.multiplyScalar (dt*speed);	//dir *= dt*speed;
	dir.applyAxisAngle (new THREE.Vector3(0,1,0), angle);	
	if (personaje != undefined) {
		if(!checkCollisions(dir))
			pos.add (dir);
		
		personaje.position.set(pos.x, pos.y, pos.z);
		personaje.rotation.y = (angle+Math.PI/2);
		// Actulizamos espacio del contenedordel personaje
		BBPerson.min.x = pos.x - 50;
		BBPerson.min.z = pos.z - 50;
		BBPerson.max.x = pos.x + 50;
		BBPerson.max.z = pos.z + 50;
		
		var relativeCameraOffset = new THREE.Vector3 (0, 1000,-450);

		var cameraOffset = relativeCameraOffset.applyMatrix4( personaje.matrixWorld );

		// posicion de camara
		if(mouse){
			orbitcontrols.target.copy( personaje.position ).add( cameraOffset );
			orbitcontrols.update();
			mouse = false
		}
		else{
			camara.position.x = cameraOffset.x;
			camara.position.y = cameraOffset.y;
			camara.position.z = cameraOffset.z;
			camara.lookAt( personaje.position );
		}
		
	}  
	update();
	render();
	requestAnimationFrame ( animate );  
	
}

var pausa  = false;
function update()
{
	//orbitcontrols.update();
	keyboard.update();
	speed = 0;
    //if ( keyboard.up("enter") ) pausa = !pausa;
		
	if(!pausa){
		speed = 0;
		/* if (cuerpo != undefined)
			cuerpo.rotation.x += 0.05;  */ 
		if (keyboard.pressed("ctrl"))
			mouse = true;       
		if ( keyboard.pressed("a") ) 
			angle += 0.07;
						
		if ( keyboard.pressed("d") )  
			angle -= 0.07;               
		if ( keyboard.pressed("w") ) {
			if(pos.x >= meta && meta == 2200){
				speed = 0;
				if(ContinuarLab2()){
					meta = 5400;
				}
				else
					window.alert('FIN LABERINTO NIVEL 1...');
			}
			else if(pos.x >= meta && meta == 5400){
				speed = 0;
				window.alert('FELICIDADES TERMINASTE...');
			}
			else{
				speed = 100;
				cuerpo.rotation.x += 0.2;
			}
			
		}
	}
	

           	
}

function render()
{
	lienzo.render (escenario, camara);
}