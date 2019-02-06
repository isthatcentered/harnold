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
			className="no-underline hover:no-underline"
		>
			<i
				{...props}
				className={`${className} text-purple-dark px-4 py-2 font-bold block roman`}
				style={{
					...style,
					fontSize:   "18px",
				}}>
				Harnold
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
			<header className="fixed pin-t pin-l w-full flex items-center justify-start ">
				<Logo/>
				<a className="ml-auto px-4 py-2 text-sm text-teal"
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
