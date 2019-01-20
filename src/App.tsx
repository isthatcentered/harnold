import React, { HTMLAttributes } from "react"
import { Link, Router } from "@reach/router"
import { device } from "./contracts"
import { PlaygroundPage } from "./PlaygroundPage"
import { HomePage } from "./HomePage"




function Logo( { className = "", style = {}, ...props }: HTMLAttributes<HTMLDivElement> )
{
	return <Link to="/">
		<i
			{...props}
			className={`${className} logo text-primary`}
			style={{
				...style,
				fontWeight: "bold",
				display:    "inline-block",
				width:      "48px",
				fontStyle:  "normal",
				position:   "absolute",
				top:        0,
				left:       0,
				fontSize:   "20px",
				height:     "48px",
				textAlign:  "center",
				lineHeight: "48px",
			}}>
			H
		</i>
	</Link>
}


export interface AppProps
{
	devices: device[]
}


export function App( { devices }: AppProps )
{
	
	return (
		<div className="App">
			<header className="pt-7">
				<Logo/>
			</header>
			
			<div className="d-flex flex-row align-items-start">
				<div className="pl-7">
				
				</div>
				<main className="_slate-1 flex-grow-1 p-5 _rounded">
					<Router>
						<HomePage path="/"/>
						<PlaygroundPage
							devices={devices}
							path="/playground"
						/>
					</Router>
				</main>
			</div>
		</div>)
}
