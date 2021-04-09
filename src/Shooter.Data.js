Shooter.Data = {
	Hitman: {
		radius: Shooter.mapBoxSide/2-2, // (Shooter.mapBoxSide/2-4),
		speed: 10,
		fireRate: 300,
		health: 1000,
		range: 1000,
	},

	Enemy: {
		moveRate: 50,
		
	},

	Projectile: {
		radius: 1,
		speed: 15,
		damage: 250,
		color: "#000000",
	},

	Box: {
		health: Infinity,
	},

	Crate: {
		health: Infinity,
	},

	HealthCrate: {
		healthBonus: 250,
	},

	Player: {
		health: Shooter.playerHealth, //Infinity, //1000,
		fireRate: 150,
		speed: 15,
	},
}


