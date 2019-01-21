import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { FormEvent, useState } from "react"




export interface HomePageProps extends RouteComponentProps
{

}


export function HomePage( { navigate }: HomePageProps )
{
	
	const [ url, setUrl ] = useState( "https://www.reactjs.org" )
	
	
	function handleSubmit( e: FormEvent<HTMLFormElement> )
	{
		e.preventDefault()
		
		if ( !url.length )
			return
		
		navigate!( `/playground?url=${url}` )
	}
	
	
	return (
		<div className="HomePage">
			<form onSubmit={handleSubmit}>
				<label>
					<span className="sr-only">Enter the url of the website you want to view</span>
					<input
						type="text"
						value={url}
						onChange={e => setUrl( e.target.value )}
					/>
				</label>
				{url && <button type="submit">Display {url}</button>}
			</form>
		</div>
	)
}