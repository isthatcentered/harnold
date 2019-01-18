import React from "react"
import "./App.css"
import { Router } from "@reach/router"
import { device } from "./contracts"
import { PlaygroundPage } from "./PlaygroundPage"
import { HomePage } from "./HomePage"




export interface AppProps
{
	devices: device[]
}


export function App( { devices }: AppProps )
{
	
	return (
		<div className="App">
			<Router>
				<HomePage path="/"/>
				<PlaygroundPage
					devices={devices}
					path="/playground"
				/>
			</Router>
		</div>
	)
}
