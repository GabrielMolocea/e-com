import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/products/productsSlice";
import { selectAuthToken } from "./redux/selector";
import LoginPage from "./components/LoginPage";
import Header from "./components/header";
import SortButtons from "./components/SortButtons";
import ProductElements from "./components/ProductElements";

function App() {
	const dispatch = useDispatch();
	const authToken = useSelector(selectAuthToken);

	useEffect(() => {
		dispatch(fetchProducts() as any);
	}, []);

	return (
		<>
			{authToken ? (
				<div>
					<Header />
					<SortButtons />
          <ProductElements />
				</div>
			) : (
				<LoginPage />
			)}
		</>
	);
}

export default App;
