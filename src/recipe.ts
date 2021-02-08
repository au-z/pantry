const recipes = [
	{
		name: 'Wheat Bread',
		description: 'Easy wheat bread. Makes a 12 slice round loaf.',
		ingredients: [
			{iid: 'flour.wheat', name: 'wheat flour', qty: 2, unit: 'cu'},
			{iid: 'flour.all_purpose', name: 'all purpose flour', qty: 2, unit: 'cu', subs: ['flour:wheat']},
			{iid: 'salt', name: 'salt', qty: 2, unit: 'tsp', variable: true},
			{iid: 'yeast.active_dry', name: 'active dry yeast', qty: 0.75, unit: 'tsp'},
			{iid: 'water', name: 'water', qty: 2, unit: 'cu'},
		],
		directions: [
			"In a large bowl, combine ${flour.wheat:0.5}, ${flour.all_purpose}, ${salt}, and ${yeast.active_dry}.",
			"Mix in ${water} and stir well to combine into a ball of dough.",
			"Cover and let sit to rise for 12 to 18 hrs.",
			"Preheat dutch oven at 425F.",
			"Flour a surface and gently form dough into a ball shape.",
			"Place in pre-heated dutch oven.",
			"Bake 30 mins covered, remove lid, then rbake for another 10 mins.",
		]
	}
]

export {
	recipes,
}