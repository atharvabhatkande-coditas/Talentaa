import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { RouterProvider } from "react-router-dom";
import { store } from "./store";
import router from "./routes/router";

const App = () => {
  return (
     <Provider store={store}>
      <RouterProvider router={router} />
      
    </Provider>
   
    
  )
}
export default App;


