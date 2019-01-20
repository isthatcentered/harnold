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
				textShadow: "3px 2px #7F2CCB",
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
			
			
			<main className="pl-7">
				<Router>
					<HomePage path="/"/>
					<PlaygroundPage
						devices={devices}
						path="/playground"
						className="p-6"
					/>
				</Router>
			</main>
			
			{/*<div className="d-flex flex-row align-items-start">*/}
			{/*<nav className="pl-7"*/}
			{/*style={{ width: "48px" }}>*/}
			{/**/}
			{/*</nav>*/}
			{/*<main*/}
			{/*className="flex-grow-1 p-5 d-flex align-items-center"*/}
			{/*style={{*/}
			{/*minHeight:           "calc(100vh - 48px)",*/}
			{/*width:               "calc(100vw - 48px)",*/}
			{/*borderTopLeftRadius: "4px",*/}
			{/*}}*/}
			{/*>*/}
			{/**/}
			{/*</main>*/}
			{/*</div>*/}
		</div>)
}
