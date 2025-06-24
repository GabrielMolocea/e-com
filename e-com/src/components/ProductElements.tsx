import { useSelector } from "react-redux";
import {
	selectAlProducts,
	selectFilterCategory,
	selectSortBy,
} from "../redux/selector";
import { useEffect, useState } from "react";

type Product = {
	id: number;
	title: string;
	price: number;
	image: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
};

const getFavorites = () =>
	JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
const setFavorites = (ids: number[]) =>
	localStorage.setItem("favorites", JSON.stringify(ids));

const getRatings = () =>
	JSON.parse(localStorage.getItem("userRatings") || "{}") as Record<
		number,
		number
	>;
const setRatings = (ratings: Record<number, number>) =>
	localStorage.setItem("userRatings", JSON.stringify(ratings));

const ProductElements = () => {
	const sortBy = useSelector(selectSortBy);
	const filterCategory = useSelector(selectFilterCategory);
	const products = useSelector(selectAlProducts);
	const [favorites, setFavs] = useState<number[]>(getFavorites());
	const [userRatings, setUserRatings] = useState<Record<number, number>>(
		getRatings()
	);

	// Keep localStorage in sync
	useEffect(() => {
		setFavorites(favorites);
	}, [favorites]);
	useEffect(() => {
		setRatings(userRatings);
	}, [userRatings]);

	const toggleFavorite = (id: number) => {
		setFavs((prev) =>
			prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
		);
	};

	const setRating = (id: number, rating: number) => {
		setUserRatings((prev) => ({ ...prev, [id]: rating }));
	};

  const filteredProducts =
    filterCategory && filterCategory !== "all"
      ? products.filter((product: Product) =>
          product.category === filterCategory
        )
      : products;
      

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortBy === "price") {
			return a.price - b.price;
		} else {
			// Use user rating if available, else API rating
			const aRating = userRatings[a.id] ?? a.rating.rate;
			const bRating = userRatings[b.id] ?? b.rating.rate;
			return bRating - aRating;
		}
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-8">
			{sortedProducts.map((product: Product) => {
				const isFav = favorites.includes(product.id);
				const displayRating = userRatings[product.id] ?? product.rating.rate;

				return (
					<div
						key={product.id}
						className="bg-white rounded-2xl shadow p-6 flex flex-col items-center relative"
					>
						{/* Heart icon */}
						<button
							className="absolute top-4 right-4 text-2xl select-none focus:outline-none"
							onClick={() => toggleFavorite(product.id)}
							aria-label="Toggle favorite"
						>
							<svg
								className={`w-7 h-7 transition-colors duration-200 ${
									isFav ? "text-red-500" : "text-gray-300"
								}`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
							</svg>
						</button>
						{/* Product image */}
						<img
							src={product.image}
							alt={product.title}
							className="w-40 h-40 object-contain mb-4"
						/>
						{/* Title and price */}
						<div className="flex justify-between items-center w-full mb-2">
							<span className="font-bold text-base md:text-lg text-gray-900">
								{product.title.length > 18
									? product.title.slice(0, 15) + "..."
									: product.title}
							</span>
							<span className="font-bold text-base md:text-lg text-gray-900">
								${product.price.toFixed(2)}
							</span>
						</div>
						{/* Rating and count */}
						<div className="flex items-center w-full mt-2">
							<span className="text-gray-800 font-medium mr-2">
								{displayRating.toFixed(1)}
							</span>
							{/* Stars (clickable for user rating) */}
							<span className="flex items-center mr-2">
								{Array.from({ length: 5 }).map((_, i: number) => {
									const rate = displayRating;
									if (rate >= i + 1) {
										return (
											<svg
												key={i}
												className="w-5 h-5 text-yellow-400 cursor-pointer"
												fill="currentColor"
												viewBox="0 0 20 20"
												onClick={() => setRating(product.id, i + 1)}
											>
												<polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.3 15,17.1 9.9,14.1 4.8,17.1 6.1,11.3 1.6,7.3 7.5,6.6" />
											</svg>
										);
									} else if (rate > i && rate < i + 1) {
										// Half star
										return (
											<svg
												key={i}
												className="w-5 h-5 text-yellow-400 cursor-pointer"
												viewBox="0 0 20 20"
												onClick={() => setRating(product.id, i + 1)}
											>
												<defs>
													<linearGradient id={`half${product.id}-${i}`}>
														<stop offset="50%" stopColor="#facc15" />
														<stop offset="50%" stopColor="#e5e7eb" />
													</linearGradient>
												</defs>
												<polygon
													points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.3 15,17.1 9.9,14.1 4.8,17.1 6.1,11.3 1.6,7.3 7.5,6.6"
													fill={`url(#half${product.id}-${i})`}
												/>
											</svg>
										);
									} else {
										return (
											<svg
												key={i}
												className="w-5 h-5 text-gray-300 cursor-pointer"
												fill="currentColor"
												viewBox="0 0 20 20"
												onClick={() => setRating(product.id, i + 1)}
											>
												<polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.3 15,17.1 9.9,14.1 4.8,17.1 6.1,11.3 1.6,7.3 7.5,6.6" />
											</svg>
										);
									}
								})}
							</span>
							<span className="text-gray-400 mx-2">|</span>
							<span className="text-gray-600 text-sm">
								{product.rating.count} Ratings
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ProductElements;
