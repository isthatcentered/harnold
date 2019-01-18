import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { App } from "./App"
import { device } from "./contracts"




const devices: device[] = [
	{
		width:  340,
		height: 480,
		label:  "iPhone 4",
	},
	{
		width:  375,
		height: 812,
		label:  "iPhone X",
	},
	{
		width:  1024,
		height: 768,
		label:  "iPad",
	},
	{
		width:  1024,
		height: 768,
		label:  "Laptop",
	},
	{
		width:  1920,
		height: 1080,
		label:  "Desktop",
	},
]
ReactDOM.render( <App devices={devices}/>, document.getElementById( "root" ) )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
