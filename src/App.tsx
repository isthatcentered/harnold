import React, { HTMLAttributes } from "react"
import { Link, Router } from "@reach/router"
import { device } from "./contracts"
import { PlaygroundPage } from "./PlaygroundPage"
import { HomePage } from "./HomePage"




function Logo( { className = "", style = {}, ...props }: HTMLAttributes<HTMLDivElement> )
{
	return (
		<Link
			to="/"
			className="hover:no-underline"
		>
			<i
				{...props}
				className={`${className} text-teal px-4 py-2 font-bold block roman`}
				style={{
					...style,
					fontSize:   "20px",
					textShadow: "3px 2px #7F2CCB",
				}}>
				H
			</i>
		</Link>)
}


export interface AppProps
{
	devices: device[]
}


export function App( { devices }: AppProps )
{
	
	return (
		<div className="App">
			<header className="fixed-top flex items-center justify-start">
				<Logo/>
				<a className="ml-auto px-4 py-2 text-sm"
				   href="mailto:e.peninb@gmail.com">Contact</a>
			</header>
			
			
			<main className="">
				<Router>
					
					<HomePage
						path="/"
					/>
					
					<PlaygroundPage
						devices={devices}
						path="/playground"
						className="p-6"
					/>
				</Router>
			</main>
		</div>)
}
