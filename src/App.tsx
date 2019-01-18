import React, { Component } from "react"
import "./App.css"
import { Link, RouteComponentProps, Router } from "@reach/router"
import { parse } from "query-string"




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
}


export function PlaygroundPage( { location, navigate }: PlaygroundPageProps )
{
	const { url } = parse( location!.search ) as Partial<{ [ key: string ]: string }>
	
	if ( !url )
		ensureRouterHasSubscribedToLocationThen( () => navigate!( "/" ) )
	
	return (
		<div className="PlaygroundPage">
			PlaygroundPage
			
			{/* https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/ */}
			<iframe
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
				src={url}
			/>
			<Link to="/">Home</Link>
		</div>
	)
}


function ensureRouterHasSubscribedToLocationThen( callback: Function )
{
	process.nextTick( () => callback() )
}


class App extends Component
{
	render()
	{
		return (
			<div className="App">
				<Router>
					<HomePage path="/"/>
					<PlaygroundPage path="/playground"/>
				</Router>
			</div>
		)
	}
}

export default App
