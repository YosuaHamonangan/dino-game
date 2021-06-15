interface assetInfo {
    type: string; 
    name: string; 
    path: string
}

var assets:assetInfo[] = [
	...Array(8).fill(0).map( (n,i) => ({ 
		type: 'image',
		name: `dino-run-${i+1}`,
		path: `assets/img/Dino/Run (${i+1}).png`
	}) ),
	...Array(10).fill(0).map( (n,i) => ({ 
		type: 'image',
		name: `dino-idle-${i+1}`,
		path: `assets/img/Dino/Idle (${i+1}).png`
	}) ),
	...Array(12).fill(0).map( (n,i) => ({ 
		type: 'image',
		name: `dino-jump-${i+1}`,
		path: `assets/img/Dino/Jump (${i+1}).png`
	}) ),
	{ 
		type: 'image',
		name: 'ground',
		path: 'assets/img/Env/Tiles/2.png'
	},
	{ 
		type: 'image',
		name: 'tree',
		path: 'assets/img/Env/Object/Tree_2.png'
	}
];

export default assets;