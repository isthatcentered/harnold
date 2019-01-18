import { Link, RouteComponentProps } from "@reach/router"
import * as React from "react"



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