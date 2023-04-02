import tw from "twin.macro";
export const tags = {
	"Meal": ["Breakfast", "Lunch", "Dinner", "Dessert"],
	"Diet": ["Vegan", "Vegetarian", "Keto", "Paleo", "Low-Carb", "Low-Sugar"],
	"Cuisine": ["Mexican", "American", "Chinese", "Indian", "Italian"],
	"Restrictions": ["Dairy-Free", "Gluten-Free"],
	"Type": ["Stove Top", "Oven"]
	}
	
export const MultiSelectWithCategories = ({
	options = {
		"Meal": ["Breakfast", "Lunch", "Dinner", "Dessert"],
		"Diet": ["Vegan", "Vegetarian", "Keto", "Paleo", "Low-Carb", "Low-Sugar"],
		"Cuisine": ["Mexican", "American", "Chinese", "Indian", "Italian"],
		"Restrictions": ["Dairy-Free", "Gluten-Free"],
		"Type": ["Stove Top", "Oven"]
		}
}) => {
	const Container = tw.div`flex justify-center`
	const Content = tw.div`mb-3 xl:w-96`
	
	return (
	<Container>
		<Content>
		<div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select data-te-select-init multiple>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
    </select>
  </div>
</div>
		{/* <select data-te-select-init multiple>
			<option>ALKSFJLKJAF</option>
			{Object.keys(options).map((group, index) => {
				<optgroup label={group}>

				</optgroup>
				options[group].map((option) => {
					console.log(option)})})}
			{Object.keys(options).map((group, index)=>{
				<optgroup label={group} key={index}>
					{options[group].map((option, key) => {
						<option value={option}>{option}</option>
					})}
				</optgroup>
			})}
		</select> */}
		</Content>
	</Container>
)}