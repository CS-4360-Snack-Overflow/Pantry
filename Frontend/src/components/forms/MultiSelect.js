import Select, { components, GroupProps } from 'react-select';


const groupStyles = {
	color: 'white',
	background: "orange",
	padding: '5px 0px',
	display: 'flex',
  };

export const MultiSelectWithCategories = ({
	addOption = () => {},
	tags = [
		{
			label: 'Meal',
			options: [
				{value:"Breakfast", label:"Breakfast"},
				{value:"Lunch", label:"Lunch"},
				{value:"Dinner", label:"Dinner"},
				{value:"Dessert", label:"Dessert"}			
			]
		},
		{
			label: 'Diet',
			options: [
				{value:"Vegan", label:"Vegan"},
				{value:"Vegetarian", label:"Vegetarian"},
				{value:"Keto", label:"Keto"},
				{value:"Paleo", label:"Paleo"},
				{value:"Low-Carb", label:"Low-Carb"},
				{value:"Low-Sugar", label:"Low-Sugar"}
			]
		},
		{
			label: 'Cuisine',
			options: [
				{value:"Mexican", label:"Mexican"},
				{value:"American", label:"American"},
				{value:"Chinese", label:"Chinese"},
				{value:"Indian", label:"Indian"},
				{value:"Italian", label:"Italian"}			]
		},
		{
			label: 'Allergies',
			options: [
				{value:"Peanut-Free", label:"Peanut-Free"},
				{value:"Dairy-Free", label:"Dairy-Free"},
				{value:"Gluten-Free", label:"Gluten-Free"}
			]
		},
	]
}) => {
	
	const groupStyles = {
		background: '#f2fcff',
	}; 
	  const Group = (props) => (
		<div style={groupStyles}>
		  <components.Group {...props} />
		</div>
	  );
	const setValue = (selectedOption) => {
		addOption(selectedOption.value)
	}
	return (
		<Select
			onChange={setValue}
			options={tags} 
			closeMenuOnSelect={true}
			placeholder={"Select some tags ... "}
			
			styles={groupStyles}
		/>
	);
};