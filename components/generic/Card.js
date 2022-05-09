const Card = ({ children }) => {
	return (
		<div className="p-4 bg-gray-100 rounded-sm hover:shadow-md hover:bg-gray-200 transition-colors">
			{children}
		</div>
	);
};

export default Card;
