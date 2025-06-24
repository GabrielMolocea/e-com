import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/products/productsSlice";
import { selectAuthToken } from "./redux/selector";
import LoginPage from "./components/LoginPage";

function App() {
	const dispatch = useDispatch();
	const authToken = useSelector(selectAuthToken);
  console.log(authToken);
  

	useEffect(() => {
		dispatch(fetchProducts() as any);
	}, []);

	return (
		<>
			{authToken ? (
				<div>
					<h1>Welcome to the E-commerce App</h1>
					<p>Your token: {authToken}</p>
				</div>
			) : (
				<LoginPage />
			)}
		</>
	);
}

export default App;
