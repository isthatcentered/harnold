import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { FormEvent, HTMLAttributes, useState } from "react"




export interface HomePageProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement>
{

}


export function HomePage( { navigate, location, className = "", ...props }: HomePageProps )
{
	
	const [ url, setUrl ] = useState( "" )
	
	
	function handleSubmit( e: FormEvent<HTMLFormElement> )
	{
		e.preventDefault()
		
		if ( !url.length )
			return
		
		navigate!( `/playground?url=${url}` )
	}
	
	
	return (
		<div
			{...props}
			className={`${className} HomePage`}
		>
			<div className="_fz-8 mb-4"
			     style={{ animation: "float 3s infinite" }}>
				<i aria-hidden="true">👋</i>
				<span className="sr-only">Display {url}</span>
			</div>
			
			<form
				onSubmit={handleSubmit}
				className="position-relative"
			>
				<label className="m-0">
					<span className="sr-only">Enter the url of the website you want to view</span>
					<input
						type="text"
						value={url}
						onChange={e => setUrl( e.target.value )}
						className="form-control form-control-lg m-0 text-white"
						placeholder="https://waffles.com"
						style={{
							width:      "400px",
							maxWidth:   "100%",
							background: "rgba(0, 0, 0, 0.5)",
							border:     "1px solid rgba(255, 255, 255, .1)",
							height:     "60px",
						}}
					/>
				</label>
				
				<button
					type="submit"
					className="position-absolute h-100 _pin-top _pin-right bg-transparent px-4 border-0 _fz-7"
					style={{}}
				>
					{
						url &&
						<>
							<i aria-hidden="true">👉</i>
							<span className="sr-only">Display {url}</span>
						</>
					}
				</button>
			</form>
		</div>
	)
}