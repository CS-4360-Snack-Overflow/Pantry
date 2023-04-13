import tw from "twin.macro";
import Select, { components, GroupProps } from 'react-select';
import {useState, useEffect} from "react"

const groupStyles = {
	color: 'white',
	background: "orange",
	padding: '5px 0px',
	display: 'flex',
  };

const Container = tw.div`w-full`
export const MultiSelectWithCategories = ({
	addOption = () => {},
	tags = {
		"Meal": [
			"Breakfast",
			"Lunch",
			"Dinner",
			"Dessert"
		],
		"Diet": [
			"Vegan", 
			"Vegetarian",
			"Keto",
			"Paleo",
			"Low-Carb",
			"Low-Sugar"
		],	
		"Cuisine": [
			"Mexican", 
			"American", 
			"Chinese", 
			"Indian", 
			"Italian"
		],
		"Allergies": [
			"Peanut-Free",
			"Dairy-Free",
			"Gluten-Free"
		]	
	}
}) => {
	
	const [checkboxesVisible, setVisible] = useState(false)
	const showCheckboxes = () => {
		setVisible(!checkboxesVisible)
	}	
	return (
		<div>
			<Container onClick={showCheckboxes}>
				<h1>SHOW</h1>
			</Container>
			<div hidden={!checkboxesVisible}>
				<ul>
					{Object.keys(tags).map((group, index) => (
						<div key={index}>
							<h1 >{group}</h1>
							{Object.keys(tags[group]).map((option) => (
								<li>{option}</li>
							))}	
						</div>
					))}
				</ul>
			</div>
		</div>
		// <Select 
		// 	options={tags} 
		// 	isMulti={true}>
		// 	styles={groupStyles}
		// </Select>
	)}