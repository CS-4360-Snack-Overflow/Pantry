
export async function getRecipes () {
	const res = await fetch("/recipes")
	return await res.json()

}
