import { Provider } from "react-redux"
import Body from "./components/Body"
import NavBar from "./components/NavBar"

import appStore from '../src/assets/redux/appStore';


function App() {


  return (
    <>
   <Provider store = {appStore}>
   <NavBar />
   <Body />

   </Provider>
   
   
    </>
  )
}

export default App
