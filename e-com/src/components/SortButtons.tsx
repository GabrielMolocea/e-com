import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../redux/sort/sortSlice";
import { selectSortBy } from "../redux/selector";

const SortButtons = () => {
	const dispatch = useDispatch();
	const active = useSelector(selectSortBy)

	return (
		<div className="flex items-center px-8 py-4 shadow-lg">
			<span className="text-lg mr-6 font-medium text-gray-800">Sort by</span>
			<button
				className={`px-4 py-1 rounded-xl text-lg font-medium mr-4 transition-colors
          ${
											active === "price"
												? "bg-[#07405A] text-white shadow border-2 border-[#07405A]"
												: "bg-white text-gray-800 border-2 border-gray-300 hover:border-[#07405A]"
										}
        `}
				onClick={() => dispatch(setSortBy("price"))}
			>
				Price
			</button>
			<button
				className={`px-4 py-1 rounded-xl text-lg font-medium transition-colors
          ${
											active === "rating"
												? "bg-[#07405A] text-white shadow border-2 border-[#07405A]"
												: "bg-white text-gray-800 border-2 border-gray-300 hover:border-[#07405A]"
										}
        `}
				onClick={() => dispatch(setSortBy("rating"))}
			>
				Rating
			</button>
		</div>
	);
};

export default SortButtons;
