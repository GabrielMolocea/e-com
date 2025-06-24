import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchAllProducts() as any);
		dispatch(loginUsers({ username: "mor_2314", password: "83r5^_" }) as any);
	}, []);

	console.log("Products:", products);
	console.log("token:", authTokken);

	return (
		<>
			{/* <Route path="/login" element={<LoginPage />} /> */}
			{loading ? (
				<div>Loading...</div>
			) : (
				<pre>{JSON.stringify(products, null, 2)}</pre>
			)}
		</>
	);
}

export default App;
