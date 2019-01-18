import React from "react"
import "./App.css"
import { Link, RouteComponentProps, Router } from "@reach/router"
import { parse } from "query-string"
import { device } from "./contracts"




export interface HomePageProps extends RouteComponentProps
{

}


export function HomePage( props: HomePageProps )
{
	
	return (
		<div className="HomePage">
			HomePage
			<Link to="/playground">broken playground</Link>
			<Link to="/playground?url=https://reactjs.org">Working playground</Link>
		</div>
	)
}


export interface PlaygroundPageProps extends RouteComponentProps
{
	devices: device[]
}


export function PlaygroundPage( { location, navigate, devices }: PlaygroundPageProps )
{
	const { url } = parse( location!.search ) as Partial<{ [ key: string ]: string }>
	
	if ( !url ) {
		ensureRouterHasSubscribedToLocationThen( () => navigate!( "/" ) )
		return null
	}
	
	return (
		<div className="PlaygroundPage">
			
			{devices.map( ( { width, height, label }: device ) =>
				<figure key={label}>
					{/* https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/ */}
					<iframe
						sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						width={width}
						height={height}
						src={url}
					/>
					<figcaption>{label}</figcaption>
				</figure>,
			)}
			
			<Link to="/">Go to home</Link>
		</div>
	)
}



function ensureRouterHasSubscribedToLocationThen( callback: Function )
{
	process.nextTick( () => callback() )
}


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
