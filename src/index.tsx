import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { App} from "./App"
import { device } from "./contracts"




const devices: device[] = [
	{
		width:  340,
		height: 480,
		label:  "iPhone 4",
	},
]
ReactDOM.render( <App devices={devices}/>, document.getElementById( "root" ) )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
