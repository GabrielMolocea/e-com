import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortFilterCategory } from "../redux/sort/sortSlice";

const menuItems = [
	{ label: "Home" },
	{
		label: "Products",
		children: [
			"All",
			"Electronics",
			"Jewelery",
			"Men's Clothing",
			"Women's Clothing",
		],
	},
];

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [productsOpen, setProductsOpen] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			{/* Overlay */}
			{menuOpen && (
				<div
					className="fixed inset-0 bg-opacity-20 z-40"
					onClick={() => setMenuOpen(false)}
				/>
			)}
			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-200 ${
					menuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-end justify-end px-6 py-5">
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={() => setMenuOpen(false)}
						aria-label="Close menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav className="px-6 py-4">
					<ul className="space-y-2">
						{/* Home */}
						<li
							key="Home"
							className="py-2 text-gray-800 hover:font-medium cursor-pointer"
						>
							{import.meta.env.VITE_HOME}
						</li>
						{/* Products Accordion */}
						<li>
							<button
								className="flex items-center justify-between w-full py-2 text-gray-800 font-medium focus:outline-none"
								onClick={() => setProductsOpen((open) => !open)}
								aria-expanded={productsOpen}
							>
								<span>{import.meta.env.VITE_PRODUCTS}</span>
								<svg
									className={`w-4 h-4 ml-2 transform transition-transform ${
										productsOpen ? "rotate-90" : ""
									}`}
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</button>
							{productsOpen && (
								<ul className="ml-2 mt-1 space-y-1">
									{menuItems[1].children?.map((child) => (
										<li
											key={child}
											className="py-1 px-2 rounded hover:bg-gray-100 cursor-pointer text-gray-700"
											onClick={() => {
												dispatch(setSortFilterCategory(child.toLowerCase()));
												setMenuOpen(false);
											}}
										>
											{child}
										</li>
									))}
								</ul>
							)}
						</li>
					</ul>
				</nav>
			</aside>
			{/* Header */}
			<header className="bg-white shadow-sm px-4 py-3">
				<div className=" mx-auto flex items-center justify-between">
					{/* Burger menu - always visible */}
					<button
						className="mr-2"
						onClick={() => setMenuOpen(true)}
						aria-label="Open menu"
					>
						<svg
							className="w-7 h-7 text-gray-700"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					{/* Search bar */}
					<div className="flex-1 flex items-center border rounded-lg border-gray-400">
						<div className="relative w-full mx-auto">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<circle cx="11" cy="11" r="8" />
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-3.5-3.5"
									/>
								</svg>
							</span>
							<input
								type="text"
								placeholder="Search"
								className="w-full pl-10 pr-4 py-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 text-gray-700 placeholder-gray-400 rounded-none text-left"
							/>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
