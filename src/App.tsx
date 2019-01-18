import React, { Component } from "react"
import "./App.css"
import { RouteComponentProps, Router } from "@reach/router"




export interface PlaygroundPageState
{
}

export interface PlaygroundPageProps extends RouteComponentProps
{
}

export class PlaygroundPage extends Component<PlaygroundPageProps, PlaygroundPageState>
{
	
	static defaultProps = {}
	
	state = {}
	
	
	render()
	{
		const {} = this.state,
		      {} = this.props
		
		return (
			<div className="PlaygroundPage">
				PlaygroundPage
			</div>
		)
	}
}

class App extends Component
{
	render()
	{
		return (
			<div className="App">
				<Router>
					<PlaygroundPage path="/playground"/>
				</Router>
			</div>
		)
	}
}

export default App
